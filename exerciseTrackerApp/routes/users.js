/** Express router providing user related routes
 * @module routes/users
 * @requires express
 * @requires body-parser
 * @requires /models/users
 * @requires /models/exercises
 * @requires /util/valid
 */

 var express = require('express');
var router = express.Router();
const Users = require('../models/users'); 
const Exercises = require('../models/exercises'); 
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const utilities = require('../util/valid');

/** 
 * Route serving users (GET), sending back all existing users in json format
 * @function 
 * @name get/users
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
*/
router.get('/users', (req, res, next) => {
  Users.find({})
  .select('-exercises')
  .then(user => {
    res.json(user);
  }, (err) => next(err))
  .catch(err => next(err));
});

/**
 * Route serving users (POST), creating a new user and sending back in json format an object comprising of its username and id
 * @function 
 * @name post/users
 * @param {string} path - Express path
 * @param {function} middleware - json parser to retrieve user's username
 * @param {callback} middleware - Express middleware.
 */
router.post('/users', jsonParser, function(req, res, next) {
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


/** 
 * Route serving exercises (GET), sending back all existing exercises for a given user in json format.
 * Accepts conditions such as from-to timespan and limiting the number of exercises returned
 * @function 
 * @name get/exercises
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
*/
router.get('/exercises', (req, res, next) => {
  // retrieving given options
  let match_cond = {};
  let opt = {};
  let from_date = undefined;
  let to_date = undefined;
  if (req.query.limit !== undefined 
    && utilities.isNormalInteger(req.query.limit)){
      opt.limit = req.query.limit;
  }
  if (req.query.from !== undefined
    && utilities.isValidDate(req.query.from)){
      from_date = new Date(req.query.from);
      match_cond.date = {};
      match_cond.date['$gte'] = from_date;
  }
  if (req.query.to !== undefined
    && utilities.isValidDate(req.query.to)){
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

/**
 * Route serving exercises (POST), creating a new exercise for a given user and sending back in json format an object comprising of the user's username and id, and the created exercise's description, duration and date.
 * @function 
 * @name post/exercises
 * @param {string} path - Express path
 * @param {function} middleware - json parser to retrieve user's username
 * @param {callback} middleware - Express middleware.
 */
router.post('/exercises', jsonParser, (req, res, next) => {
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

module.exports = router;
