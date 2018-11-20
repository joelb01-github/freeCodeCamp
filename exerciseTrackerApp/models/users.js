const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  exercises: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Exercise'
  }]
});

var Users = mongoose.model('User', userSchema);
module.exports = Users;
