const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  user: {
    // used to connect the profile schema to a specific user model by refrencing the id of the user
    type: mongoose.Schema.Types.ObjectId,
    // references user model
    ref: 'user'
  },
  // parts of the model
  experience: {
    type: String
  },
  tradingStyle: {
    type: String
  },
  platform: {
    type: String,
    required: true
  },
  stonks: [
    {
      nameOfStonk: {
        type: String
      },
      ticker: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }

})

module.exports = Profile = mongoose.model('profile', ProfileSchema)
