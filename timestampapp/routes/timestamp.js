let express = require('express');
let router = express.Router();

/* GET to timestamp app. */
router.get('/:date_string?', function(req, res, next) {
  let date_string = req.params.date_string;
  if (date_string){
    if (!isNaN(Date.parse(date_string))){
      let date = new Date(date_string);
      let ret = {};
      ret['unix'] = date.getTime();
      ret['utc'] = date.toUTCString();
      res.send(ret);
    }
    else {
      let date = new Date(parseInt(date_string));
      if (date.toString() != 'Invalid Date'){
        let ret = {};
        ret['unix'] = date.getTime();
        ret['utc'] = date.toUTCString();
        res.send(ret);
      }
      else {
        res.send({"error": "Invalid Date"});
      }
    }
  }
  else {
    // return new Data() e.g. the current timestamp
    let date = new Date();
    let ret = {};
    ret['unix'] = date.getTime();
    ret['utc'] = date.toUTCString();
    res.send(ret);
  }

});

module.exports = router;
