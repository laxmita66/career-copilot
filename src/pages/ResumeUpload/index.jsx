import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  RiSparklingLine,
  RiCheckDoubleLine,
  RiFileTextLine,
  RiBarChartLine,
  RiLightbulbLine,
  RiQuestionAnswerLine,
  RiInformationLine,
  RiArrowRightLine,
  RiShieldCheckLine,
} from 'react-icons/ri'
import PageHeader from '../../components/ui/PageHeader'
import Button from '../../components/ui/Button'
import FileUpload from '../../components/common/FileUpload'

// ─── What happens after upload ─────────────────────────────────────────────────
const analysisSteps = [
  {
    icon: RiFileTextLine,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    title: 'Resume Parsing',
    desc: 'AI extracts sections, skills, experience, and education from your resume.',
  },
  {
    icon: RiBarChartLine,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    title: 'ATS Compatibility',
    desc: 'Your resume is evaluated against ATS algorithms and scored.',
  },
  {
    icon: RiLightbulbLine,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    title: 'Skill Gap Detection',
    desc: 'Missing skills for your target role are identified and highlighted.',
  },
  {
    icon: RiQuestionAnswerLine,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    title: 'Interview Prep',
    desc: 'Role-specific interview questions are generated based on your profile.',
  },
]

// ─── Tips ──────────────────────────────────────────────────────────────────────
const tips = [
  'Use a single-column layout for maximum ATS compatibility',
  'Include measurable achievements (e.g. "Increased revenue by 30%")',
  'Tailor your resume keywords to each job description',
  'Avoid tables, headers/footers, and graphics — ATS can\'t parse them',
  'Keep your resume to 1–2 pages for best results',
]

// ─── Component ─────────────────────────────────────────────────────────────────
const ResumeUpload = () => {
  const navigate = useNavigate()
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isAnalyzing,  setIsAnalyzing]  = useState(false)

  // Called by FileUpload when a file is successfully "uploaded"
  const handleFileReady = (file) => {
    setUploadedFile(file)
  }

  // Mock analyze — simulates a processing delay then navigates to ATS page
  const handleAnalyze = () => {
    if (!uploadedFile) return
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      navigate('/ats-score')
    }, 2200)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <PageHeader
        title="Resume Upload"
        description="Upload your PDF resume and let AI analyze it for ATS compatibility, skill gaps, and more."
      />

      {/* Main grid */}
      <div className="grid lg:grid-cols-5 gap-6">

        {/* ── Left: Upload + Analyze ─────────────────── */}
        <div className="lg:col-span-3 space-y-5">

          {/* Upload card */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center">
                <RiFileTextLine size={17} className="text-indigo-400" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-200">Upload Resume</h2>
                <p className="text-xs text-gray-500">PDF format only — max 5 MB</p>
              </div>
            </div>

            <FileUpload onFileReady={handleFileReady} />

            {/* Privacy note */}
            <p className="flex items-center gap-1.5 text-xs text-gray-600 mt-4">
              <RiShieldCheckLine size={13} className="text-gray-600 flex-shrink-0" />
              Your file is processed securely and never shared with third parties.
            </p>
          </div>

          {/* Analyze button card */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h2 className="text-sm font-semibold text-gray-200 mb-1">Ready to analyze?</h2>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {uploadedFile
                    ? `"${uploadedFile.name}" is ready. Click Analyze to generate your full career report.`
                    : 'Upload your resume above, then click the button to run the full AI analysis.'}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <Button
                fullWidth
                size="lg"
                disabled={!uploadedFile || isAnalyzing}
                loading={isAnalyzing}
                onClick={handleAnalyze}
                className="shadow-lg shadow-indigo-500/20"
              >
                {isAnalyzing ? (
                  'Analyzing your resume…'
                ) : (
                  <>
                    <RiSparklingLine size={18} />
                    Analyze Resume
                    {uploadedFile && <RiArrowRightLine size={16} />}
                  </>
                )}
              </Button>

              {isAnalyzing && (
                <div className="mt-4 space-y-2">
                  {['Parsing resume structure…', 'Running ATS check…', 'Detecting skill gaps…'].map((msg, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse flex-shrink-0"
                        style={{ animationDelay: `${i * 200}ms` }}
                      />
                      {msg}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Right: Info panels ─────────────────────── */}
        <div className="lg:col-span-2 space-y-5">

          {/* What happens next */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <RiCheckDoubleLine size={17} className="text-indigo-400" />
              <h3 className="text-sm font-semibold text-gray-200">What happens next?</h3>
            </div>
            <ol className="space-y-4">
              {analysisSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <li key={step.title} className="flex items-start gap-3">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-lg ${step.bg} flex items-center justify-center`}>
                        <Icon size={15} className={step.color} />
                      </div>
                      {i < analysisSteps.length - 1 && (
                        <div className="w-px flex-1 bg-gray-800 mt-1 h-4" />
                      )}
                    </div>
                    <div className="pb-1">
                      <p className="text-xs font-semibold text-gray-300">{step.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{step.desc}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>

          {/* Tips */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <RiInformationLine size={17} className="text-yellow-400" />
              <h3 className="text-sm font-semibold text-gray-200">Resume tips</h3>
            </div>
            <ul className="space-y-3">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-gray-400 leading-relaxed">
                  <span className="flex-shrink-0 w-4 h-4 rounded-full bg-yellow-500/10 text-yellow-400 flex items-center justify-center text-[10px] font-bold mt-0.5">
                    {i + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeUpload
