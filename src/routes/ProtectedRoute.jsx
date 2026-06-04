/**
 * ProtectedRoute.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Route guard that redirects unauthenticated users to /login.
 *
 * BACKEND INTEGRATION NOTE:
 *   This component reads isAuthenticated and loading from AuthContext.
 *
 *   CURRENT BEHAVIOUR (mock mode):
 *     - isAuthenticated is always true as long as any token exists in
 *       localStorage (even the mock token from authService).
 *     - No real backend validation happens.
 *
 *   PRODUCTION BEHAVIOUR (after backend is live):
 *     - On mount, AuthContext calls GET /api/auth/me with the stored JWT.
 *     - If the backend returns 200 → isAuthenticated = true → allow access.
 *     - If the backend returns 401 → axios interceptor clears localStorage
 *       → isAuthenticated = false → ProtectedRoute redirects to /login.
 *
 *   The `loading` state prevents a flash-redirect on page refresh while the
 *   auth check is in flight.  We show a full-screen spinner instead.
 *
 *   USAGE in routes/index.jsx:
 *     <Route element={<ProtectedRoute />}>
 *       <Route path="/dashboard" element={<Dashboard />} />
 *       ...
 *     </Route>
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  // While the initial token validation is in flight, show a spinner.
  // This prevents an incorrect redirect to /login on hard refresh.
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" />
          <p className="text-sm text-gray-500">Verifying your session…</p>
        </div>
      </div>
    )
  }

  // Not authenticated → redirect to login, preserving the intended destination
  // so the login page can redirect back after successful auth.
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Authenticated → render the matched child route
  return <Outlet />
}

export default ProtectedRoute
