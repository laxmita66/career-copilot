/**
 * storage.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralised localStorage helpers for JWT token and user data persistence.
 *
 * BACKEND INTEGRATION NOTE:
 *   When the Express backend responds to /api/auth/login or /api/auth/signup,
 *   it returns:  { token: "eyJ...", user: { _id, name, email, ... } }
 *
 *   Call saveToken(token) and saveUser(user) immediately after a successful
 *   login/signup response to persist the session across page refreshes.
 *
 *   The axios interceptor in api.js reads getToken() and attaches it to every
 *   outgoing request as:  Authorization: Bearer <token>
 *
 *   On logout, call clearAuth() to wipe both values.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { TOKEN_KEY, USER_KEY } from './constants'

// ── Token ─────────────────────────────────────────────────────────────────────

/** Persist JWT token to localStorage */
export const saveToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch (e) {
    console.warn('[storage] Failed to save token:', e)
  }
}

/** Retrieve JWT token from localStorage. Returns null if not found. */
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch (e) {
    console.warn('[storage] Failed to get token:', e)
    return null
  }
}

/** Remove JWT token from localStorage */
export const removeToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch (e) {
    console.warn('[storage] Failed to remove token:', e)
  }
}

// ── User ──────────────────────────────────────────────────────────────────────

/** Persist user object (serialised as JSON) to localStorage */
export const saveUser = (user) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch (e) {
    console.warn('[storage] Failed to save user:', e)
  }
}

/** Retrieve and deserialise user object from localStorage */
export const getUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    console.warn('[storage] Failed to parse user:', e)
    return null
  }
}

/** Remove persisted user object */
export const removeUser = () => {
  try {
    localStorage.removeItem(USER_KEY)
  } catch (e) {
    console.warn('[storage] Failed to remove user:', e)
  }
}

// ── Combined ──────────────────────────────────────────────────────────────────

/** Clear all auth-related data (called on logout) */
export const clearAuth = () => {
  removeToken()
  removeUser()
}

/** Check whether a valid token exists in storage */
export const isAuthenticated = () => Boolean(getToken())
