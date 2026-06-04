// ── Application Tracker ───────────────────────────────────────────────────────
export const STATUSES = ['Applied', 'Online Assessment', 'Interview Scheduled', 'Rejected', 'Selected']

export const STATUS_CONFIG = {
  'Applied':              { color: '#6366f1', bg: 'bg-indigo-500/15', text: 'text-indigo-400',  border: 'border-indigo-500/25' },
  'Online Assessment':    { color: '#f97316', bg: 'bg-orange-500/15', text: 'text-orange-400',  border: 'border-orange-500/25' },
  'Interview Scheduled':  { color: '#eab308', bg: 'bg-yellow-500/15', text: 'text-yellow-400',  border: 'border-yellow-500/25' },
  'Rejected':             { color: '#ef4444', bg: 'bg-red-500/15',    text: 'text-red-400',     border: 'border-red-500/25'    },
  'Selected':             { color: '#22c55e', bg: 'bg-green-500/15',  text: 'text-green-400',   border: 'border-green-500/25'  },
}

export const applications = [
  { id: 1,  company: 'Google',      role: 'SWE Intern',            date: 'Apr 01, 2024', status: 'Interview Scheduled', ctc: '₹45 LPA',  notes: 'Round 1 scheduled for Apr 10' },
  { id: 2,  company: 'Microsoft',   role: 'Software Engineer',     date: 'Mar 28, 2024', status: 'Online Assessment',   ctc: '₹40 LPA',  notes: 'OA link received, deadline Apr 5' },
  { id: 3,  company: 'Stripe',      role: 'Frontend Engineer',     date: 'Mar 25, 2024', status: 'Applied',             ctc: '₹55 LPA',  notes: 'Applied via referral' },
  { id: 4,  company: 'Atlassian',   role: 'Full Stack Developer',  date: 'Mar 22, 2024', status: 'Rejected',            ctc: '₹35 LPA',  notes: 'Rejected after OA' },
  { id: 5,  company: 'Adobe',       role: 'React Developer',       date: 'Mar 20, 2024', status: 'Selected',            ctc: '₹28 LPA',  notes: 'Offer letter received!' },
  { id: 6,  company: 'Razorpay',    role: 'Backend Engineer',      date: 'Mar 18, 2024', status: 'Interview Scheduled', ctc: '₹32 LPA',  notes: 'Technical round on Apr 8' },
  { id: 7,  company: 'Flipkart',    role: 'SDE-1',                 date: 'Mar 15, 2024', status: 'Online Assessment',   ctc: '₹30 LPA',  notes: 'OA via HackerRank' },
  { id: 8,  company: 'Paytm',       role: 'Software Developer',    date: 'Mar 10, 2024', status: 'Applied',             ctc: '₹22 LPA',  notes: '' },
  { id: 9,  company: 'Cred',        role: 'SDE',                   date: 'Mar 08, 2024', status: 'Rejected',            ctc: '₹38 LPA',  notes: 'Rejected in DSA round' },
  { id: 10, company: 'Groww',       role: 'Frontend SDE-1',        date: 'Mar 05, 2024', status: 'Applied',             ctc: '₹25 LPA',  notes: '' },
]

