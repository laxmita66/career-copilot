/**
 * skillGapService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Skill gap analysis and learning roadmap API calls.
 *
 * BACKEND INTEGRATION NOTE:
 *   Expected Express routes (skillGap.routes.js):
 *     POST  /api/skillgap/analyze  → AI gap analysis against target role
 *     GET   /api/skillgap/roadmap  → fetch personalised 3-month roadmap
 *     PATCH /api/skillgap/update   → update skill progress (mark as learned)
 *
 *   AI Integration:
 *     POST /api/skillgap/analyze pipeline:
 *       1. Retrieve user's parsed resume skills from Resume model
 *       2. Fetch job requirements for targetRole from a skills database
 *          (or parse a provided JD text)
 *       3. Call AI:
 *            "Compare these two skill sets and return:
 *             { matched: [], missing: [], priorities: { high:[], medium:[], low:[] },
 *               roadmap: [{ month, skills, tasks, milestone }] }"
 *       4. Store result in SkillGapResult model and return to frontend
 *
 *   MongoDB model: SkillGapResult  (models/SkillGapResult.js)
 *   Schema fields: userId, targetRole, matchedSkills, missingSkills,
 *     priorityGroups (Map), roadmap (Array), overallScore, analyzedAt
 * ─────────────────────────────────────────────────────────────────────────────
 */

import api from './api'
import { API_ROUTES } from '../utils/constants'

/**
 * Run skill gap analysis against a target role.
 *
 * @param {{ targetRole: string, jdText?: string }} payload
 * @returns {Promise<{ skills: Array, overallStats: object, roadmap: Array }>}
 */
export const getSkillGapAnalysis = async ({ targetRole, jdText = '' }) => {
  // TODO (backend): return api.post(API_ROUTES.SKILL_GAP.ANALYZE, { targetRole, jdText })

  // ── MOCK ──────────────────────────────────────────────────────────────────
  await delay(1500)
  const { skills, overallStats, roadmap } = await import('../pages/SkillGap/mockSkillGapData')
  return { success: true, targetRole, skills, overallStats, roadmap }
  // ─────────────────────────────────────────────────────────────────────────
}

/**
 * Get the user's personalised 3-month learning roadmap.
 *
 * @returns {Promise<Array>}
 */
export const getLearningRoadmap = async () => {
  // TODO (backend): return api.get(API_ROUTES.SKILL_GAP.ROADMAP)

  // ── MOCK ──────────────────────────────────────────────────────────────────
  await delay(400)
  const { roadmap } = await import('../pages/SkillGap/mockSkillGapData')
  return { success: true, roadmap }
  // ─────────────────────────────────────────────────────────────────────────
}

/**
 * Update progress for a specific skill.
 *
 * @param {{ skillId: number|string, currentLevel: number }} payload
 * @returns {Promise<{ success: boolean }>}
 */
export const updateSkillProgress = async ({ skillId, currentLevel }) => {
  // TODO (backend): return api.patch(API_ROUTES.SKILL_GAP.UPDATE, { skillId, currentLevel })

  // ── MOCK ──────────────────────────────────────────────────────────────────
  await delay(300)
  return { success: true, message: `Skill ${skillId} updated to ${currentLevel}%` }
  // ─────────────────────────────────────────────────────────────────────────
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms))
