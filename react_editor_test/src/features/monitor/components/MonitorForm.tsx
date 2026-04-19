import { type FormEvent, useMemo, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill-new'
import ImageResize from '@mgreminger/quill-image-resize-module'
import 'react-quill-new/dist/quill.snow.css'
import type { CreateMonitorRequest, MonitorSeverity, QuillDelta } from '../type'

interface QuillEditorLike {
  getContents: () => QuillDelta
}

interface MonitorFormProps {
  onSubmit: (payload: CreateMonitorRequest) => Promise<void>
  isSubmitting: boolean
}

const severities: MonitorSeverity[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
const emptyDelta: QuillDelta = { ops: [] }

const initialFormState: CreateMonitorRequest = {
  title: '',
  contentHtml: '',
  contentDelta: emptyDelta,
  severity: 'MEDIUM',
}
const JSON_SERVER_BODY_LIMIT_BYTES = 102400

function hasMeaningfulDelta(delta: QuillDelta) {
  if (!delta.ops?.length) {
    return false
  }
  return delta.ops.some((op) => {
    if (typeof op.insert === 'string') {
      return op.insert.trim().length > 0
    }
    return true
  })
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'list',
  'link',
  'image',
  'align',
]

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ align: [] }, 'bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  ['link', 'image'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  ['clean'],
]

let isImageResizeRegistered = false
if (!isImageResizeRegistered) {
  Quill.register('modules/imageResize', ImageResize)
  isImageResizeRegistered = true
}

export function MonitorForm({ onSubmit, isSubmitting }: MonitorFormProps) {
  const [form, setForm] = useState<CreateMonitorRequest>(initialFormState)
  const [localError, setLocalError] = useState<string | null>(null)

  const modules = useMemo(
    () => ({
      toolbar: toolbarOptions,
      imageResize: {
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
      },
    }),
    [],
  )

  const handleChange = (key: keyof CreateMonitorRequest, value: CreateMonitorRequest[typeof key]) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLocalError(null)

    if (!form.title.trim()) {
      setLocalError('Please enter a title.')
      return
    }

    if (!hasMeaningfulDelta(form.contentDelta)) {
      setLocalError('Please enter content.')
      return
    }

    if ((import.meta.env.VITE_MONITOR_API_MODE ?? 'mock') === 'json') {
      const payloadSize = new TextEncoder().encode(
        JSON.stringify({
          contentHtml: form.contentHtml,
          contentDelta: form.contentDelta,
        }),
      ).length

      if (payloadSize > JSON_SERVER_BODY_LIMIT_BYTES) {
        setLocalError('Content too large for json-server (100KB). Reduce image size/count.')
        return
      }
    }

    try {
      await onSubmit({
        title: form.title.trim(),
        contentHtml: form.contentHtml,
        contentDelta: form.contentDelta,
        severity: form.severity,
      })
      setForm(initialFormState)
    } catch {
      setLocalError('Failed to submit. Please try again.')
    }
  }

  return (
    <form className="monitor-form" onSubmit={handleSubmit}>
      <h2>Issue Form</h2>
      <label className="monitor-field">
        <span>Title</span>
        <input
          value={form.title}
          onChange={(event) => handleChange('title', event.target.value)}
          placeholder="ex) Redis connection delay"
        />
      </label>

      <label className="monitor-field">
        <span>Severity</span>
        <select
          value={form.severity}
          onChange={(event) => handleChange('severity', event.target.value as MonitorSeverity)}
        >
          {severities.map((severity) => (
            <option key={severity} value={severity}>
              {severity}
            </option>
          ))}
        </select>
      </label>

      <div className="monitor-field">
        <span>Content</span>
        <ReactQuill
          theme="snow"
          value={form.contentHtml}
          onChange={(html, _delta, _source, editor) => {
            const quillEditor = editor as unknown as QuillEditorLike
            handleChange('contentHtml', html)
            handleChange('contentDelta', quillEditor.getContents())
          }}
          modules={modules}
          formats={formats}
          placeholder="Describe the issue details."
        />
      </div>

      {localError ? <p className="monitor-error">{localError}</p> : null}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
