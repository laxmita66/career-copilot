export const mockAnalysis = {
  matchPercentage: 78,
  matchStatus: 'Good Match',

  matchedSkills: [
    'React', 'JavaScript', 'Git', 'REST APIs', 'HTML', 'CSS',
  ],

  missingSkills: [
    'Docker', 'AWS', 'Kubernetes', 'CI/CD',
  ],

  recommendations: [
    {
      title: 'Learn Docker fundamentals',
      detail: 'Containerisation is expected for this role. Start with Docker Desktop and build a simple multi-service app.',
      priority: 'High',
    },
    {
      title: 'Build cloud deployment projects',
      detail: 'Deploy personal projects to AWS (EC2, S3, or Elastic Beanstalk) to demonstrate cloud familiarity.',
      priority: 'High',
    },
    {
      title: 'Add CI/CD experience',
      detail: 'Set up a GitHub Actions pipeline for one of your existing projects to automate tests and deployments.',
      priority: 'Medium',
    },
    {
      title: 'Improve backend exposure',
      detail: 'Build a REST API with Node.js or Python to strengthen full-stack credibility in your resume.',
      priority: 'Medium',
    },
  ],

  summary: {
    strengths: [
      'Strong frontend skill set — React, JS, HTML/CSS are all required and present.',
      'Version control experience with Git aligns with team collaboration needs.',
      'Demonstrated REST API integration experience matches the role requirements.',
    ],
    weaknesses: [
      'No cloud infrastructure (AWS / GCP / Azure) experience detected.',
      'Containerisation tools like Docker and Kubernetes are missing.',
      'No CI/CD pipeline setup mentioned in the profile.',
    ],
    improvements: [
      'Add a DevOps-focused personal project to your GitHub and link it in the resume.',
      'Obtain the AWS Cloud Practitioner certification — it covers multiple gaps in one go.',
      'Update your resume summary to reflect full-stack and deployment awareness.',
    ],
  },
}