// ── Company Prep Hub ──────────────────────────────────────────────────────────
export const companies = [
  {
    id: 'tcs',
    name: 'TCS',
    fullName: 'Tata Consultancy Services',
    logo: 'TCS',
    gradient: 'from-blue-500/20 to-blue-600/5',
    border: 'border-blue-500/20',
    difficulty: 2,
    ctc: '₹3.5 – 7 LPA',
    roles: ['Systems Engineer', 'Developer', 'Analyst'],
    hiringProcess: [
      'Online Application via TCS iON Portal',
      'TCS NQT (Cognitive + Technical + Programming)',
      'Technical Interview (HR + basics)',
      'HR Interview',
      'Document Verification & Offer',
    ],
    technicalTopics: ['Java/C++/Python basics', 'DBMS & SQL', 'OOP concepts', 'OS basics', 'Networking fundamentals', 'Data Structures'],
    aptitudeAreas: ['Quantitative Aptitude', 'Verbal Ability', 'Logical Reasoning', 'Coding (TCS CodeVita)'],
    commonQuestions: [
      'Explain OOP principles with examples.',
      'Write a program to reverse a string without using library functions.',
      'What is normalization? Explain 1NF, 2NF, 3NF.',
      'Explain the difference between process and thread.',
      'What are ACID properties in databases?',
      'What is a deadlock? How can it be prevented?',
    ],
    checklist: [
      { task: 'Complete TCS NQT mock tests', done: true  },
      { task: 'Revise OOP concepts in Java',  done: true  },
      { task: 'Practice 30 SQL queries',      done: true  },
      { task: 'Study OS scheduling algorithms', done: false },
      { task: 'Practice coding on TCS CodeVita problems', done: false },
      { task: 'Prepare "Tell me about yourself"', done: true },
    ],
  },
  {
    id: 'infosys',
    name: 'Infosys',
    fullName: 'Infosys Limited',
    logo: 'INF',
    gradient: 'from-indigo-500/20 to-indigo-600/5',
    border: 'border-indigo-500/20',
    difficulty: 2,
    ctc: '₹3.6 – 8 LPA',
    roles: ['Systems Engineer', 'Technology Analyst', 'Specialist Programmer'],
    hiringProcess: [
      'Apply via Infosys InfyTQ or campus portal',
      'InfyTQ certification (recommended)',
      'Hackerrank Online Assessment',
      'Technical Interview (DSA + Project discussion)',
      'HR Interview',
    ],
    technicalTopics: ['Data Structures', 'Algorithms', 'DBMS', 'Core Java', 'Agile basics', 'REST APIs'],
    aptitudeAreas: ['Mathematical Ability', 'Reasoning Ability', 'Verbal Ability', 'Pseudocode Analysis'],
    commonQuestions: [
      'What is polymorphism? Give a real-world example.',
      'Explain the difference between ArrayList and LinkedList.',
      'Write a program to find all prime numbers up to N.',
      'What is a foreign key constraint in SQL?',
      'Explain the MVC architecture.',
      'What is the difference between GET and POST?',
    ],
    checklist: [
      { task: 'Complete InfyTQ courses',              done: true  },
      { task: 'Solve 50 LeetCode easy-medium problems', done: false },
      { task: 'Revise Java collections framework',    done: true  },
      { task: 'Study system design basics',           done: false },
      { task: 'Practice Hackerrank problem sets',     done: true  },
      { task: 'Prepare 3 project descriptions',       done: true  },
    ],
  },
  {
    id: 'accenture',
    name: 'Accenture',
    fullName: 'Accenture PLC',
    logo: 'ACC',
    gradient: 'from-purple-500/20 to-purple-600/5',
    border: 'border-purple-500/20',
    difficulty: 2,
    ctc: '₹4.5 – 9.5 LPA',
    roles: ['ASE', 'Packaged App Dev Associate', 'Network Engineer Associate'],
    hiringProcess: [
      'Apply via Accenture career portal',
      'Cognitive & Technical Assessment (AMCAT based)',
      'Coding Round (2 problems)',
      'Technical Interview (project + DSA)',
      'HR Interview',
    ],
    technicalTopics: ['DSA basics', 'Web Technologies', 'Python/Java', 'Cloud basics (AWS/Azure)', 'Agile/Scrum', 'SDLC'],
    aptitudeAreas: ['Cognitive Ability', 'Abstract Reasoning', 'Attention to Detail', 'Technical Aptitude'],
    commonQuestions: [
      'What are the four pillars of OOP?',
      'Explain the difference between TCP and UDP.',
      'What is cloud computing? Name three AWS services.',
      'Write a program to check if a string is a palindrome.',
      'What is REST? What HTTP methods does it use?',
      'Describe Agile methodology in brief.',
    ],
    checklist: [
      { task: 'Practice AMCAT mock tests',              done: false },
      { task: 'Learn AWS Cloud Practitioner basics',    done: false },
      { task: 'Revise networking protocols',            done: true  },
      { task: 'Build one full-stack project',           done: true  },
      { task: 'Practice HR situational questions',      done: true  },
      { task: 'Read about Accenture\'s recent projects', done: false },
    ],
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    fullName: 'Cognizant Technology Solutions',
    logo: 'COG',
    gradient: 'from-cyan-500/20 to-cyan-600/5',
    border: 'border-cyan-500/20',
    difficulty: 2,
    ctc: '₹4 – 7 LPA',
    roles: ['Programmer Analyst', 'Associate', 'GenC Pro'],
    hiringProcess: [
      'Apply via Cognizant careers page',
      'GenC Online Assessment (Reasoning + Coding)',
      'Technical Interview',
      'Managerial Round',
      'HR Round',
    ],
    technicalTopics: ['C/C++/Java', 'DBMS', 'Data Structures', 'OOP', 'Networking', 'Software Testing basics'],
    aptitudeAreas: ['Quantitative Aptitude', 'Logical Reasoning', 'English Comprehension', 'Automata (coding)'],
    commonQuestions: [
      'Explain the concept of inheritance with an example.',
      'What is the difference between stack and queue?',
      'What are joins in SQL? Explain inner and left join.',
      'What is a binary search tree? What is its time complexity?',
      'What is the software development lifecycle?',
      'How does garbage collection work in Java?',
    ],
    checklist: [
      { task: 'Solve 40 DSA problems',               done: true  },
      { task: 'Revise DBMS joins and queries',        done: true  },
      { task: 'Practice automata coding problems',   done: false },
      { task: 'Learn software testing basics',        done: false },
      { task: 'Prepare project explanation',          done: true  },
      { task: 'Study Cognizant GenC syllabus',       done: true  },
    ],
  },
  {
    id: 'wipro',
    name: 'Wipro',
    fullName: 'Wipro Limited',
    logo: 'WIP',
    gradient: 'from-emerald-500/20 to-emerald-600/5',
    border: 'border-emerald-500/20',
    difficulty: 2,
    ctc: '₹3.5 – 6.5 LPA',
    roles: ['Project Engineer', 'Technology Associate', 'Developer'],
    hiringProcess: [
      'Apply via Wipro NLTH / campus',
      'Online Aptitude Test (AMCAT)',
      'Essay Writing',
      'Technical Interview',
      'HR Interview',
    ],
    technicalTopics: ['Programming Basics', 'DBMS', 'OOP', 'OS concepts', 'Computer Networks', 'Basic algorithms'],
    aptitudeAreas: ['Quantitative Aptitude', 'Verbal', 'Logical', 'Essay Writing', 'Coding (Python/Java/C)'],
    commonQuestions: [
      'What is the difference between abstract class and interface?',
      'Explain the OSI model layers.',
      'What is a hash table and how does it work?',
      'Write a SQL query to find the second highest salary.',
      'What are design patterns? Name a few.',
      'What is meant by multithreading?',
    ],
    checklist: [
      { task: 'Practice essay writing topics',        done: false },
      { task: 'Revise OSI / TCP-IP model',            done: true  },
      { task: 'Solve SQL query practice sets',        done: true  },
      { task: 'Study Wipro NLTH pattern',             done: false },
      { task: 'Practice AMCAT verbal section',        done: false },
      { task: 'Prepare technical project summary',    done: true  },
    ],
  },
  {
    id: 'cisco',
    name: 'Cisco',
    fullName: 'Cisco Systems Inc.',
    logo: 'CSC',
    gradient: 'from-blue-400/20 to-sky-600/5',
    border: 'border-sky-500/20',
    difficulty: 4,
    ctc: '₹15 – 30 LPA',
    roles: ['Software Engineer', 'Network Engineer', 'Security Engineer'],
    hiringProcess: [
      'Apply via Cisco careers / campus placement',
      'Online Coding Assessment (DSA heavy)',
      'Technical Round 1 (DSA + System Design)',
      'Technical Round 2 (Networking + OS)',
      'Hiring Manager Round',
      'HR Round',
    ],
    technicalTopics: ['Advanced DSA', 'Networking (CCNA level)', 'OS & Linux', 'System Design', 'Python/C/C++', 'Security fundamentals'],
    aptitudeAreas: ['Advanced Coding', 'Networking protocols (TCP/IP, BGP, OSPF)', 'Cybersecurity basics', 'Problem solving'],
    commonQuestions: [
      'Explain BGP and how it differs from OSPF.',
      'What is a spanning tree protocol (STP)?',
      'Design a highly available microservices architecture.',
      'What is the difference between symmetric and asymmetric encryption?',
      'Explain VLAN and its purpose.',
      'How does HTTPS work? Explain the TLS handshake.',
    ],
    checklist: [
      { task: 'Study CCNA fundamentals',              done: false },
      { task: 'Solve 100 LeetCode medium problems',   done: false },
      { task: 'Learn system design patterns',         done: false },
      { task: 'Study cybersecurity fundamentals',     done: false },
      { task: 'Practice Linux commands',              done: true  },
      { task: 'Build networking project (lab setup)', done: false },
    ],
  },
]

