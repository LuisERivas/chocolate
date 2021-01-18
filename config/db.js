/* require mongoose */
const mongoose = require('mongoose')

/* require config */
const config = require('config')

/* Access code in config file */
const db = config.get('mongoURI')

/* call the server (keep asynchronous because that is the common way of doing it) */
const connectDB = async () => {
/* Async requires a try catch structure */
  try {
    /* try to connect to db with mongoose */
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    // if it connects, run this text
    console.log('MongoDB connected...')
    // if unable to connect by using mongoose
  } catch (err) {
    // log the error
    console.error(err.message)
    // exit the process
    process.exit(1)
  }
}

// export the connectDB function
module.exports = connectDB
