import { useState } from 'react'
import { monitorService } from '../services/monitorService'
import type { CreateMonitorRequest } from '../type'

export function useCreateMonitorMutation() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const mutateAsync = async (payload: CreateMonitorRequest) => {
    setIsLoading(true)
    setErrorMessage(null)
    try {
      return await monitorService.createPost(payload)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create issue.'
      setErrorMessage(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    mutateAsync,
    isLoading,
    errorMessage,
  }
}

