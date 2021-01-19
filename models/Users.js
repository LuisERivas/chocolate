// bring in mongoose
const mongoose = require('mongoose')

// create User Schema
const UserSchmea = new mongoose.Schema({
  // name portion of user
  name: {
    // string type that is required
    type: String,
    required: true
  },
  // email portion of user
  email: {
    // string type that is required and must be unique in database
    type: String,
    required: true,
    unique: true
  },
  // password portion of user
  password: {
    // string type that is required
    type: String,
    required: true
  },
  // date portion that shows when it was created
  date: {
    // Date type that gives us the current date and time when it was created
    type: Date,
    default: Date.now
  }
})

// export the module to be used in different parts of the program

// have User be the model that takes the user name and the user schema we created
module.exports = User = mongoose.model('user', UserSchmea)
