import { Link, Route, Routes } from 'react-router-dom'

const projectTitle =
  '\u05de\u05d1\u05d7\u05df \u05de\u05d5\u05e2\u05d3 \u05d1\u05f3 \u2013 Movie Watchlist'

function App() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <nav className="flex items-center justify-between border-b border-slate-200 pb-4">
          <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Movie Watchlist
          </span>
          <Link className="text-sm font-medium text-slate-700 hover:text-slate-950" to="/">
            Home
          </Link>
        </nav>

        <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-4">
                  <p className="text-sm font-medium text-slate-500">Project setup</p>
                  <h1 className="text-3xl font-bold">{projectTitle}</h1>
                  <p className="max-w-2xl text-slate-600">
                    Full stack skeleton is ready. The movie watchlist features will be built in
                    the next stage.
                  </p>
                </div>
              }
            />
          </Routes>
        </section>
      </div>
    </main>
  )
}

export default App
