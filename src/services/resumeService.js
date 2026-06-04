/**
 * resumeService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Resume upload and analysis API calls.
 *
 * BACKEND INTEGRATION NOTE:
 *   Expected Express routes (resume.routes.js):
 *     POST   /api/resume/upload   → multer middleware, saves to S3/disk,
 *                                   parses PDF with pdf-parse, stores in MongoDB
 *     POST   /api/resume/analyze  → triggers AI analysis pipeline
 *     GET    /api/resume/list     → returns user's resume history
 *     DELETE /api/resume/:id      → soft-delete a resume document
 *
 *   File upload uses multipart/form-data — use postForm() from api.js.
 *   The backend uses multer + pdf-parse (or Apache Tika) for PDF extraction.
 *
 *   MongoDB model: Resume  (models/Resume.js)
 *   Schema fields: userId (ref User), filename, originalName, s3Key,
 *     fileSize, parsedText, atsScore, status (active|archived), uploadedAt
 *
 *   AI Integration:
 *     POST /api/resume/analyze calls an internal AI service that:
 *       1. Sends parsedText to OpenAI / Gemini
 *       2. Extracts skills, experience, education
 *       3. Returns structured JSON stored in Resume.analysisResult
 * ─────────────────────────────────────────────────────────────────────────────
 */

import api, { postForm } from './api'
import { API_ROUTES } from '../utils/constants'

/**
 * Upload a resume PDF file.
 * Sends as multipart/form-data with an optional progress callback.
 *
 * @param {File}     file              - The PDF File object from the input
 * @param {Function} [onProgress]      - Called with upload % (0-100)
 * @returns {Promise<{ resumeId: string, filename: string, message: string }>}
 */
export const uploadResume = async (file, onProgress) => {
  // TODO (backend): uncomment when Express /api/resume/upload is ready
  // const form = new FormData()
  // form.append('resume', file)
  // return postForm(
  //   API_ROUTES.RESUME.UPLOAD,
  //   form,
  //   (event) => {
  //     if (onProgress && event.total) {
  //       onProgress(Math.round((event.loaded / event.total) * 100))
  //     }
  //   },
  // )

  // ── MOCK ──────────────────────────────────────────────────────────────────
  for (let pct = 10; pct <= 100; pct += Math.floor(Math.random() * 18 + 5)) {
    await delay(250)
    onProgress?.(Math.min(pct, 100))
  }
  return {
    success:  true,
    resumeId: 'mock-resume-id-001',
    filename: file.name,
    message:  'Resume uploaded successfully.',
  }
  // ─────────────────────────────────────────────────────────────────────────
}

/**
 * Trigger AI analysis on a previously uploaded resume.
 *
 * @param {string} resumeId   - The MongoDB _id of the Resume document
 * @param {string} [targetJD] - Optional job description text for JD-matching
 * @returns {Promise<{ atsScore: number, skills: string[], gaps: string[], ... }>}
 */
export const analyzeResume = async (resumeId, targetJD = '') => {
  // TODO (backend): return api.post(API_ROUTES.RESUME.ANALYZE, { resumeId, targetJD })

  // ── MOCK ──────────────────────────────────────────────────────────────────
  await delay(1800)
  return {
    success:      true,
    resumeId,
    atsScore:     87,
    matchScore:   74,
    skills:       ['React', 'JavaScript', 'Node.js', 'Git', 'REST APIs'],
    gaps:         ['Docker', 'AWS', 'Kubernetes', 'CI/CD'],
    suggestions:  ['Add quantified achievements', 'Improve keyword matching'],
  }
  // ─────────────────────────────────────────────────────────────────────────
}

/**
 * Get list of all resumes uploaded by the current user.
 *
 * @returns {Promise<Array>}
 */
export const getResumeList = async () => {
  // TODO (backend): return api.get(API_ROUTES.RESUME.LIST)

  // ── MOCK ──────────────────────────────────────────────────────────────────
  await delay(400)
  const { resumeHistory } = await import('../pages/Profile/mockProfileData')
  return { success: true, resumes: resumeHistory }
  // ─────────────────────────────────────────────────────────────────────────
}

/**
 * Delete (archive) a resume by its ID.
 *
 * @param {string} resumeId
 * @returns {Promise<{ success: boolean }>}
 */
export const deleteResume = async (resumeId) => {
  // TODO (backend): return api.delete(API_ROUTES.RESUME.DELETE(resumeId))

  // ── MOCK ──────────────────────────────────────────────────────────────────
  await delay(300)
  return { success: true, message: 'Resume deleted.' }
  // ─────────────────────────────────────────────────────────────────────────
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms))
