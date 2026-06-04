import { Routes, Route, Navigate } from 'react-router-dom'

// Guards / Layouts
import ProtectedRoute  from './ProtectedRoute'
import DashboardLayout from '../layouts/DashboardLayout'

// Public pages
import Landing  from '../pages/Landing'
import Login    from '../pages/Auth/Login'
import Signup   from '../pages/Auth/Signup'

// Core tool pages
import Dashboard          from '../pages/Dashboard'
import ResumeUpload       from '../pages/ResumeUpload'
import JDAnalyzer         from '../pages/JDAnalyzer'
import ATSScore           from '../pages/ATSScore'
import InterviewGenerator from '../pages/InterviewGenerator'
import SkillGap           from '../pages/SkillGap'
import Profile            from '../pages/Profile'

// Placement module pages
import PlacementTracker  from '../pages/PlacementTracker'
import PlacementJourney  from '../pages/PlacementJourney'

const AppRoutes = () => {
  return (
    <Routes>
      {/* ── Public ─────────────────────────────────── */}
      <Route path="/"       element={<Landing />} />
      <Route path="/login"  element={<Login   />} />
      <Route path="/signup" element={<Signup  />} />

      {/* ── Protected ──────────────────────────────── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Core tools */}
          <Route path="/dashboard"           element={<Dashboard          />} />
          <Route path="/resume-upload"       element={<ResumeUpload       />} />
          <Route path="/jd-analyzer"         element={<JDAnalyzer         />} />
          <Route path="/ats-score"           element={<ATSScore           />} />
          <Route path="/interview-generator" element={<InterviewGenerator />} />
          <Route path="/skill-gap"           element={<SkillGap           />} />
          <Route path="/profile"             element={<Profile            />} />

          {/* Placement module */}
          <Route path="/placement-tracker"   element={<PlacementTracker   />} />
          <Route path="/placement-journey"   element={<PlacementJourney   />} />
        </Route>
      </Route>

      {/* ── Catch-all ──────────────────────────────── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
