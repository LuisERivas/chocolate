/* requre express */
const express = require('express')

// require the connectDB function from db.js
const connectDB = require('./config/db')

/* create app that uses express */
const app = express()

// Connect Database
connectDB()

// initialize middleware
app.use(express.json({ extended: false }))

/* Default to port 5000 */
const PORT = process.env.PORT || 5000

/* Check to make sure API is running */
app.get('/', (req, res) => res.send('API is Running'))

// Define routes

// make /api/users pertain to the user.js file so that we can use any routes that start with "/"
// when using /api/users we are really using './routes/api/users'
app.use('/api/users', require('./routes/api/users'))

// make /api/users pertain to the user.js file so that we can use any routes that start with "/"
// when using /api/users we are really using './routes/api/users'
app.use('/api/auth', require('./routes/api/auth'))

// make /api/users pertain to the user.js file so that we can use any routes that start with "/"
// when using /api/users we are really using './routes/api/users'
app.use('/api/profile', require('./routes/api/profile'))

/* Listen for Server starting and output the port it started on */
app.listen(PORT, () => console.log(`server started on port ${PORT}`))
// console.log(process.env)
