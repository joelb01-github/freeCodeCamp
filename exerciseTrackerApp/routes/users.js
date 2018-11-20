var express = require('express');
var router = express.Router();
const Users = require('../models/users'); 
const Exercises = require('../models/exercises'); 
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


/* GET all users */
router.get('/users', (req, res, next) => {
  Users.find({})
  .select('-exercises')
  .then(user => {
    res.json(user);
  }, (err) => next(err))
  .catch(err => next(err));
});

/* POST new user */
router.post('/new-user', jsonParser, function(req, res, next) {
  // Check user is not already part of db
  Users.findOne({"username": req.body.username})
  .then(user => {
    if (user !== null) {
      // user exists
      res.send('username already taken');
    }
    else {
      // new user to be created
      Users.create({
        "username": req.body.username
      })
      .then(user_created => {
        res.json({
          "username": user_created.username,
          "id": user_created._id
        });
      }, (err) => next(err));
    }
  }, (err) => next(err))
  .catch(err => next(err));
});

/* GET exercises from one user */
router.get('/log', (req, res, next) => {
  // retrieving options
  let match_cond = {};
  let opt = {};
  let from_date = undefined;
  let to_date = undefined;
  if (req.query.limit !== undefined 
    && isNormalInteger(req.query.limit)){
      opt.limit = req.query.limit;
  }
  if (req.query.from !== undefined
    && isValidDate(req.query.from)){
      from_date = new Date(req.query.from);
      match_cond.date = {};
      match_cond.date['$gte'] = from_date;
  }
  if (req.query.to !== undefined
    && isValidDate(req.query.to)){
      to_date = new Date(req.query.to);
      if(!match_cond.date){
        match_cond.date = {};
      }
      match_cond.date['$lte'] = to_date;
  }
  Users.findById(req.query.userId)
  .populate({
    path: 'exercises',
    select: '-_id -__v',
    match: match_cond,
    options: opt
  })
  .then(user => {
    if (!user || user.length === 0) {
      res.send('unknown user');
    }
    else {
      res.json({
        "_id": user._id,
        "username": user.username,
        "from": match_cond.from_date,
        "to": match_cond.to_date,
        "limit": opt.limit,
        "count": user.exercises.length,
        "log": user.exercises
      });
    }
  }, (err) => next(err))
  .catch(err => next(err));
});

/* POST new exercise */
router.post('/add', jsonParser, (req, res, next) => {
  // check is user requesed exists
  Users.findById(req.body.userId)
  .then(user => {
    if (!user || user.length === 0) {
      res.send('unknown _id');
    }
    else {
      // check if description and durations are not empty
      if(req.body.description === '' || req.body.duration === '') {
        res.send('description and duration fields are required');
      }
      else {
        var exec = new Exercises({
          "description": req.body.description,
          "duration": req.body.duration,
          "date": req.body.date
        });
        exec.save()
        .then(exec => {
          user.exercises.push(exec._id);
          user.save()
          .then(user => {
            res.json({
              "username": user.username,
              "description": req.body.description,
              "duration": req.body.duration,
              "id": user._id,
              "date": req.body.date
            });
          }, (err) => next(err));
        }, (err) => next(err));
      }
    }
  }, (err) => next(err))
  .catch(err => next(err));
});

function isValidDate(str) {
  return /^\d{4}-(0\d|1[0-2])-([0-2]\d|3[0-1])$/.test(str);
}

function isNormalInteger(str) {
  return /^(0|[1-9]\d*)$/.test(str);
}


module.exports = router;
