import { Link } from 'react-router-dom'
import type { MonitorPost } from '../type'

interface MonitorItemProps {
  post: MonitorPost
}

function buildPreview(post: MonitorPost) {
  const text = post.contentDelta.ops
    .map((op) => (typeof op.insert === 'string' ? op.insert : ''))
    .join('')
    .replace(/\n+/g, ' ')
    .trim()
  if (!text) {
    return '(no preview)'
  }
  return text.length > 140 ? `${text.slice(0, 140)}...` : text
}

export function MonitorItem({ post }: MonitorItemProps) {
  return (
    <article className="monitor-item">
      <header className="monitor-item-header">
        <h3>{post.title}</h3>
        <div className="monitor-tags">
          <span className={`monitor-tag severity-${post.severity.toLowerCase()}`}>
            {post.severity}
          </span>
          <span className="monitor-tag">{post.status}</span>
        </div>
      </header>
      <p className="monitor-content">{buildPreview(post)}</p>
      <Link to={`/monitor/${post.id}`} className="monitor-detail-link">
        View Detail
      </Link>
      <time dateTime={post.createdAt}>
        {new Date(post.createdAt).toLocaleString('ko-KR')}
      </time>
    </article>
  )
}
