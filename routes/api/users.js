
// brining in express
const express = require('express')

// bring in router
const router = express.Router()

// bring in validator
const { check, validationResult } = require('express-validator')
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
  (req, res) => {
    // set errors to result from validation
    const errors = validationResult(req)
    // if not errors is empty
    if (!errors.isEmpty()) {
      // reutn the status 400 and an json array that shows the error.
      return res.status(400).json({ errors: errors.array() })
    }
    res.send('User Route')
    console.log('something was posted')
  })

// exporting the route to be used in other parts of the program
module.exports = router
