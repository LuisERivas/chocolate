// bring in express
const express = require('express')

// bring in router
const router = express.Router()

// @Route:         Get api/auth
// @Description:   Test route
// @access:        Public

// when using path api/auth/ send "auth route" response
router.get('/', (req, res) => res.send('Auth Route'))

// export route to be used in other parts of the program
module.exports = router
