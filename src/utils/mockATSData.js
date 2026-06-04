// ── Overall Score ──────────────────────────────────────────────────────────────
export const overallScore = 87

// ── Rating helper ──────────────────────────────────────────────────────────────
export const getRating = (score) => {
  if (score >= 85) return { label: 'Excellent', color: '#22c55e',  bg: 'bg-green-500/15',   text: 'text-green-400'   }
  if (score >= 70) return { label: 'Good',      color: '#6366f1',  bg: 'bg-indigo-500/15',  text: 'text-indigo-400'  }
  if (score >= 50) return { label: 'Average',   color: '#f97316',  bg: 'bg-orange-500/15',  text: 'text-orange-400'  }
  return           { label: 'Poor',      color: '#ef4444',  bg: 'bg-red-500/15',     text: 'text-red-400'     }
}

// ── Category scores ────────────────────────────────────────────────────────────
export const categoryScores = [
  { id: 'skills',    label: 'Skills Score',       score: 92, icon: 'skill'    },
  { id: 'projects',  label: 'Projects Score',      score: 78, icon: 'project'  },
  { id: 'education', label: 'Education Score',     score: 95, icon: 'edu'      },
  { id: 'experience',label: 'Experience Score',    score: 85, icon: 'exp'      },
  { id: 'keywords',  label: 'Keyword Match Score', score: 74, icon: 'keyword'  },
]

// ── Checklist ──────────────────────────────────────────────────────────────────
export const atsChecklist = [
  { id: 1,  label: 'Contact Information',  passed: true  },
  { id: 2,  label: 'Skills Section',       passed: true  },
  { id: 3,  label: 'Education',            passed: true  },
  { id: 4,  label: 'Projects',             passed: true  },
  { id: 5,  label: 'Work Experience',      passed: true  },
  { id: 6,  label: 'Professional Summary', passed: true  },
  { id: 7,  label: 'Certifications',       passed: false },
  { id: 8,  label: 'Missing Keywords',     passed: false },
  { id: 9,  label: 'LinkedIn Profile URL', passed: false },
  { id: 10, label: 'Quantified Achievements', passed: false },
]

// ── Recommendations ────────────────────────────────────────────────────────────
export const recommendations = [
  {
    id: 1,
    title: 'Add quantified achievements',
    detail: 'Replace vague duties with measurable results — e.g. "Increased API performance by 40%". Numbers dramatically improve ATS ranking.',
    priority: 'High',
    impact: '+8 pts',
  },
  {
    id: 2,
    title: 'Improve keyword matching',
    detail: 'Mirror the exact language from job descriptions (e.g. "CI/CD pipelines" instead of "automated deployments") to boost keyword density.',
    priority: 'High',
    impact: '+6 pts',
  },
  {
    id: 3,
    title: 'Add relevant technical projects',
    detail: 'Include 2–3 GitHub-linked projects that demonstrate the skills listed in your target JDs. Projects validate claimed skills for ATS.',
    priority: 'Medium',
    impact: '+5 pts',
  },
  {
    id: 4,
    title: 'Improve technical skills section',
    detail: 'Organise skills into clear categories (Frontend, Backend, DevOps, Tools) rather than a flat comma-separated list.',
    priority: 'Medium',
    impact: '+4 pts',
  },
]

// ── ATS Category Comparison (Bar chart) ───────────────────────────────────────
export const categoryChartData = [
  { category: 'Skills',     score: 92, benchmark: 75 },
  { category: 'Projects',   score: 78, benchmark: 70 },
  { category: 'Education',  score: 95, benchmark: 80 },
  { category: 'Experience', score: 85, benchmark: 78 },
  { category: 'Keywords',   score: 74, benchmark: 72 },
]

// ── ATS Improvement History (Line chart – last 7 scans) ───────────────────────
export const atsHistory = [
  { scan: 'Scan 1', score: 52, date: 'Jan 10' },
  { scan: 'Scan 2', score: 58, date: 'Jan 24' },
  { scan: 'Scan 3', score: 63, date: 'Feb 07' },
  { scan: 'Scan 4', score: 69, date: 'Feb 21' },
  { scan: 'Scan 5', score: 75, date: 'Mar 06' },
  { scan: 'Scan 6', score: 81, date: 'Mar 20' },
  { scan: 'Scan 7', score: 87, date: 'Apr 03' },
]
