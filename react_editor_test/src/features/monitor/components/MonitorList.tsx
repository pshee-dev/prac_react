import { MonitorItem } from './MonitorItem'
import type { MonitorPost } from '../type'

interface MonitorListProps {
  posts: MonitorPost[]
  isLoading: boolean
}

export function MonitorList({ posts, isLoading }: MonitorListProps) {
  if (isLoading) {
    return <p className="monitor-empty">불러오는 중...</p>
  }

  if (!posts.length) {
    return <p className="monitor-empty">등록된 이슈가 없습니다.</p>
  }

  return (
    <section className="monitor-list">
      {posts.map((post) => (
        <MonitorItem key={post.id} post={post} />
      ))}
    </section>
  )
}
