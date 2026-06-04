/**
 * App.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Application root.
 *
 * BACKEND INTEGRATION NOTE:
 *   AuthProvider wraps the entire tree so every component can access auth
 *   state via useAuth().  BrowserRouter is a sibling, not a parent, of
 *   AuthProvider so that AuthContext can use useNavigate if needed in future.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
