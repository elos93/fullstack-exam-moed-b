const express = require('express')
const Workout = require('../models/Workout')

const router = express.Router()

router.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 })
    res.json(workouts)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts' })
  }
})

router.post('/workouts', async (req, res) => {
  try {
    const { name, muscleGroup, description } = req.body

    if (!name || !muscleGroup || !description) {
      return res.status(400).json({ message: 'name, muscleGroup, and description are required' })
    }

    const workout = await Workout.create({ name, muscleGroup, description })
    res.status(201).json(workout)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message })
    }

    res.status(500).json({ message: 'Failed to create workout' })
  }
})

module.exports = router
