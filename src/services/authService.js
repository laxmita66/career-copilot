/**
 * authService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * All authentication-related API calls.
 *
 * BACKEND INTEGRATION NOTE:
 *   Expected Express routes (auth.routes.js):
 *     POST   /api/auth/login          → validate credentials, return JWT + user
 *     POST   /api/auth/signup         → create user, return JWT + user
 *     POST   /api/auth/logout         → optional — invalidate refresh token
 *     GET    /api/auth/me             → return current user from JWT
 *     POST   /api/auth/change-password→ update password (requires old password)
 *
 *   Expected response shape for login/signup:
 *     {
 *       success: true,
 *       token:   "eyJhbGci...",
 *       user: {
 *         _id:            "mongo-object-id",
 *         firstName:      "Arjun",
 *         lastName:       "Sharma",
 *         email:          "arjun@example.com",
 *         targetRole:     "Senior Full Stack Developer",
 *         college:        "IIT Delhi",
 *         avatarUrl:      null,
 *         createdAt:      "2024-01-15T..."
 *       }
 *     }
 *
 *   MongoDB model: User  (models/User.js)
 *   Mongoose schema fields: firstName, lastName, email, passwordHash,
 *     college, degree, graduationYear, targetRole, location, linkedin,
 *     github, bio, avatarUrl, createdAt
 * ─────────────────────────────────────────────────────────────────────────────
 */

import api from './api'
import { API_ROUTES } from '../utils/constants'
import { saveToken, saveUser, clearAuth, getUser } from '../utils/storage'

/**
 * Log in with email and password.
 * Persists the returned JWT and user object to localStorage.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ token: string, user: object }>}
 */
export const login = async ({ email, password }) => {
  // TODO (backend): uncomment when Express /api/auth/login is ready
  // const data = await api.post(API_ROUTES.AUTH.LOGIN, { email, password })
  // saveToken(data.token)
  // saveUser(data.user)
  // return data

  // ── MOCK (remove when backend is ready) ───────────────────────────────────
  await delay(600)
  const mockData = {
    success: true,
    token: 'mock-jwt-token-login',
    user: { _id: '1', firstName: 'Arjun', lastName: 'Sharma', email, targetRole: 'Senior Full Stack Developer' },
  }
  saveToken(mockData.token)
  saveUser(mockData.user)
  return mockData
  // ─────────────────────────────────────────────────────────────────────────
}

/**
 * Register a new account.
 * Persists the returned JWT and user object to localStorage.
 *
 * @param {{ firstName: string, lastName: string, email: string, password: string }} payload
 * @returns {Promise<{ token: string, user: object }>}
 */
export const signup = async ({ firstName, lastName, email, password }) => {
  // TODO (backend): uncomment when Express /api/auth/signup is ready
  // const data = await api.post(API_ROUTES.AUTH.SIGNUP, { firstName, lastName, email, password })
  // saveToken(data.token)
  // saveUser(data.user)
  // return data

  // ── MOCK ──────────────────────────────────────────────────────────────────
  await delay(700)
  const mockData = {
    success: true,
    token: 'mock-jwt-token-signup',
    user: { _id: '1', firstName, lastName, email, targetRole: '' },
  }
  saveToken(mockData.token)
  saveUser(mockData.user)
  return mockData
  // ─────────────────────────────────────────────────────────────────────────
}

/**
 * Log out the current user.
 * Clears JWT + user from localStorage regardless of API response.
 *
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    // TODO (backend): await api.post(API_ROUTES.AUTH.LOGOUT)
  } finally {
    clearAuth()
  }
}

/**
 * Fetch the current authenticated user's profile from the backend.
 * Uses the JWT in the Authorization header (attached by the interceptor).
 *
 * @returns {Promise<object>} user object
 */
export const getProfile = async () => {
  // TODO (backend): return api.get(API_ROUTES.AUTH.ME)

  // ── MOCK ──────────────────────────────────────────────────────────────────
  await delay(400)
  return getUser()
  // ─────────────────────────────────────────────────────────────────────────
}

/**
 * Change the authenticated user's password.
 *
 * @param {{ currentPassword: string, newPassword: string }} payload
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const changePassword = async ({ currentPassword, newPassword }) => {
  // TODO (backend): return api.post(API_ROUTES.AUTH.CHANGE_PASSWORD, { currentPassword, newPassword })

  // ── MOCK ──────────────────────────────────────────────────────────────────
  await delay(500)
  return { success: true, message: 'Password changed successfully.' }
  // ─────────────────────────────────────────────────────────────────────────
}

// ── Internal helpers ──────────────────────────────────────────────────────────
const delay = (ms) => new Promise((r) => setTimeout(r, ms))
