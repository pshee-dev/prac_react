import { useCallback, useEffect, useState } from 'react'
import { monitorService } from '../services/monitorService'
import type { MonitorPost } from '../type'

export function useMonitorListQuery() {
  const [posts, setPosts] = useState<MonitorPost[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)
    try {
      const response = await monitorService.getPosts()
      const sorted = [...response].sort(
        (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
      )
      setPosts(sorted)
    } catch {
      setErrorMessage('Failed to load monitor issues.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return {
    data: posts,
    isLoading,
    errorMessage,
    refetch,
  }
}

export function useMonitorDetailQuery(id: number) {
  const [post, setPost] = useState<MonitorPost | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!Number.isFinite(id)) {
      setErrorMessage('Invalid monitor id.')
      return
    }

    const load = async () => {
      setIsLoading(true)
      setErrorMessage(null)
      try {
        const result = await monitorService.getPostById(id)
        setPost(result)
      } catch {
        setErrorMessage('Failed to load monitor detail.')
      } finally {
        setIsLoading(false)
      }
    }

    void load()
  }, [id])

  return {
    data: post,
    isLoading,
    errorMessage,
  }
}

