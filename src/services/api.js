/**
 * api.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralised Axios instance for all Career Copilot API calls.
 *
 * BACKEND INTEGRATION NOTE:
 *   1. Set VITE_API_URL in your .env file to point to the Express server.
 *      e.g.  VITE_API_URL=http://localhost:5000/api
 *
 *   2. Every service file (authService, resumeService, etc.) imports this
 *      instance and uses it instead of raw axios.  This ensures:
 *        - JWT token is always attached automatically
 *        - Errors are always normalised via handleApiError
 *        - Base URL is configured in one place
 *
 *   3. REQUEST INTERCEPTOR
 *      Reads the JWT from localStorage (via getToken) and appends:
 *        Authorization: Bearer <token>
 *      This header is expected by the Express jwt middleware:
 *        const { authenticate } = require('./middleware/auth')
 *        router.get('/protected', authenticate, handler)
 *
 *   4. RESPONSE INTERCEPTOR
 *      - On success: returns response.data directly so callers don't need
 *        to unwrap `.data` every time.
 *      - On error: normalises the AxiosError into an AppError and throws it.
 *        If the status is 401, also clears auth storage (token expired).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import axios from 'axios'
import { API_BASE_URL, REQUEST_TIMEOUT, HTTP_STATUS } from '../utils/constants'
import { getToken, clearAuth } from '../utils/storage'
import { handleApiError } from '../utils/errorHandler'

// ── Create instance ───────────────────────────────────────────────────────────

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
  },
})

// ── Request interceptor ───────────────────────────────────────────────────────
// Automatically attaches the JWT before every outgoing request.

api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ── Response interceptor ──────────────────────────────────────────────────────
// Unwraps successful responses and normalises errors.

api.interceptors.response.use(
  // SUCCESS: unwrap the data so callers receive the payload directly
  (response) => response.data,

  // ERROR: normalise and, on 401, clear stale auth
  (error) => {
    const appError = handleApiError(error)

    if (appError.status === HTTP_STATUS.UNAUTHORIZED) {
      // Token is expired or invalid — wipe local auth state.
      // AuthContext will react to the cleared token and redirect to /login.
      clearAuth()
    }

    return Promise.reject(appError)
  },
)

// ── Multipart helper ──────────────────────────────────────────────────────────
/**
 * POST a FormData payload (e.g. file uploads).
 * Sets Content-Type to multipart/form-data automatically.
 *
 * @param {string}   url
 * @param {FormData} formData
 * @param {Function} [onUploadProgress]  - receives ProgressEvent
 */
export const postForm = (url, formData, onUploadProgress) =>
  api.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  })

export default api
