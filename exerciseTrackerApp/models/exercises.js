const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var exerciseSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  date: {
    type: Date
  }
});

var Exercises = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercises;
