import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import AddWorkoutPage from './pages/AddWorkoutPage'
import WorkoutListPage from './pages/WorkoutListPage'
import WorkoutSearchPage from './pages/WorkoutSearchPage'

const navLinks = [
  { to: '/all-workouts', label: 'All Workouts' },
  { to: '/add-workout', label: 'Add Workout' },
  { to: '/search-workouts', label: 'Search' },
]

function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Fullstack Workout Tracker App
            </p>
            <h1 className="text-2xl font-bold tracking-tight">Workout Tracker</h1>
          </div>
          <nav className="flex flex-wrap gap-2">
            {navLinks.map((link) => (
              <NavLink
                className={({ isActive }) =>
                  [
                    'rounded-md px-3 py-2 text-sm font-semibold transition',
                    isActive
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                  ].join(' ')
                }
                key={link.to}
                to={link.to}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Routes>
          <Route element={<Navigate replace to="/all-workouts" />} path="/" />
          <Route element={<WorkoutListPage />} path="/all-workouts" />
          <Route element={<AddWorkoutPage />} path="/add-workout" />
          <Route element={<WorkoutSearchPage />} path="/search-workouts" />
          <Route element={<Navigate replace to="/all-workouts" />} path="/workouts-all" />
          <Route element={<Navigate replace to="/add-workout" />} path="/workout-add" />
          <Route element={<Navigate replace to="/search-workouts" />} path="/workouts-search" />
          <Route element={<Navigate replace to="/all-workouts" />} path="*" />
        </Routes>
      </main>
    </div>
  )
}

export default App
