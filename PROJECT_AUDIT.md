# Career Copilot — Project Audit

_Last updated: June 2026_

---

## ✅ Working Features (fully functional, no backend needed)

| Feature | Notes |
|---|---|
| Signup form | Validation, mock auth, toast, redirect to `/dashboard` |
| Login form | Validation, mock auth, toast, redirect to `/dashboard` |
| ProtectedRoute | Guards all dashboard routes; redirects to `/login` if no token |
| AuthContext | Token + user persisted to localStorage; instant hydration on refresh |
| Dashboard greeting | Shows logged-in user's first name from AuthContext |
| Navbar avatar | Shows real user initials derived from auth user object |
| Profile — Edit Profile modal | Opens, edits all fields, saves to AuthContext + localStorage |
| Profile — Resume delete | Hover-reveal delete button removes resume from local state immediately |
| Profile — Logout | Calls `AuthContext.logout()`, clears localStorage, navigates to `/` |
| Profile — Dark mode toggle | Persists to `cc_settings` in localStorage, toggles `document.documentElement.classList` |
| Profile — Avatar upload | File picker preview with hover overlay |
| ATS Score — Re-scan (header) | Triggers mock rescan with slight score variation + toast |
| ATS Score — Re-scan Now (CTA) | Same rescan handler |
| ATS Score — Upload Resume (CTA) | `navigate('/resume-upload')` |
| Resume Upload | Drag-and-drop, file validation (PDF, 5 MB), animated progress, success/error states |
| JD Analyzer | Paste JD → mock analysis → match score, skill badges, recommendations, summary |
| Interview Generator | Role dropdown → generate 10 technical + 5 HR questions; regenerate, copy, save |
| Skill Gap Analysis | Priority filtering, expandable cards, learning resources, 3-month roadmap |
| Placement Tracker | Kanban board, add/delete applications, company prep hub, readiness predictor, weekly goals |
| Placement Journey | Timeline, filter by status, analytics, expand/collapse per company |

---

## 🔧 Fixed Issues (this session)

| Issue | Fix Applied |
|---|---|
| ATS Re-scan button had `onClick` as JSX text content (broken JSX) | Rewrote as proper `onClick` prop; button now triggers mock rescan |
| ATS "Upload Resume" and "Re-scan Now" CTA buttons had no `onClick` | Wired: Upload → `navigate('/resume-upload')`, Re-scan → `handleRescan()` |
| Profile Logout showed toast only, did not call `logout()` or navigate | Now calls `AuthContext.logout()` then `navigate('/', { replace: true })` |
| Profile used hardcoded mock user, never read from AuthContext | Now seeds from `useAuth().user`; saved profile updates via `updateUser()` |
| Profile resume delete button had no `onClick` handler | Now calls `handleDeleteResume(id)` — removes from local state array |
| Dark mode toggle note said "UI only" — had no effect | Now persisted to `localStorage` via `useEffect`; toggles `dark` class on `<html>` |
| `AuthContext.updateUser` updated React state but not localStorage | Now calls `saveUser(merged)` to keep localStorage in sync on profile save |
| Dashboard showed generic "Placement Dashboard" title | Now greets: `Welcome back, {firstName} 👋` using `useAuth().user` |
| Navbar showed static "Profile" text | Now shows real user initials (avatar circle) and first name from auth |

---

## 🟡 Remaining Mock Features (frontend-only, realistic UX)

| Feature | What's mocked |
|---|---|
| ATS Score values | Static data from `utils/mockATSData.js`; re-scan varies score by ±2 randomly |
| Dashboard stats | Hardcoded in `pages/Dashboard/mockData.js` |
| Profile placement stats | Hardcoded in `pages/Profile/mockProfileData.js` |
| Resume history on Profile | Seeded from `mockProfileData.js`; deletes work in-memory only (reset on refresh) |
| Analysis history | Hardcoded; not updated when user runs new analyses |
| Interview questions | Served from `mockInterviewData.js`; not AI-generated |
| Skill gap data | Served from `mockSkillGapData.js` |
| Placement Tracker applications | Seeded from `mockPlacementData.js`; additions persist in component state only |
| Weekly goals progress | In-component state; resets on refresh |

---

## 🔌 Features Requiring Backend Integration

| Feature | Required backend endpoints |
|---|---|
| Real login / signup | `POST /api/auth/login`, `POST /api/auth/signup` |
| Session validation on refresh | `GET /api/auth/me` (validate JWT) |
| Resume upload + storage | `POST /api/resume/upload` (multer + S3/disk) |
| Resume parsing | `POST /api/resume/analyze` (pdf-parse or Apache Tika) |
| Resume delete | `DELETE /api/resume/:id` |
| Profile update | `PATCH /api/profile/update` |
| ATS score calculation | `POST /api/ats/score` (rule-based scoring engine) |
| ATS history | `GET /api/ats/history` |
| JD analysis | `POST /api/jd/analyze` (keyword extraction + matching) |
| Saved interview sets | `POST /api/interview/save`, `GET /api/interview/list` |
| Skill gap persistence | `POST /api/skillgap/analyze`, `PATCH /api/skillgap/update` |
| Application tracker persistence | `POST/GET/PATCH/DELETE /api/applications` |
| Placement journey persistence | `POST/GET /api/journey` |

---

## 🤖 Features Requiring AI Integration

| Feature | AI service needed |
|---|---|
| Resume text extraction & structuring | OpenAI / Gemini with resume-parsing prompt |
| ATS keyword match scoring | NLP keyword extraction against JD |
| JD analysis + match percentage | Semantic similarity between resume and JD |
| Interview question generation | LLM with role/level prompt → structured JSON output |
| Skill gap detection | Compare extracted skills against role requirements database |
| Resume improvement suggestions | LLM analysis of parsed resume text |
| Placement readiness prediction | ML model trained on historical placement outcomes |

---

## 📁 Files Modified This Session

- `src/context/AuthContext.jsx` — `updateUser` now persists to localStorage
- `src/pages/Dashboard/index.jsx` — personalised greeting from auth user
- `src/components/layout/Navbar.jsx` — real user initials and name from auth
- `src/pages/Profile/index.jsx` — full rewrite: auth user integration, working logout, delete, dark mode
- `src/pages/ATSScore/index.jsx` — fixed broken Re-scan button JSX; wired all CTA buttons
