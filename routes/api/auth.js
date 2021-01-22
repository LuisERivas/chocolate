// bring in express
const express = require('express')

// bring in router
const router = express.Router()
// Bring in middleware
const auth = require('../../middleware/auth')
// bring in user model
const User = require('../../models/Users')

// @Route:         Get api/auth
// @Description:   Test route
// @access:        Public

// when using path api/auth/ send "auth route" response *add auth to make the route protected by middleware* make it asynch
router.get('/', auth, async (req, res) => {
  // when accessing this get request
  try {
    // search user model by id and excldue the password
    const user = await User.findById(req.user.id).select('-password')
    // respond with the information taken from the database tied to the selected id
    res.json(user)
    // if unable to find by id
  } catch (err) {
    // log error
    console.error(err.message)
    // send error code 500 and server error dialogue
    res.status(500).send('server error')
  }
})

// export route to be used in other parts of the program
module.exports = router
