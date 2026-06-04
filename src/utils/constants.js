/**
 * constants.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralised application-wide constants.
 *
 * BACKEND INTEGRATION NOTE:
 *   All API_ROUTES map directly to Express router endpoints.
 *   Example backend structure:
 *     /api/auth/*       → routes/auth.routes.js
 *     /api/resume/*     → routes/resume.routes.js
 *     /api/ats/*        → routes/ats.routes.js
 *     /api/interview/*  → routes/interview.routes.js
 *     /api/skillgap/*   → routes/skillGap.routes.js
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Base URL ──────────────────────────────────────────────────────────────────
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// ── Token storage key ─────────────────────────────────────────────────────────
export const TOKEN_KEY    = import.meta.env.VITE_TOKEN_KEY || 'cc_token'
export const USER_KEY     = 'cc_user'

// ── API route constants ───────────────────────────────────────────────────────
export const API_ROUTES = {
  // Auth — maps to POST /api/auth/login, etc.
  AUTH: {
    LOGIN:          '/auth/login',
    SIGNUP:         '/auth/signup',
    LOGOUT:         '/auth/logout',
    ME:             '/auth/me',
    REFRESH:        '/auth/refresh',
    CHANGE_PASSWORD:'/auth/change-password',
  },

  // Resume — maps to POST /api/resume/upload, etc.
  RESUME: {
    UPLOAD:         '/resume/upload',
    ANALYZE:        '/resume/analyze',
    LIST:           '/resume/list',
    DELETE:         (id) => `/resume/${id}`,
  },

  // ATS
  ATS: {
    SCORE:          '/ats/score',
    HISTORY:        '/ats/history',
    BREAKDOWN:      '/ats/breakdown',
  },

  // JD Analyzer
  JD: {
    ANALYZE:        '/jd/analyze',
    HISTORY:        '/jd/history',
  },

  // Interview Generator
  INTERVIEW: {
    GENERATE:       '/interview/generate',
    SAVE:           '/interview/save',
    LIST:           '/interview/list',
  },

  // Skill Gap
  SKILL_GAP: {
    ANALYZE:        '/skillgap/analyze',
    ROADMAP:        '/skillgap/roadmap',
    UPDATE:         '/skillgap/update',
  },

  // Profile
  PROFILE: {
    GET:            '/profile',
    UPDATE:         '/profile/update',
    AVATAR:         '/profile/avatar',
  },
}

// ── HTTP status codes ─────────────────────────────────────────────────────────
export const HTTP_STATUS = {
  OK:           200,
  CREATED:      201,
  NO_CONTENT:   204,
  BAD_REQUEST:  400,
  UNAUTHORIZED: 401,
  FORBIDDEN:    403,
  NOT_FOUND:    404,
  SERVER_ERROR: 500,
}

// ── App routes (frontend) ─────────────────────────────────────────────────────
export const APP_ROUTES = {
  HOME:               '/',
  LOGIN:              '/login',
  SIGNUP:             '/signup',
  DASHBOARD:          '/dashboard',
  RESUME_UPLOAD:      '/resume-upload',
  JD_ANALYZER:        '/jd-analyzer',
  ATS_SCORE:          '/ats-score',
  INTERVIEW_GENERATOR:'/interview-generator',
  SKILL_GAP:          '/skill-gap',
  PROFILE:            '/profile',
}

// ── File upload limits ────────────────────────────────────────────────────────
export const UPLOAD = {
  MAX_SIZE_MB:   5,
  MAX_SIZE_BYTES:5 * 1024 * 1024,
  ACCEPTED_TYPES:['application/pdf'],
  ACCEPTED_EXT:  '.pdf',
}

// ── Request timeout (ms) ──────────────────────────────────────────────────────
export const REQUEST_TIMEOUT = 30_000
