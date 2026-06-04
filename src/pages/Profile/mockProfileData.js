// ── User info ─────────────────────────────────────────────────────────────────
export const userProfile = {
  firstName:      'Arjun',
  lastName:       'Sharma',
  email:          'arjun.sharma@example.com',
  phone:          '+91 98765 43210',
  college:        'Indian Institute of Technology, Delhi',
  degree:         'B.Tech in Computer Science',
  graduationYear: '2024',
  targetRole:     'Senior Full Stack Developer',
  location:       'Bangalore, India',
  linkedin:       'linkedin.com/in/arjunsharma',
  github:         'github.com/arjunsharma',
  bio:            'Final year CS undergrad passionate about building scalable web applications. Currently focused on React, Node.js, and cloud infrastructure. Actively preparing for product-based company placements.',
  avatarInitials: 'AS',
  avatarGradient: 'from-indigo-500 to-purple-600',
  joinDate:       'January 2024',
}

// ── Placement statistics ───────────────────────────────────────────────────────
export const placementStats = [
  { label: 'ATS Score',              value: '87%',  sub: 'Latest scan',        trend: '+12%', up: true  },
  { label: 'Resume Analyses',        value: '24',   sub: 'Total scans',        trend: '+4',   up: true  },
  { label: 'Interview Questions',    value: '138',  sub: 'Generated',          trend: '+22',  up: true  },
  { label: 'Skill Completion',       value: '68%',  sub: 'Overall readiness',  trend: '+8%',  up: true  },
]

// ── ATS Score history (for mini sparkline) ────────────────────────────────────
export const atsHistory = [52, 58, 63, 69, 75, 81, 87]

// ── Resume history ────────────────────────────────────────────────────────────
export const resumeHistory = [
  {
    id: 1,
    name: 'Software_Engineer_Resume_v3.pdf',
    uploadDate: 'Apr 3, 2024',
    atsScore: 87,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Software_Engineer_Resume_v2.pdf',
    uploadDate: 'Mar 20, 2024',
    atsScore: 81,
    status: 'Archived',
  },
  {
    id: 3,
    name: 'Software_Engineer_Resume_v1.pdf',
    uploadDate: 'Mar 6, 2024',
    atsScore: 75,
    status: 'Archived',
  },
  {
    id: 4,
    name: 'Fresher_Resume_2024.pdf',
    uploadDate: 'Jan 15, 2024',
    atsScore: 58,
    status: 'Archived',
  },
]

// ── Analysis history ──────────────────────────────────────────────────────────
export const analysisHistory = [
  {
    id: 1,
    type: 'JD Analysis',
    date: 'Apr 3, 2024',
    result: '78% match — Senior Frontend Engineer @ Stripe',
    icon: 'jd',
  },
  {
    id: 2,
    type: 'ATS Scan',
    date: 'Apr 3, 2024',
    result: 'Score: 87% — Excellent',
    icon: 'ats',
  },
  {
    id: 3,
    type: 'Skill Gap Analysis',
    date: 'Mar 28, 2024',
    result: '3 critical gaps — Docker, AWS, System Design',
    icon: 'skill',
  },
  {
    id: 4,
    type: 'Interview Prep',
    date: 'Mar 25, 2024',
    result: '22 questions generated — Full Stack Developer',
    icon: 'interview',
  },
  {
    id: 5,
    type: 'JD Analysis',
    date: 'Mar 20, 2024',
    result: '71% match — Backend Engineer @ Razorpay',
    icon: 'jd',
  },
  {
    id: 6,
    type: 'ATS Scan',
    date: 'Mar 20, 2024',
    result: 'Score: 81% — Good',
    icon: 'ats',
  },
]

// ── Account settings (initial toggle states) ──────────────────────────────────
export const defaultSettings = {
  emailNotifications: true,
  pushNotifications:  false,
  weeklyReport:       true,
  darkMode:           true,
}

// ── Security info ─────────────────────────────────────────────────────────────
export const securityInfo = {
  lastLogin:     'Today at 10:32 AM',
  accountStatus: 'Active',
  twoFactor:     false,
  sessions:      2,
}