// ── Placement Readiness Predictor ──────────────────────────────────────────────
export const defaultReadinessInputs = {
  atsScore:        75,
  dsaLevel:        60,
  communication:   70,
  projectsScore:   80,
  resumeQuality:   85,
}

export const calcReadiness = (inputs) => {
  const weights = { atsScore: 0.25, dsaLevel: 0.30, communication: 0.15, projectsScore: 0.20, resumeQuality: 0.10 }
  const score = Math.round(
    Object.keys(weights).reduce((sum, k) => sum + (inputs[k] || 0) * weights[k], 0)
  )
  const strengths = Object.entries(inputs)
    .filter(([, v]) => v >= 75)
    .map(([k]) => labelMap[k])
  const weaknesses = Object.entries(inputs)
    .filter(([, v]) => v < 60)
    .map(([k]) => labelMap[k])
  const actions = weaknesses.length
    ? weaknesses.map((w) => `Improve ${w}`)
    : ['Maintain consistency', 'Apply to more companies', 'Practice mock interviews']
  return { score, strengths, weaknesses, actions }
}

export const labelMap = {
  atsScore: 'ATS Score', dsaLevel: 'DSA Level',
  communication: 'Communication', projectsScore: 'Projects Score', resumeQuality: 'Resume Quality',
}

