import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.bubble.css'
import { Link, useParams } from 'react-router-dom'
import { useMonitorDetailQuery } from '../hooks/useMonitorQuery'
import './MonitorPage.css'

export function MonitorDetailPage() {
  const { id } = useParams()
  const monitorId = Number(id)
  const { data: post, isLoading, errorMessage } = useMonitorDetailQuery(monitorId)

  if (isLoading) {
    return <main className="monitor-page">Loading...</main>
  }

  if (errorMessage) {
    return <main className="monitor-page monitor-error">{errorMessage}</main>
  }

  if (!post) {
    return <main className="monitor-page">Post not found.</main>
  }

  return (
    <main className="monitor-page">
      <header className="monitor-header">
        <div>
          <h1>{post.title}</h1>
          <small>{new Date(post.createdAt).toLocaleString('ko-KR')}</small>
        </div>
        <div className="monitor-actions">
          <Link to="/monitor" className="monitor-link-button monitor-link-secondary">
            Back to List
          </Link>
        </div>
      </header>

      <section className="monitor-detail-body">
        <ReactQuill value={post.contentDelta as unknown as string} readOnly theme="bubble" />
      </section>
    </main>
  )
}
