/**
 * AuthContext.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Global authentication state provider for Career Copilot.
 *
 * BACKEND INTEGRATION NOTE:
 *   This context is the single source of truth for auth state on the frontend.
 *
 *   On mount it checks localStorage for a persisted JWT (via getToken).
 *   If a token exists, it calls authService.getProfile() to validate it
 *   against the backend and hydrate the user object.  If the token is expired,
 *   the backend returns 401 → the axios interceptor calls clearAuth() →
 *   getProfile() throws → we set user to null and isAuthenticated to false.
 *
 *   LOGIN FLOW:
 *     1. Component calls  login({ email, password })
 *     2. AuthContext calls authService.login() which:
 *        a. POSTs to /api/auth/login
 *        b. Saves token + user to localStorage
 *        c. Returns { token, user }
 *     3. AuthContext sets user state → ProtectedRoute allows access
 *     4. navigate('/dashboard') is called inside the Login page component
 *
 *   LOGOUT FLOW:
 *     1. Component calls  logout()
 *     2. AuthContext calls authService.logout() which clears localStorage
 *     3. AuthContext sets user to null → ProtectedRoute redirects to /login
 *
 *   USAGE in any component:
 *     import { useAuth } from '../context/AuthContext'
 *     const { user, isAuthenticated, login, logout, loading } = useAuth()
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { login as loginService, signup as signupService, logout as logoutService, getProfile } from '../services/authService'
import { getToken, getUser } from '../utils/storage'

// ── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext(null)

// ── Provider ──────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }) => {
  // Seed from localStorage for instant hydration (prevents flash on reload)
  const [user,          setUser]          = useState(() => getUser())
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getToken()))
  const [loading,       setLoading]       = useState(true)   // true during initial auth check
  const [authError,     setAuthError]     = useState(null)

  // ── Initial auth check on mount ─────────────────────────────────────────────
  // In mock mode: if a token already exists in localStorage, we trust it and
  // skip the async getProfile call so loading resolves instantly (no spinner
  // flash on hard refresh or after login/signup navigation).
  //
  // TODO (backend): When a real backend is live, remove the early-return branch
  // and always call getProfile() to validate the JWT against /api/auth/me.
  useEffect(() => {
    const verifyToken = async () => {
      const token   = getToken()
      const cached  = getUser()

      if (!token) {
        // No token — definitely not authenticated
        setLoading(false)
        return
      }

      if (cached) {
        // Token + cached user found — trust it immediately (mock mode)
        // In production: remove this branch and always hit /api/auth/me
        setUser(cached)
        setIsAuthenticated(true)
        setLoading(false)
        return
      }

      // Token exists but no cached user — fetch from backend (or mock)
      try {
        const userData = await getProfile()
        setUser(userData)
        setIsAuthenticated(true)
      } catch {
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }
    verifyToken()
  }, [])

  // ── Login ────────────────────────────────────────────────────────────────────
  const login = useCallback(async (credentials) => {
    setAuthError(null)
    try {
      const data = await loginService(credentials)
      setUser(data.user)
      setIsAuthenticated(true)
      return data
    } catch (err) {
      setAuthError(err.message)
      throw err
    }
  }, [])

  // ── Signup ───────────────────────────────────────────────────────────────────
  const signup = useCallback(async (payload) => {
    setAuthError(null)
    try {
      const data = await signupService(payload)
      setUser(data.user)
      setIsAuthenticated(true)
      return data
    } catch (err) {
      setAuthError(err.message)
      throw err
    }
  }, [])

  // ── Logout ───────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    await logoutService()
    setUser(null)
    setIsAuthenticated(false)
    setAuthError(null)
  }, [])

  // ── Update user (after profile edit) ─────────────────────────────────────────
  const updateUser = useCallback((updates) => {
    setUser((prev) => ({ ...prev, ...updates }))
  }, [])

  const value = {
    user,
    isAuthenticated,
    loading,
    authError,
    login,
    logout,
    signup,
    updateUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────────────────────

/**
 * useAuth — access auth state and actions from any component.
 *
 * @returns {{
 *   user: object|null,
 *   isAuthenticated: boolean,
 *   loading: boolean,
 *   authError: string|null,
 *   login: Function,
 *   logout: Function,
 *   signup: Function,
 *   updateUser: Function,
 * }}
 */
export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}

export default AuthContext
