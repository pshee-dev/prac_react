import { createApiClient } from '../../../api/client'
import type { CreateMonitorRequest, MonitorPost, QuillDelta } from '../type'

type ApiMode = 'json' | 'real'

const API_MODE = (import.meta.env.VITE_MONITOR_API_MODE ?? 'json') as ApiMode
const JSON_SERVER_BASE_URL = import.meta.env.VITE_MONITOR_JSON_BASE_URL ?? 'http://localhost:3001'
const REAL_API_BASE_URL = import.meta.env.VITE_MONITOR_REAL_BASE_URL ?? 'http://localhost:8080'

const jsonClient = createApiClient({ baseUrl: JSON_SERVER_BASE_URL })
const realClient = createApiClient({ baseUrl: REAL_API_BASE_URL })

const normalizePost = (post: MonitorPost): MonitorPost => {
  const numericId = Number(post.id)
  if (!Number.isFinite(numericId)) {
    throw new Error(`Invalid monitor id received: ${String(post.id)}`)
  }

  return {
    ...post,
    id: numericId,
    contentDelta: post.contentDelta ?? ({ ops: [] } as QuillDelta),
    contentHtml: post.contentHtml ?? '',
  }
}

const jsonServerApi = {
  async getPosts(): Promise<MonitorPost[]> {
    const posts = await jsonClient.get<MonitorPost[]>('/monitors')
    return posts.map(normalizePost)
  },
  async createPost(payload: CreateMonitorRequest): Promise<MonitorPost> {
    const posts = await jsonClient.get<MonitorPost[]>('/monitors')
    const normalized = posts.map(normalizePost)
    const nextId = normalized.length > 0 ? Math.max(...normalized.map((item) => item.id)) + 1 : 1
    const created = await jsonClient.post<MonitorPost>('/monitors', {
      id: nextId,
      ...payload,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
    })
    return normalizePost(created)
  },
  async getPostById(id: number): Promise<MonitorPost> {
    const post = await jsonClient.get<MonitorPost>(`/monitors/${id}`)
    return normalizePost(post)
  },
}

const realApi = {
  async getPosts(): Promise<MonitorPost[]> {
    const posts = await realClient.get<MonitorPost[]>('/v1/monitors')
    return posts.map(normalizePost)
  },
  async createPost(payload: CreateMonitorRequest): Promise<MonitorPost> {
    const created = await realClient.post<MonitorPost>('/v1/monitors', payload)
    return normalizePost(created)
  },
  async getPostById(id: number): Promise<MonitorPost> {
    const post = await realClient.get<MonitorPost>(`/v1/monitors/${id}`)
    return normalizePost(post)
  },
}

const adapterByMode = {
  json: jsonServerApi,
  real: realApi,
}

function getAdapter() {
  return adapterByMode[API_MODE] ?? jsonServerApi
}

export const monitorService = {
  getPosts: () => getAdapter().getPosts(),
  createPost: (payload: CreateMonitorRequest) => getAdapter().createPost(payload),
  getPostById: (id: number) => getAdapter().getPostById(id),
}
