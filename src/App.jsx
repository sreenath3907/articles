import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import UsagePage from './pages/UsagePage.jsx'
import SearchPage from './pages/SearchPage.jsx'

function Layout({ children }) {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">Usage</div>
        <nav className="nav">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/usage">
            Usage Dashboard
          </Link>
          <Link className="nav-link" to="/search">
            Search Explorer
          </Link>
        </nav>
      </aside>
      <main className="content">{children}</main>
    </div>
  )
}

function Home() {
  return (
    <div className="page">
      <header className="hero">
        <div className="eyebrow">Agency discovery</div>
        <h1>Search & usage hub</h1>
        <p className="lede">
          Jump into dashboards or run searches. Mock data today; wire Opoint/OpenAlex APIs next.
        </p>
        <div className="actions">
          <Link to="/usage" className="primary-btn">
            Usage dashboard
          </Link>
          <Link to="/search" className="ghost-button">
            Search explorer
          </Link>
        </div>
      </header>

      <section className="panel cards-grid">
        <div className="panel-header">
          <div>
            <p className="label">Shortcuts</p>
            <h2>Pick a workspace</h2>
          </div>
        </div>
        <div className="card-grid">
          <article className="mini-card">
            <p className="source">Usage dashboard</p>
            <p className="subtle">View mock metrics, timelines, and source breakdowns by agency.</p>
            <Link to="/usage" className="primary-btn small">
              Open
            </Link>
          </article>
          <article className="mini-card">
            <p className="source">Search explorer</p>
            <p className="subtle">Use presets, adjust params, and inspect raw JSON results.</p>
            <Link to="/search" className="primary-btn small">
              Open
            </Link>
          </article>
          <article className="mini-card">
            <p className="source">APIs next</p>
            <p className="subtle">Replace mocks with Opoint/OpenAlex once keys and endpoints are set.</p>
            <span className="pill">Coming soon</span>
          </article>
        </div>
      </section>
    </div>
  )
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usage" element={<UsagePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Layout>
  )
}

export default App