export const readinessBadge = (score) => {
  if (score >= 85) return { label: 'Placement Ready 🚀', cls: 'bg-green-500/15 text-green-400 border-green-500/25' }
  if (score >= 70) return { label: 'Almost There 💪',    cls: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/25' }
  if (score >= 55) return { label: 'Needs Work 📚',      cls: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25' }
  return              { label: 'Early Stage 🌱',          cls: 'bg-red-500/15 text-red-400 border-red-500/25' }
}

// ── Weekly Goals ───────────────────────────────────────────────────────────────
export const defaultGoals = {
  resumesSent:     { label: 'Resumes Sent',         target: 5,  current: 3,  unit: 'resumes'   },
  dsaSolved:       { label: 'DSA Problems Solved',   target: 20, current: 14, unit: 'problems'  },
  mockInterviews:  { label: 'Mock Interviews',       target: 3,  current: 1,  unit: 'sessions'  },
  companiesApplied:{ label: 'Companies Applied',     target: 8,  current: 5,  unit: 'companies' },
}

export const badges = [
  { id: 'streak',   label: '7-Day Streak',    icon: '🔥', unlocked: true  },
  { id: 'dsa100',   label: '100 DSA Solved',  icon: '💡', unlocked: true  },
  { id: 'firstoffer',label: 'First Offer',    icon: '🏆', unlocked: true  },
  { id: 'tenApps',  label: '10 Applications', icon: '📬', unlocked: false },
  { id: 'allgreen', label: 'All Goals Met',   icon: '✅', unlocked: false },
  { id: 'ready',    label: 'Placement Ready', icon: '🚀', unlocked: false },
]

// ── Student Insights ───────────────────────────────────────────────────────────
export const insightsStats = {
  totalApplications:    10,
  oaClearanceRate:      65,
  interviewConversion:  40,
  offersReceived:       1,
}

export const readinessTrend = [
  { week: 'Wk 1', score: 45 },
  { week: 'Wk 2', score: 52 },
  { week: 'Wk 3', score: 58 },
  { week: 'Wk 4', score: 63 },
  { week: 'Wk 5', score: 68 },
  { week: 'Wk 6', score: 72 },
  { week: 'Wk 7', score: 71 },
  { week: 'Wk 8', score: 76 },
]

export const applicationFunnelData = [
  { stage: 'Applied',      count: 10 },
  { stage: 'OA Cleared',   count: 6  },
  { stage: 'Interviewed',  count: 4  },
  { stage: 'Selected',     count: 1  },
]

// ── Placement Journey ──────────────────────────────────────────────────────────
export const journeyEntries = [
  {
    id: 1, company: 'Adobe', role: 'React Developer', date: 'Mar 20, 2024',
    type: 'offer', icon: '🏆',
    rounds: [
      { name: 'OA', result: 'Cleared', score: '85%' },
      { name: 'Technical Round 1', result: 'Cleared', score: 'Good' },
      { name: 'Technical Round 2', result: 'Cleared', score: 'Very Good' },
      { name: 'HR Round', result: 'Selected', score: '—' },
    ],
    feedback: 'Strong React knowledge and project depth impressed the panel.',
    lesson: 'Practising component design patterns gave me an edge.',
    ctc: '₹28 LPA',
    category: 'Product',
  },
  {
    id: 2, company: 'Google', role: 'SWE Intern', date: 'Apr 01, 2024',
    type: 'ongoing', icon: '⏳',
    rounds: [
      { name: 'OA', result: 'Cleared', score: '90%' },
      { name: 'Technical Round 1', result: 'Scheduled', score: '—' },
    ],
    feedback: '',
    lesson: 'Revising dynamic programming before Round 1.',
    ctc: '₹45 LPA',
    category: 'FAANG',
  },
  {
    id: 3, company: 'Cred', role: 'SDE', date: 'Mar 08, 2024',
    type: 'rejected', icon: '❌',
    rounds: [
      { name: 'OA', result: 'Cleared', score: '78%' },
      { name: 'DSA Round', result: 'Rejected', score: 'Poor' },
    ],
    feedback: 'Struggled with graph problems under time pressure.',
    lesson: 'Need to practise BFS/DFS and graph algorithms more.',
    ctc: '₹38 LPA',
    category: 'Fintech',
  },
  {
    id: 4, company: 'Atlassian', role: 'Full Stack Developer', date: 'Mar 22, 2024',
    type: 'rejected', icon: '❌',
    rounds: [
      { name: 'OA', result: 'Rejected', score: '52%' },
    ],
    feedback: 'OA had many system design MCQs I was not prepared for.',
    lesson: 'Start studying system design earlier in the process.',
    ctc: '₹35 LPA',
    category: 'Product',
  },
  {
    id: 5, company: 'Razorpay', role: 'Backend Engineer', date: 'Mar 18, 2024',
    type: 'ongoing', icon: '⏳',
    rounds: [
      { name: 'OA', result: 'Cleared', score: '80%' },
      { name: 'Technical Round 1', result: 'Cleared', score: 'Good' },
      { name: 'Technical Round 2', result: 'Scheduled', score: '—' },
    ],
    feedback: 'Good discussion on Node.js and REST API design.',
    lesson: 'Revising database indexing before Round 2.',
    ctc: '₹32 LPA',
    category: 'Fintech',
  },
]

export const journeyAnalytics = {
  successRate:           20,
  mostCommonRejection:   'DSA Round',
  strongestCategory:     'Product Companies',
  avgRoundsBeforeOffer:  4,
  totalCompanies:        5,
  offersReceived:        1,
}
