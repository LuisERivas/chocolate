/* requre express */
const express = require('express')

// require the connectDB function from db.js
const connectDB = require('./config/db')

/* create app that uses express */
const app = express()

// Connect Database
connectDB()

/* Default to port 5000 */
const PORT = process.env.PORT || 5000

/* Check to make sure API is running */
app.get('/', (req, res) => res.send('API is Running'))

/* Listen for Server starting and output the port it started on */
app.listen(PORT, () => console.log(`server started on port ${PORT}`))
