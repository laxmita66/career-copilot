// ── Priority levels ────────────────────────────────────────────────────────────
// priority: 'high' | 'medium' | 'low'
// currentLevel / requiredLevel: 0–100
// importance: 0–100  (how critical this skill is for the target role)

export const targetRole = 'Senior Full Stack Developer'

export const skills = [
  // ─── HIGH PRIORITY ──────────────────────────────────────────────────────────
  {
    id: 1,
    name: 'React',
    category: 'Frontend',
    priority: 'high',
    currentLevel: 82,
    requiredLevel: 95,
    importance: 97,
    status: 'In Progress',
    resources: [
      { name: 'React Official Docs',       url: 'https://react.dev',                        type: 'Documentation', time: '10 hrs' },
      { name: 'React — The Complete Guide', url: 'https://udemy.com/course/react-the-complete-guide', type: 'Course', time: '40 hrs' },
      { name: 'Epic React by Kent C. Dodds', url: 'https://epicreact.dev',                  type: 'Course', time: '20 hrs' },
    ],
  },
  {
    id: 2,
    name: 'Node.js',
    category: 'Backend',
    priority: 'high',
    currentLevel: 65,
    requiredLevel: 90,
    importance: 92,
    status: 'Needs Work',
    resources: [
      { name: 'Node.js Official Docs',    url: 'https://nodejs.org/en/docs',               type: 'Documentation', time: '8 hrs'  },
      { name: 'The Complete Node.js Course', url: 'https://udemy.com/course/the-complete-nodejs-developer-course', type: 'Course', time: '35 hrs' },
      { name: 'Bulletproof Node.js Architecture', url: 'https://github.com/santiq/bulletproof-nodejs', type: 'Article', time: '3 hrs' },
    ],
  },
  {
    id: 3,
    name: 'System Design',
    category: 'Architecture',
    priority: 'high',
    currentLevel: 45,
    requiredLevel: 80,
    importance: 90,
    status: 'Critical Gap',
    resources: [
      { name: 'System Design Primer',     url: 'https://github.com/donnemartin/system-design-primer', type: 'Article', time: '20 hrs' },
      { name: 'Designing Data-Intensive Applications', url: 'https://dataintensive.net',  type: 'Book',   time: '30 hrs' },
      { name: 'ByteByteGo — System Design', url: 'https://bytebytego.com',               type: 'Course', time: '15 hrs' },
    ],
  },
  {
    id: 4,
    name: 'Docker',
    category: 'DevOps',
    priority: 'high',
    currentLevel: 30,
    requiredLevel: 75,
    importance: 88,
    status: 'Critical Gap',
    resources: [
      { name: 'Docker Official Docs',     url: 'https://docs.docker.com',                 type: 'Documentation', time: '6 hrs'  },
      { name: 'Docker & Kubernetes: The Complete Guide', url: 'https://udemy.com/course/docker-and-kubernetes-the-complete-guide', type: 'Course', time: '22 hrs' },
      { name: 'Play with Docker',         url: 'https://labs.play-with-docker.com',       type: 'Tool',   time: '5 hrs'  },
    ],
  },

  // ─── MEDIUM PRIORITY ────────────────────────────────────────────────────────
  {
    id: 5,
    name: 'MongoDB',
    category: 'Database',
    priority: 'medium',
    currentLevel: 58,
    requiredLevel: 80,
    importance: 75,
    status: 'In Progress',
    resources: [
      { name: 'MongoDB University',       url: 'https://university.mongodb.com',           type: 'Course', time: '12 hrs' },
      { name: 'MongoDB Official Docs',    url: 'https://www.mongodb.com/docs',             type: 'Documentation', time: '5 hrs'  },
      { name: 'Mongoose ODM Guide',       url: 'https://mongoosejs.com/docs/guide.html',   type: 'Documentation', time: '4 hrs'  },
    ],
  },
  {
    id: 6,
    name: 'AWS',
    category: 'Cloud',
    priority: 'medium',
    currentLevel: 20,
    requiredLevel: 70,
    importance: 80,
    status: 'Critical Gap',
    resources: [
      { name: 'AWS Cloud Practitioner Essentials', url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials', type: 'Course', time: '6 hrs'  },
      { name: 'AWS Documentation',        url: 'https://docs.aws.amazon.com',              type: 'Documentation', time: '10 hrs' },
      { name: 'A Cloud Guru — AWS Path',  url: 'https://acloudguru.com',                   type: 'Course', time: '30 hrs' },
    ],
  },
  {
    id: 7,
    name: 'DSA',
    category: 'Core CS',
    priority: 'medium',
    currentLevel: 62,
    requiredLevel: 85,
    importance: 85,
    status: 'In Progress',
    resources: [
      { name: 'LeetCode',                 url: 'https://leetcode.com',                     type: 'Practice', time: '50 hrs' },
      { name: 'NeetCode 150',             url: 'https://neetcode.io',                      type: 'Course',   time: '25 hrs' },
      { name: 'Grokking Algorithms',      url: 'https://www.manning.com/books/grokking-algorithms', type: 'Book', time: '10 hrs' },
    ],
  },

  // ─── LOW PRIORITY ───────────────────────────────────────────────────────────
  {
    id: 8,
    name: 'TypeScript',
    category: 'Frontend',
    priority: 'low',
    currentLevel: 55,
    requiredLevel: 70,
    importance: 65,
    status: 'In Progress',
    resources: [
      { name: 'TypeScript Official Docs', url: 'https://www.typescriptlang.org/docs',      type: 'Documentation', time: '8 hrs'  },
      { name: 'Total TypeScript',         url: 'https://www.totaltypescript.com',           type: 'Course',  time: '10 hrs' },
      { name: 'TypeScript Deep Dive',     url: 'https://basarat.gitbook.io/typescript',     type: 'Article', time: '6 hrs'  },
    ],
  },
  {
    id: 9,
    name: 'GraphQL',
    category: 'API',
    priority: 'low',
    currentLevel: 25,
    requiredLevel: 55,
    importance: 55,
    status: 'Needs Work',
    resources: [
      { name: 'GraphQL Official Docs',    url: 'https://graphql.org/learn',                type: 'Documentation', time: '5 hrs'  },
      { name: 'The Road to GraphQL',      url: 'https://www.roadtographql.com',            type: 'Book',    time: '8 hrs'  },
      { name: 'Apollo GraphQL Tutorial',  url: 'https://www.apollographql.com/tutorials',  type: 'Course',  time: '6 hrs'  },
    ],
  },
  {
    id: 10,
    name: 'CI/CD',
    category: 'DevOps',
    priority: 'low',
    currentLevel: 35,
    requiredLevel: 60,
    importance: 60,
    status: 'Needs Work',
    resources: [
      { name: 'GitHub Actions Docs',      url: 'https://docs.github.com/en/actions',       type: 'Documentation', time: '4 hrs'  },
      { name: 'CI/CD with GitHub Actions', url: 'https://udemy.com/course/github-actions', type: 'Course',  time: '10 hrs' },
      { name: 'DevOps Roadmap',           url: 'https://roadmap.sh/devops',                type: 'Article', time: '2 hrs'  },
    ],
  },
]

// ── Roadmap ────────────────────────────────────────────────────────────────────
export const roadmap = [
  {
    month: 'Month 1',
    theme: 'Strengthen Core',
    color: 'indigo',
    progress: 65,
    milestone: 'Complete React advanced patterns + Node.js REST APIs',
    skills: ['React', 'Node.js'],
    tasks: [
      'Finish Epic React advanced patterns module',
      'Build a REST API with Node.js + Express',
      'Add JWT authentication to your project',
      'Deploy to a free hosting service (Railway / Render)',
    ],
  },
  {
    month: 'Month 2',
    theme: 'DevOps & Cloud',
    color: 'purple',
    progress: 30,
    milestone: 'Deploy a containerised app to AWS',
    skills: ['Docker', 'AWS'],
    tasks: [
      'Complete Docker fundamentals course',
      'Containerise your Month 1 project',
      'Get AWS Cloud Practitioner certification',
      'Deploy app to AWS EC2 with Docker',
    ],
  },
  {
    month: 'Month 3',
    theme: 'System Design & DSA',
    color: 'emerald',
    progress: 10,
    milestone: 'Crack system design interviews, solve 100 LeetCode problems',
    skills: ['System Design', 'DSA'],
    tasks: [
      'Study System Design Primer (full read)',
      'Solve 30 LeetCode Medium problems',
      'Design 5 real-world systems (URL shortener, chat, etc.)',
      'Do 2 mock system design interviews',
    ],
  },
]

// ── Overall progress stats ─────────────────────────────────────────────────────
export const overallStats = {
  readinessScore:      68,
  skillsCompleted:     2,
  skillsInProgress:    4,
  skillsNotStarted:    4,
  totalSkills:         10,
  recommendedNext:     'Docker',
  estimatedCompletion: '3 months',
}
