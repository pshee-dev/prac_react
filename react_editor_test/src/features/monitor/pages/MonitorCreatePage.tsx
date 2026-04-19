import { Link, useNavigate } from 'react-router-dom'
import { MonitorForm } from '../components/MonitorForm'
import { useCreateMonitorMutation } from '../hooks/useMonitorMutation'
import type { CreateMonitorRequest } from '../type'
import './MonitorPage.css'

const mode = import.meta.env.VITE_MONITOR_API_MODE ?? 'mock'

export function MonitorCreatePage() {
  const navigate = useNavigate()
  const { mutateAsync, isLoading: isSubmitting, errorMessage } = useCreateMonitorMutation()

  const handleSubmit = async (payload: CreateMonitorRequest) => {
    await mutateAsync(payload)
    navigate('/monitor')
  }

  return (
    <main className="monitor-page">
      <header className="monitor-header">
        <div>
          <h1>Create Monitor Issue</h1>
          <p>Issue create page</p>
          <small>API mode: {mode}</small>
        </div>

        <div className="monitor-actions">
          <Link to="/monitor" className="monitor-link-button monitor-link-secondary">
            Back to List
          </Link>
        </div>
      </header>

      {errorMessage ? <p className="monitor-error">{errorMessage}</p> : null}

      <section className="monitor-form-page">
        <MonitorForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </section>
    </main>
  )
}
