export type MonitorStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED'
export type MonitorSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export interface QuillDeltaOp {
  insert: string | Record<string, unknown>
  attributes?: Record<string, unknown>
}

export interface QuillDelta {
  ops: QuillDeltaOp[]
}

export interface MonitorPost {
  id: number
  title: string
  contentHtml: string
  contentDelta: QuillDelta
  status: MonitorStatus
  severity: MonitorSeverity
  createdAt: string
}

export interface CreateMonitorRequest {
  title: string
  contentHtml: string
  contentDelta: QuillDelta
  severity: MonitorSeverity
}
