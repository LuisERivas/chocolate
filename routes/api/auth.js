// bring in express
const express = require('express')

// bring in router
const router = express.Router()
// Bring in middleware
const auth = require('../../middleware/auth')
// bring in user model
const User = require('../../models/Users')
// bring in validator
const { check, validationResult } = require('express-validator')
// Bring in JWT
const jwt = require('jsonwebtoken')
// Bring in secret
const config = require('config')
// Bring in Bcrypt
const bcrypt = require('bcryptjs')

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

// @Route:         Post api/auth
// @Description:   Authenticate user and get token
// @access:        Public

// get api/users/ will send response of user route
router.post(
  '/',
  // adds secondary requirement of running checks
  [
    // check email is valid
    check('email', 'Please Include Valid Email').isEmail(),
    // check email is present
    check('password', 'Password is requried').exists()
  ],

  // asynch because is its what is commonly used
  async (req, res) => {
    // set errors to result from validation
    const errors = validationResult(req)
    // if not errors is empty
    if (!errors.isEmpty()) {
      // reutn the status 400 and an json array that shows the error.
      return res.status(400).json({ errors: errors.array() })
    }
    // bring in user information, destructure req.body into email, and password for ease of use
    const { email, password } = req.body

    try {
      // check if user exists
      // look at response to find email
      let user = await User.findOne({ email })
      // if user is not found
      if (!user) {
        // send error status and show invalid crednetials
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentialsss' }] })
      }

      // check that password matches to the user by comparing the plain text password to the encrypted password
      const isMatch = await bcrypt.compare(password, user.password)
      // if it does not match then throw 400 status and show invalid credential message
      if (!isMatch) {
        // 400 response and jsonformat response of invalid credentials
        return res.status(400).json({ errors: [{ Msg: 'Invalid crednetials ' }] })
      }
      // return jsonwebtoken
      // create payload to use with jwt
      const payload = {
        // look at saved user
        user: {
          // pull out promised user.id
          id: user.id
        }
      }
      // jwt sign
      // sign with payload and with jwttoken pulled from default.json
      jwt.sign(
        payload,
        // configures the jwt token
        config.get('jwtSecret'),
        // expires in an hour
        { expiresIn: 3600 },
        // if an error
        (err, token) => {
          // throw the error
          if (err) throw err
          // response with the token
          res.send({ token })
          // console.log(token)
        }
      )
    } catch (err) {
      // console the error message
      console.error(err.message)
      // send 500 status with server error text
      res.status(500).send('server error')
    }

    console.log('something was posted')
  })

// export route to be used in other parts of the program
module.exports = router
