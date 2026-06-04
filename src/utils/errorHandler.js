/**
 * errorHandler.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Global API error normalisation and handling utilities.
 *
 * BACKEND INTEGRATION NOTE:
 *   Assumes the Express backend returns errors in the format:
 *     { success: false, message: "Human-readable message", errors: [...] }
 *
 *   The axios response interceptor in api.js calls handleApiError() for every
 *   non-2xx response, so individual service functions receive a normalised
 *   AppError object rather than a raw AxiosError.
 *
 *   To display errors in the UI, read error.message from the caught error.
 *   The toast-ready structure allows any component to show errors without
 *   writing its own error extraction logic.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { HTTP_STATUS } from './constants'

// ── Normalised error class ────────────────────────────────────────────────────

/**
 * AppError — a consistent error shape used throughout the frontend.
 * @property {string}   message    - Human-readable error text (safe to display in UI)
 * @property {number}   status     - HTTP status code (or 0 for network errors)
 * @property {string}   code       - Machine-readable code, e.g. "UNAUTHORIZED"
 * @property {any[]}    errors     - Field-level validation errors from backend
 * @property {boolean}  isNetwork  - True if the request never reached the server
 */
export class AppError extends Error {
  constructor ({ message, status = 0, code = 'UNKNOWN', errors = [], isNetwork = false }) {
    super(message)
    this.name      = 'AppError'
    this.message   = message
    this.status    = status
    this.code      = code
    this.errors    = errors
    this.isNetwork = isNetwork
  }
}

// ── Main handler ──────────────────────────────────────────────────────────────

/**
 * Normalise any Axios error into an AppError.
 * Called by the axios response interceptor — no need to call manually.
 *
 * @param {import('axios').AxiosError} error
 * @returns {AppError}
 */
export const handleApiError = (error) => {
  // Network / timeout — server was unreachable
  if (!error.response) {
    return new AppError({
      message:   'Unable to reach the server. Check your internet connection.',
      status:    0,
      code:      'NETWORK_ERROR',
      isNetwork: true,
    })
  }

  const { status, data } = error.response

  // Use the backend's message if present, otherwise fall back to defaults
  const message = data?.message || defaultMessage(status)
  const code    = data?.code    || codeFromStatus(status)
  const errors  = data?.errors  || []

  return new AppError({ message, status, code, errors })
}

// ── Status-to-message map ─────────────────────────────────────────────────────

const defaultMessage = (status) => {
  switch (status) {
    case HTTP_STATUS.BAD_REQUEST:  return 'Invalid request. Please check your input.'
    case HTTP_STATUS.UNAUTHORIZED: return 'Your session has expired. Please log in again.'
    case HTTP_STATUS.FORBIDDEN:    return 'You do not have permission to perform this action.'
    case HTTP_STATUS.NOT_FOUND:    return 'The requested resource was not found.'
    case HTTP_STATUS.SERVER_ERROR: return 'An unexpected server error occurred. Please try again later.'
    default:                       return 'Something went wrong. Please try again.'
  }
}

const codeFromStatus = (status) => {
  const map = {
    [HTTP_STATUS.BAD_REQUEST]:  'BAD_REQUEST',
    [HTTP_STATUS.UNAUTHORIZED]: 'UNAUTHORIZED',
    [HTTP_STATUS.FORBIDDEN]:    'FORBIDDEN',
    [HTTP_STATUS.NOT_FOUND]:    'NOT_FOUND',
    [HTTP_STATUS.SERVER_ERROR]: 'SERVER_ERROR',
  }
  return map[status] || 'UNKNOWN'
}

// ── Toast-ready helper ────────────────────────────────────────────────────────

/**
 * Extract a display-safe message from any thrown value.
 * Useful inside catch blocks before passing to a toast/snackbar.
 *
 * @param {unknown} error
 * @returns {string}
 */
export const getErrorMessage = (error) => {
  if (error instanceof AppError) return error.message
  if (error instanceof Error)    return error.message
  if (typeof error === 'string') return error
  return 'An unexpected error occurred.'
}

// ── Validation error helper ───────────────────────────────────────────────────

/**
 * Convert backend field-level validation errors into a flat object
 * keyed by field name, ready to pass to form state.
 *
 * Backend format:  [{ field: "email", message: "Invalid email" }]
 * Output:          { email: "Invalid email" }
 *
 * @param {AppError} error
 * @returns {Record<string, string>}
 */
export const extractFieldErrors = (error) => {
  if (!(error instanceof AppError) || !error.errors?.length) return {}
  return error.errors.reduce((acc, { field, message }) => {
    if (field) acc[field] = message
    return acc
  }, {})
}
