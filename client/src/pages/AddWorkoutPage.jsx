import { useState } from 'react'
import { createWorkout } from '../api/workoutsApi'

const initialForm = {
  name: '',
  muscleGroup: '',
  description: '',
}

function AddWorkoutPage() {
  const [formData, setFormData] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
    setSuccessMessage('')
    setError('')
  }

  function validateForm() {
    const trimmedName = formData.name.trim()
    const trimmedMuscleGroup = formData.muscleGroup.trim()
    const trimmedDescription = formData.description.trim()

    if (!trimmedName) {
      return 'Name is required.'
    }

    if (trimmedName.length > 20) {
      return 'Name must be 20 characters or less.'
    }

    if (!trimmedMuscleGroup) {
      return 'Muscle group is required.'
    }

    if (!trimmedDescription) {
      return 'Description is required.'
    }

    if (trimmedDescription.length > 200) {
      return 'Description must be 200 characters or less.'
    }

    return ''
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const validationError = validateForm()

    if (validationError) {
      alert(validationError)
      return
    }

    try {
      setIsSubmitting(true)
      setError('')
      setSuccessMessage('')
      await createWorkout({
        name: formData.name.trim(),
        muscleGroup: formData.muscleGroup.trim(),
        description: formData.description.trim(),
      })
      setFormData(initialForm)
      setSuccessMessage('Workout added successfully.')
    } catch (submitError) {
      setError('Could not add workout.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="max-w-2xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Create
        </p>
        <h2 className="text-3xl font-bold tracking-tight">Add Workout</h2>
      </div>

      <form className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">Name</span>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            name="name"
            onChange={handleChange}
            placeholder="Leg Workout"
            type="text"
            value={formData.name}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">Muscle Group</span>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            name="muscleGroup"
            onChange={handleChange}
            placeholder="Legs"
            type="text"
            value={formData.muscleGroup}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">Description</span>
          <textarea
            className="min-h-32 w-full resize-y rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            name="description"
            onChange={handleChange}
            placeholder="A beginner leg workout"
            value={formData.description}
          />
        </label>

        {successMessage && (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-800">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <button
          className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-300"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Adding...' : 'Add Workout'}
        </button>
      </form>
    </section>
  )
}

export default AddWorkoutPage
