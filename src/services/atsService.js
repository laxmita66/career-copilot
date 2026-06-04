/**
 * atsService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * ATS (Applicant Tracking System) scoring API calls.
 *
 * BACKEND INTEGRATION NOTE:
 *   Expected Express routes (ats.routes.js):
 *     GET  /api/ats/score      → returns latest ATS score for current user
 *     GET  /api/ats/history    → returns array of historical scan scores
 *     GET  /api/ats/breakdown  → returns per-category scores
 *
 *   AI Integration:
 *     POST /api/ats/score triggers the ATS scoring pipeline:
 *       1. Retrieves the user's active Resume document (parsedText)
 *       2. Sends to AI service with a structured prompt:
 *            "Evaluate this resume against ATS criteria. Return JSON with
 *             overallScore, categoryScores, missingKeywords, checklist."
 *       3. Stores result in ATSResult model and returns to frontend
 *
 *   MongoDB model: ATSResult  (models/ATSResult.js)
 *   Schema fields: userId, resumeId, overallScore, categoryScores (Map),
 *     checklist (Array), recommendations (Array), scannedAt
 * ─────────────────────────────────────────────────────────────────────────────
 */

import api from './api'
import { API_ROUTES } from '../utils/constants'

/**
 * Get the latest ATS score for the current user's active resume.
 *
 * @returns {Promise<{ overallScore: number, rating: string, categoryScores: object }>}
 */
export const getATSScore = async () => {
  // TODO (backend): return api.get(API_ROUTES.ATS.SCORE)

  // ── MOCK ──────────────────────────────────────────────────────────────────
  await delay(500)
  const { overallScore, categoryScores } = await import('../utils/mockATSData')
  return { success: true, overallScore, categoryScores }
  // ─────────────────────────────────────────────────────────────────────────
}

/**
 * Get historical ATS scan results for charting.
 *
 * @returns {Promise<Array<{ scan: string, score: number, date: string }>>}
 */
export const getATSHistory = async () => {
  // TODO (backend): return api.get(API_ROUTES.ATS.HISTORY)

  // ── MOCK ──────────────────────────────────────────────────────────────────
  await delay(400)
  const { atsHistory } = await import('../utils/mockATSData')
  return { success: true, history: atsHistory }
  // ─────────────────────────────────────────────────────────────────────────
}

/**
 * Get per-category score breakdown.
 *
 * @returns {Promise<Array<{ id, label, score, icon }>>}
 */
export const getATSBreakdown = async () => {
  // TODO (backend): return api.get(API_ROUTES.ATS.BREAKDOWN)

  // ── MOCK ──────────────────────────────────────────────────────────────────
  await delay(400)
  const { categoryScores } = await import('../utils/mockATSData')
  return { success: true, breakdown: categoryScores }
  // ─────────────────────────────────────────────────────────────────────────
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms))
