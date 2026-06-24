import { useEffect, useState } from 'react'
import { deleteWorkout, getWorkouts } from '../api/workoutsApi'

function WorkoutListPage() {
  const [workouts, setWorkouts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadWorkouts() {
      try {
        setError('')
        setIsLoading(true)
        const data = await getWorkouts()

        if (isMounted) {
          setWorkouts(data)
        }
      } catch (loadError) {
        if (isMounted) {
          setError('Could not load workouts.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadWorkouts()

    return () => {
      isMounted = false
    }
  }, [])

  async function handleDelete(id) {
    try {
      setError('')
      setDeletingId(id)
      await deleteWorkout(id)
      setWorkouts((currentWorkouts) => currentWorkouts.filter((workout) => workout._id !== id))
    } catch (deleteError) {
      setError('Could not delete workout.')
    } finally {
      setDeletingId('')
    }
  }

  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Workouts
        </p>
        <h2 className="text-3xl font-bold tracking-tight">All Workouts</h2>
      </div>

      {isLoading && (
        <div className="rounded-md border border-slate-200 bg-white p-4 text-slate-600">
          Loading workouts...
        </div>
      )}

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {!isLoading && !error && workouts.length === 0 && (
        <div className="rounded-md border border-slate-200 bg-white p-6 text-slate-600">
          No workouts yet.
        </div>
      )}

      {!isLoading && workouts.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {workouts.map((workout) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={workout._id}
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{workout.name}</h3>
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                  {workout.muscleGroup}
                </p>
                <p className="text-slate-600">{workout.description}</p>
              </div>

              <button
                className="mt-5 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
                disabled={deletingId === workout._id}
                onClick={() => handleDelete(workout._id)}
                type="button"
              >
                {deletingId === workout._id ? 'Deleting...' : 'Workout Delete'}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default WorkoutListPage
