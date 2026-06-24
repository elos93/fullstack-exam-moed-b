import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_URL,
})

export async function getWorkouts() {
  const response = await api.get('/workouts')
  return response.data
}

export async function createWorkout(workout) {
  const response = await api.post('/workouts', workout)
  return response.data
}

export async function searchWorkouts(name) {
  const response = await api.get('/workouts/search', {
    params: { name },
  })
  return response.data
}

export async function deleteWorkout(id) {
  const response = await api.delete(`/workouts/${id}`)
  return response.data
}
