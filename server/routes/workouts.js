const express = require('express')
const mongoose = require('mongoose')
const { z } = require('zod')
const Workout = require('../models/Workout')

const router = express.Router()
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const aiDescriptionSchema = z.object({
  description: z.string().trim().min(1).max(200),
})

router.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 })
    res.json(workouts)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts' })
  }
})

router.post('/workouts/generate', async (req, res) => {
  const name = (req.body.name || '').trim()
  const muscleGroup = (req.body.muscleGroup || '').trim()
  const model = process.env.AI_GATEWAY_MODEL

  if (!name || !muscleGroup) {
    return res.status(400).json({ message: 'name and muscleGroup are required' })
  }

  if (!process.env.AI_GATEWAY_API_KEY || !model) {
    return res.status(500).json({ message: 'AI generation is not configured' })
  }

  try {
    const { generateObject } = await import('ai')
    const { object } = await generateObject({
      model,
      schema: aiDescriptionSchema,
      prompt: [
        'Return JSON only. Do not return Markdown.',
        'Return exactly one field: description.',
        'The description must be a short workout description up to 200 characters.',
        `Workout name: ${name}`,
        `Muscle group: ${muscleGroup}`,
      ].join('\n'),
    })

    const description = object.description.trim()
    res.json({ description: description.slice(0, 200) })
  } catch (error) {
    res.status(500).json({ message: 'AI generation failed' })
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
