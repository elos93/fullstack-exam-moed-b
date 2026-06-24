const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const workoutRoutes = require('./routes/workouts')

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI
const FRONTEND_URL = process.env.FRONTEND_URL
let cachedConnection = null

const corsOptions = FRONTEND_URL ? { origin: FRONTEND_URL } : {}

async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined')
  }

  if (cachedConnection) {
    return cachedConnection
  }

  cachedConnection = mongoose.connect(MONGODB_URI)
  return cachedConnection
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(async (req, res, next) => {
  try {
    await connectToDatabase()
    next()
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    res.status(500).json({ message: 'Database connection failed' })
  }
})
app.use(workoutRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Workout Tracker API is running' })
})

if (require.main === module) {
  connectToDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
        console.log('MongoDB connected successfully')
      })
    })
    .catch((error) => {
      console.error('MongoDB connection failed:', error.message)
      process.exit(1)
    })
}

module.exports = app
