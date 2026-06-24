import { useEffect, useState } from 'react'
import { searchWorkouts } from '../api/workoutsApi'

function WorkoutSearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      setResults([])
      setError('')
      setIsLoading(false)
      return undefined
    }

    const controller = new AbortController()
    const timeoutId = window.setTimeout(async () => {
      try {
        setIsLoading(true)
        setError('')
        const data = await searchWorkouts(trimmedQuery, controller.signal)
        setResults(data)
      } catch (searchError) {
        if (searchError.name !== 'CanceledError' && searchError.code !== 'ERR_CANCELED') {
          setError('Could not search workouts.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }, 250)

    return () => {
      window.clearTimeout(timeoutId)
      controller.abort()
    }
  }, [query])

  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Find
        </p>
        <h2 className="text-3xl font-bold tracking-tight">Workouts Search</h2>
      </div>

      <label className="block max-w-2xl space-y-2">
        <span className="text-sm font-semibold text-slate-700">Workout name</span>
        <input
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type to search"
          type="text"
          value={query}
        />
      </label>

      {isLoading && <p className="text-slate-600">Searching workouts...</p>}

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {!query.trim() && (
        <div className="rounded-md border border-slate-200 bg-white p-6 text-slate-600">
          Start typing to search workouts.
        </div>
      )}

      {query.trim() && !isLoading && !error && results.length === 0 && (
        <div className="rounded-md border border-slate-200 bg-white p-6 text-slate-600">
          No matching workouts found.
        </div>
      )}

      {results.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((workout) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={workout._id}
            >
              <h3 className="text-xl font-bold">{workout.name}</h3>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-emerald-700">
                {workout.muscleGroup}
              </p>
              <p className="mt-2 text-slate-600">{workout.description}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default WorkoutSearchPage
