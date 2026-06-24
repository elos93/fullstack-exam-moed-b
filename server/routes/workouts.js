const express = require('express')
const mongoose = require('mongoose')
const Workout = require('../models/Workout')

const router = express.Router()
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

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

router.get('/workouts/search', async (req, res) => {
  try {
    const name = (req.query.name || '').trim()

    if (!name) {
      return res.json([])
    }

    const workouts = await Workout.find({
      name: { $regex: escapeRegex(name), $options: 'i' },
    }).sort({ createdAt: -1 })

    res.json(workouts)
  } catch (error) {
    res.status(500).json({ message: 'Failed to search workouts' })
  }
})

router.delete('/workouts/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid workout id' })
    }

    const workout = await Workout.findByIdAndDelete(id)

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' })
    }

    res.status(200).json({ message: 'Workout deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete workout' })
  }
})

module.exports = router
