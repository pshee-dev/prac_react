import { Link } from 'react-router-dom'
import { MonitorList } from '../components/MonitorList'
import { useMonitorListQuery } from '../hooks/useMonitorQuery'
import './MonitorPage.css'

const mode = import.meta.env.VITE_MONITOR_API_MODE ?? 'mock'

export function MonitorPage() {
  const { data: posts, isLoading, errorMessage, refetch } = useMonitorListQuery()

  return (
    <main className="monitor-page">
      <header className="monitor-header">
        <div>
          <h1>Monitor Board</h1>
          <p>Issue list page</p>
          <small>API mode: {mode}</small>
        </div>

        <div className="monitor-actions">
          <button onClick={() => void refetch()} disabled={isLoading}>
            Refresh
          </button>
          <Link to="/monitor/new" className="monitor-link-button">
            New Issue
          </Link>
        </div>
      </header>

      {errorMessage ? <p className="monitor-error">{errorMessage}</p> : null}
      <MonitorList posts={posts} isLoading={isLoading} />
    </main>
  )
}
