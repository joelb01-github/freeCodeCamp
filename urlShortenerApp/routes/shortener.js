var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const dns = require('dns');
const Urls = require('../models/urls');
const url = require('url');

var jsonParser = bodyParser.json();

/* Redirect url */
router.get('/:urlId', (req, res, next) => {
  Urls.findOne({"shortened_url": req.params.urlId})
  .then(url => {
    if(url !=null) {
      res.redirect(301, url.original_url);
    }
    else {
      let err = new Error('short url given: ' + req.params.urlId 
      + ' is not registered');
      err.status = 404;
      return next(err);
    }
  }, (err) => next(err))
  .catch( err => next(err));
});

/* Get a short url */
router.post('/new', jsonParser, function(req, res, next) {
  // check url format
  let url_to_input = req.body.url;
  const regex = /^http(s?):\/\/(www.)?\w+(\.\w+)/;
  if (!regex.test(url_to_input)){
    res.json({
      "original_url": url_to_input,
      "short_url": "invalid URL"
    });
  }
  else {
    const url_to_test = new URL(url_to_input);
    dns.lookup(url_to_test.host, (err, address) => {
      if (!address || !regex.test(url_to_test.origin)) {
        res.json({
          "original_url": url_to_input,
          "short_url": "invalid URL"
        });
      }
      else {
        // check if entry already exists
        Urls.findOne({original_url: url_to_input}, (err, url) => {
          if (url!=null){
            // already exists, send back existing short url
            res.json({
              "original_url": url_to_input,
              "short_url": url.shortened_url
            });
          }
          else {
            // find number of entries
            Urls.find({})
            .then((urls) => {
              let number = urls.length+1;
              // create new entry in db
              Urls.create({
                "original_url": url_to_input,
                "shortened_url": number
              })
              .then(url_created => {
                // send answer
                res.json({
                  "original_url": url_created.original_url,
                  "short_url": url_created.shortened_url
                });
              }, (err) => next(err))
              .catch((err) => next(err));
            }, (err) => next(err))
            .catch((err) => next(err));
          }
        })
      }
    });
  }
});

module.exports = router;
