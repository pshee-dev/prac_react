import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MonitorCreatePage } from './features/monitor/pages/MonitorCreatePage'
import { MonitorDetailPage } from './features/monitor/pages/MonitorDetailPage'
import { MonitorPage } from './features/monitor/pages/MonitorPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/monitor" replace />} />
      <Route path="/monitor" element={<MonitorPage />} />
      <Route path="/monitor/new" element={<MonitorCreatePage />} />
      <Route path="/monitor/:id" element={<MonitorDetailPage />} />
    </Routes>
  )
}

export default App
