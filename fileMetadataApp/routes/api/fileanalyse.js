var express = require('express');
var router = express.Router();
var multer  = require('multer')
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

/* POST home page. */
router.post('/', upload.single('upfile'), function(req, res, next) {
  // send the responde
  res.json({
    "filename": req.file.originalname,
    "type": req.file.mimetype,
    "filesize": req.file.size
  });
});

module.exports = router;
