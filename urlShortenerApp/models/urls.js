const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var urlSchema = new Schema({
  original_url: {
    type: String,
    required: true
  },
  shortened_url:  {
    type: Number,
    required: true,
    unique: true
  }
});

var Urls = mongoose.model('Url', urlSchema);
module.exports = Urls;