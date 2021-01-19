
// brining in express
const express = require('express')

// bring in router
const router = express.Router()

// @Route:         Get api/users
// @Description:   Test route
// @access:        Public

// get api/users/ will send response of user route
router.get('/', (req, res) => res.send('User Route'))

// exporting the route to be used in other parts of the program
module.exports = router
