
// brining in express
const express = require('express')

// bring in router
const router = express.Router()

// bring in validator
const { check, validationResult } = require('express-validator')

// bring in user model
const User = require('../../models/Users')

// Bring in Bcrypt
const bcrypt = require('bcryptjs')

// @Route:         Get api/users
// @Description:   Test route
// @access:        Public

// get api/users/ will send response of user route
router.get('/', (req, res) => res.send('User Route'))

// @Route:         Post api/users
// @Description:   Register User
// @access:        Public

// get api/users/ will send response of user route
router.post('/',
// adds secondary requirement of running checks
  [
    // check to make sure a name is present (that its not empty)
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    // check email is valid
    check('email', 'Please Include Valid Email').isEmail(),
    // check email has min 6 char
    check('password', 'Please enter a password with 6 Character minimum').isLength({ min: 6 })
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
    // bring in user information, destructure req.body into name, email, and password for ease of use
    const { name, email, password } = req.body

    try {
      // check if user exists
      // look at response to find email
      let user = await User.findOne({ email })
      // if user already exists
      if (user) {
        // send error status and show user already exists message on client
        return res.status(400).json({ errors: [{ msg: 'user already exists' }] })
      }

      // creates new user
      user = new User({
        name,
        email,
        password
      })

      // encrypt password
      // generates salt from bycrpt promise
      const salt = await bcrypt.genSalt(10)
      // hashes password from newly created user and sets it to user.password
      user.password = await bcrypt.hash(password, salt)
      // save user use await since it leaves a promise
      await user.save()
      // return jsonwebtoken
      res.send('User Registered')

      // res.send('User Route')
      // if unable to do check
    } catch (err) {
      // console the error message
      console.error(err.message)
      // send 500 status with server error text
      res.status(500).send('server error')
    }

    console.log('something was posted')
  })

// exporting the route to be used in other parts of the program
module.exports = router
