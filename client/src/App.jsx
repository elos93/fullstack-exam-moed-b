import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import AddWorkoutPage from './pages/AddWorkoutPage'
import WorkoutListPage from './pages/WorkoutListPage'
import WorkoutSearchPage from './pages/WorkoutSearchPage'

const navLinks = [
  { to: '/workouts-all', label: 'All Workouts' },
  { to: '/workout-add', label: 'Add Workout' },
  { to: '/workouts-search', label: 'Search' },
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
          <Route element={<Navigate replace to="/workouts-all" />} path="/" />
          <Route element={<WorkoutListPage />} path="/workouts-all" />
          <Route element={<AddWorkoutPage />} path="/workout-add" />
          <Route element={<WorkoutSearchPage />} path="/workouts-search" />
          <Route element={<Navigate replace to="/workouts-all" />} path="*" />
        </Routes>
      </main>
    </div>
  )
}

export default App
