const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/Users')

// Get api/profile/me
// test get current user profile
// private access

router.get('/me', auth, async (req, res) => {
  try {
    // find user by id and populate name with name that comes from the user model
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name'])
    // if profile not present then show error
    if (!profile) {
      return res.status(400).json({ msg: 'no profile for this user' })
    }
    // if profile present then json format profile info
    res.json(profile)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('server Error')
  }
})

module.exports = router
