const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  exercises: [{
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
  }]
});

var Users = mongoose.model('User', userSchema);
module.exports = Users;