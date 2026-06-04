// ── Stat cards ────────────────────────────────────────────────────────────────
export const statsData = [
  {
    id: 'ats',
    label: 'ATS Score',
    value: '87%',
    change: '+12%',
    trend: 'up',
    sub: 'vs last scan',
  },
  {
    id: 'match',
    label: 'Resume Match Score',
    value: '74%',
    change: '+8%',
    trend: 'up',
    sub: 'vs target role',
  },
  {
    id: 'analyses',
    label: 'Total Analyses',
    value: '24',
    change: '+4',
    trend: 'up',
    sub: 'this month',
  },
  {
    id: 'questions',
    label: 'Interview Questions',
    value: '138',
    change: '+22',
    trend: 'up',
    sub: 'generated so far',
  },
]

// ── ATS Progress Trend (Line chart – last 8 weeks) ────────────────────────────
export const atsTrendData = [
  { week: 'Wk 1', score: 52 },
  { week: 'Wk 2', score: 58 },
  { week: 'Wk 3', score: 61 },
  { week: 'Wk 4', score: 67 },
  { week: 'Wk 5', score: 70 },
  { week: 'Wk 6', score: 75 },
  { week: 'Wk 7', score: 81 },
  { week: 'Wk 8', score: 87 },
]

// ── Skill Progress (Bar chart) ────────────────────────────────────────────────
export const skillProgressData = [
  { skill: 'React', current: 85, target: 95 },
  { skill: 'Node.js', current: 72, target: 85 },
  { skill: 'TypeScript', current: 60, target: 80 },
  { skill: 'System Design', current: 55, target: 75 },
  { skill: 'DSA', current: 68, target: 90 },
  { skill: 'SQL', current: 78, target: 85 },
]

// ── Placement Readiness Distribution (Pie chart) ──────────────────────────────
export const readinessPieData = [
  { name: 'Technical Skills', value: 38, color: '#6366f1' },
  { name: 'ATS Optimization', value: 25, color: '#22c55e' },
  { name: 'Interview Prep', value: 20, color: '#f97316' },
  { name: 'Skill Gaps', value: 17, color: '#eab308' },
]

// ── Recent Activity ────────────────────────────────────────────────────────────
export const recentActivity = [
  {
    id: 1,
    type: 'resume',
    title: 'Resume uploaded',
    detail: 'Software_Engineer_Resume_v3.pdf',
    time: '2 hours ago',
    icon: 'file',
    color: 'blue',
  },
  {
    id: 2,
    type: 'ats',
    title: 'ATS score analyzed',
    detail: 'Score improved from 75% → 87%',
    time: '3 hours ago',
    icon: 'chart',
    color: 'green',
  },
  {
    id: 3,
    type: 'interview',
    title: 'Interview questions generated',
    detail: '22 new questions for Senior React Engineer',
    time: 'Yesterday',
    icon: 'question',
    color: 'orange',
  },
  {
    id: 4,
    type: 'skill',
    title: 'Skill gap analysis completed',
    detail: '3 critical gaps identified for target role',
    time: 'Yesterday',
    icon: 'lightbulb',
    color: 'yellow',
  },
  {
    id: 5,
    type: 'jd',
    title: 'Job description analyzed',
    detail: 'Senior Frontend Engineer @ Stripe — 74% match',
    time: '2 days ago',
    icon: 'search',
    color: 'violet',
  },
]

// ── Placement Readiness ────────────────────────────────────────────────────────
export const readinessSummary = {
  overall: 78,
  strengths: [
    'Strong React & frontend fundamentals',
    'Well-structured resume format',
    'ATS keyword optimisation above average',
    'Consistent work history with measurable impact',
  ],
  improvements: [
    'Improve System Design knowledge',
    'Add more TypeScript projects',
    'Boost DSA problem-solving score',
    'Tailor resume summary to each role',
  ],
}
