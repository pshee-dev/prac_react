type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface ApiClientConfig {
  baseUrl: string
  defaultHeaders?: Record<string, string>
}

export interface RequestOptions {
  method?: HttpMethod
  body?: unknown
  headers?: Record<string, string>
}

async function request<T>(
  config: ApiClientConfig,
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const url = `${config.baseUrl}${path}`
  const method = options.method ?? 'GET'
  const isBodyProvided = options.body !== undefined

  const response = await fetch(url, {
    method,
    headers: {
      ...(isBodyProvided ? { 'Content-Type': 'application/json' } : {}),
      ...config.defaultHeaders,
      ...options.headers,
    },
    body: isBodyProvided ? JSON.stringify(options.body) : undefined,
  })

  if (!response.ok) {
    let detail = ''
    try {
      detail = await response.text()
    } catch {
      detail = ''
    }
    const suffix = detail ? `: ${detail}` : ''
    throw new Error(`Request failed (${response.status}) ${response.statusText}${suffix}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export function createApiClient(config: ApiClientConfig) {
  return {
    get: <T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
      request<T>(config, path, { ...options, method: 'GET' }),
    post: <T>(path: string, body: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
      request<T>(config, path, { ...options, method: 'POST', body }),
    put: <T>(path: string, body: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
      request<T>(config, path, { ...options, method: 'PUT', body }),
    patch: <T>(path: string, body: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
      request<T>(config, path, { ...options, method: 'PATCH', body }),
    delete: <T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
      request<T>(config, path, { ...options, method: 'DELETE' }),
  }
}
