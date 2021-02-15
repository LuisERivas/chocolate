const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/Users')

const { check, validationResult } = require('express-validator')

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

// post api/profile
// create or update user profile
// private access
router.post('/', [ auth, [
  check('platform', 'Platform is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  // pulling these out of req.body
  const {
    experience,
    tradingStyle,
    platform
  } = req.body
  // build profile object
  const profileFields = {}
  profileFields.user = req.user.id
  if (experience) profileFields.experience = experience
  if (tradingStyle) profileFields.tradingStyle = tradingStyle
  if (platform) profileFields.platform = platform
  // res.send('oinkers')

  try {
    // set profile to the profile we find in the token
    let profile = await Profile.findOne({ user: req.user.id })
    // if there is a profile
    if (profile) {
      // find the profile by id and update it
      profile = await Profile.findOneAndUpdate(
        // set the profile fields
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      )
      // log out the profile
      return res.json(profile)
    }
    // create if no profile is there
    profile = new Profile(profileFields)
    // save the profile
    await profile.save()
    // logout the proifle
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever Error')
  }
}
)

module.exports = router
