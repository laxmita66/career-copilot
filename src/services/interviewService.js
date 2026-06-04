/**
 * interviewService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Interview question generation API calls.
 *
 * BACKEND INTEGRATION NOTE:
 *   Expected Express routes (interview.routes.js):
 *     POST  /api/interview/generate → AI-powered question generation
 *     POST  /api/interview/save     → persist a question set to MongoDB
 *     GET   /api/interview/list     → retrieve saved question sets
 *
 *   AI Integration:
 *     POST /api/interview/generate calls the AI service with a prompt like:
 *       "Generate 10 technical and 5 HR interview questions for a {role}
 *        developer at {level} level. Return structured JSON with
 *        { technical: [{q, difficulty}], hr: [{q}] }"
 *     Supported AI providers: OpenAI GPT-4o, Google Gemini, Anthropic Claude
 *     The provider is configured via INTERVIEW_AI_PROVIDER env var on backend.
 *
 *   MongoDB model: InterviewSet  (models/InterviewSet.js)
 *   Schema fields: userId, role, level, technical (Array), hr (Array),
 *     generatedAt, isSaved
 * ─────────────────────────────────────────────────────────────────────────────
 */

import api from './api'
import { API_ROUTES } from '../utils/constants'

/**
 * Generate interview questions for a given role.
 * Returns 10 technical + 5 HR questions.
 *
 * @param {{ role: string, level?: string }} payload
 * @returns {Promise<{ technical: Array, hr: Array }>}
 */
export const generateQuestions = async ({ role, level = 'mid' }) => {
  // TODO (backend): return api.post(API_ROUTES.INTERVIEW.GENERATE, { role, level })

  // ── MOCK ──────────────────────────────────────────────────────────────────
  await delay(1200)
  const { interviewData } = await import('../pages/InterviewGenerator/mockInterviewData')
  const set = interviewData[role]?.A
  if (!set) throw new Error(`No mock data for role: ${role}`)
  return { success: true, role, level, ...set }
  // ─────────────────────────────────────────────────────────────────────────
}

/**
 * Save a generated question set to the user's account.
 *
 * @param {{ role: string, technical: Array, hr: Array }} questionSet
 * @returns {Promise<{ success: boolean, setId: string }>}
 */
export const saveQuestions = async (questionSet) => {
  // TODO (backend): return api.post(API_ROUTES.INTERVIEW.SAVE, questionSet)

  // ── MOCK ──────────────────────────────────────────────────────────────────
  await delay(400)
  return { success: true, setId: `mock-set-${Date.now()}`, message: 'Questions saved.' }
  // ─────────────────────────────────────────────────────────────────────────
}

/**
 * List all saved interview question sets for the current user.
 *
 * @returns {Promise<Array>}
 */
export const getSavedQuestions = async () => {
  // TODO (backend): return api.get(API_ROUTES.INTERVIEW.LIST)

  // ── MOCK ──────────────────────────────────────────────────────────────────
  await delay(500)
  return { success: true, sets: [] }
  // ─────────────────────────────────────────────────────────────────────────
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms))
