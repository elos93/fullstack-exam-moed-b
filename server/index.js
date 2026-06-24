const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const workoutRoutes = require('./routes/workouts')

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI

app.use(cors())
app.use(express.json())
app.use(workoutRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Workout Tracker server is active' })
})

if (!MONGODB_URI) {
  console.error('MongoDB connection failed: MONGODB_URI is not defined')
  process.exit(1)
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  })
