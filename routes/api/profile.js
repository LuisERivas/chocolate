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
    // console.log('i am a test')
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
    platform,
    nameOfStonk,
    ticker
  } = req.body
  // build profile object
  const profileFields = {}
  profileFields.user = req.user.id
  if (experience) profileFields.experience = experience
  if (tradingStyle) profileFields.tradingStyle = tradingStyle
  if (platform) profileFields.platform = platform
  // res.send('oinkers')
  // stonks information
  profileFields.stonks = {}
  if (nameOfStonk) profileFields.stonks.nameOfStonk = nameOfStonk
  if (ticker) profileFields.stonks.ticker = ticker

  try {
    // set profile to the profile we find in the token
    console.log('trying to see if nameOfStonk Works' + nameOfStonk)
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

// get api/profile
// get all profiles
// public access
router.get('/', async (req, res) => {
  try {
    // set profiles to all the profiles we find and populate it with just the user name
    const profiles = await Profile.find().populate(
      'user',
      ['name'])
    res.json(profiles)
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server Error')
  }
})

// get api/profile/user/:user_id
// get all profiles
// public access
router.get('/user/:user_id', async (req, res) => {
  try {
    // set profiles to one profile we find and populate it with just the user name
    const profile = await Profile.findOne({ user: req.params.user_id }).populate(
      'user',
      ['name'])

    if (!profile) return res.status(400).json({ msg: 'no profile for this user' })

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Not valid profile ID!' })
    }
    res.status(500).send('Server Error')
  }
})

// delete api/profile
// delete, profile and user
// Private access
router.delete('/', auth, async (req, res) => {
  try {
    // set profiles to one profile we find and populate it with just the user name
    await Profile.findOneAndRemove({ user: req.user.id })
    await User.findOneAndRemove({ _id: req.user.id })

    res.json({ msg: 'user deleted!' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// put api/profile/stonks
// add to stonk list
// Private access
router.put('/stonks', [auth, [
  check('ticker', 'Ticker is required').not().isEmpty()
]
],
async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const {
    ticker,
    nameOfStonk
  } = req.body

  const newStonk = {
    ticker,
    nameOfStonk
  }
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    profile.stonks.unshift(newStonk)
    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('error adding stonks')
  }
})

module.exports = router
