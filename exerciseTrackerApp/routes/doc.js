var express = require('express');
var router = express.Router();
var path = require('path');

var parentDir = path.normalize(__dirname+"/..");

/* GET documentation page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(parentDir+'/out/index.html'));
});

module.exports = router;
