var express = require('express');
var router = express.Router();
const Users = require('../models/users'); 
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

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
          "username": req.body.username,
          "id": user_created._id
        });
      }, (err) => next(err))
      .catch(err => next(err));
    }
  }, (err) => next(err))
  .catch(err => next(err));
});

/* GET all users */
router.get('/users', (req, res, next) => {
  Users.find({})
  .then(user => {
    res.json({user});
  }, (err) => next(err))
  .catch(err => next(err));
});

/* GET exercises from one user */
router.get('/log', (req, res, next) => {
  // check if user exists
  Users.findById(req.query.userId)
  .then(user => {
    if (!user || user.length === 0) {
      res.send('unknown user');
    }
    else {
      let from_date = undefined;
      let to_date = new Date();
      let limit = undefined;
      if (req.query.limit !== undefined) {
        limit = req.query.limit;
      }
      if (req.query.from !== undefined) {
        from_date = req.query.from;
      }
      if (req.query.to !== undefined) {
        to_date = req.query.to;
      }
      // extract wanted exercises
      let count = 0;
      let exec = user.exercises
      .filter(obj => {
        let from_date_formatted = new Date(from_date);
        let to_date_formatted = new Date(to_date);
        let test = true;
        if (from_date && obj.date < from_date_formatted) {
          test = false;
        }
        if (to_date && obj.date > to_date_formatted) {
          test = false;
        }
        if (count >= limit) {
          test = false;
        }
        if (test) {
          count++;
        }
        return test;
      })
      // // take out the id part
      .map(x => {
        x = JSON.parse(JSON.stringify(x));
        delete x['_id'];
        return x;
      });

      res.json({
        "_id": user._id,
        "username": user.username,
        "count": exec.length,
        "log": exec
      })
    }
  }, (err) => next(err))
  .catch(err => next(err));
});

/* POST new exercise */
router.post('/add', jsonParser, (req, res, next) => {
  // check is user requesed exists
  Users.findById(req.body.userId)
  .then(user => {
    if(user.length === 0) {
      res.send('unknown _id');
    }
    else {
      // check if description and durations are not empty
      if(req.body.description === '' || req.body.duration === '') {
        res.send('description and duration fields are required');
      }
      else {
        user.exercises.push({
          "description": req.body.description,
          "duration": req.body.duration,
          "date": req.body.date
        });
        user.save()
        .then(user => {
          res.json({
            "username": user._id,
            "description": req.body.description,
            "duration": req.body.duration,
            "date": req.body.date
          });
        }, (err) => next(err));
      }
    }
  }, (err) => next(err))
  .catch(err => next(err));
});

module.exports = router;
