var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    "ipaddress": req.get('X-Forwarded-For'),
    "language": req.get('Accept-Language'),
    "software": req.get('User-Agent')
  });
});

module.exports = router;
