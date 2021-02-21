// DEPENDENCIES
// Bring in jwt
const jwt = require('jsonwebtoken')
// bring in config
const config = require('config')

// create module export to rest of program, function will have request, response, and the next part it will go to
module.exports = function (req, res, next) {
// pull token from header by pulling it from x-auth-token
  const token = req.header('x-auth-token')

  // check if token is present
  // if token is not present
  // console.log('This is in auth middleware:' + token)
  if (!token) {
    // send status of not authorized and message of denial
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }
  // if token is present check to see if it is valid
  try {
    // decode toekn by using jwt verify that uses the token in the header and the jwt secret from config/db.js
    const decoded = jwt.verify(token, config.get('jwtSecret'))

    // pull the decoded user and set it to req.user
    req.user = decoded.user
    // middleware will move to next step
    next()
    // if the token is not vaid
  } catch (err) {
    // Respond with 401 status and message of invalid token
    res.status(401).json({ msg: 'Token is not valid' })
  }
}
