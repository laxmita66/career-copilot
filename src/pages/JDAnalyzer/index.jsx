import { useState, useRef } from 'react'
import {
  RiSearchEyeLine,
  RiDeleteBack2Line,
  RiCheckLine,
  RiCloseLine,
  RiLightbulbLine,
  RiShieldCheckLine,
  RiAlertLine,
  RiArrowUpLine,
  RiSparklingLine,
  RiBarChartLine,
  RiFileTextLine,
} from 'react-icons/ri'
import PageHeader from '../../components/ui/PageHeader'
import Button from '../../components/ui/Button'
import { mockAnalysis } from './mockAnalysis'

/* ─── Helpers ──────────────────────────────────────────── */

const priorityConfig = {
  High:   { label: 'High',   cls: 'bg-red-500/15 text-red-400 border-red-500/20'    },
  Medium: { label: 'Medium', cls: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20' },
  Low:    { label: 'Low',    cls: 'bg-gray-700/60 text-gray-400 border-gray-600/30'  },
}

/* ─── Circular progress ────────────────────────────────── */
const CircularScore = ({ score }) => {
  const radius    = 54
  const stroke    = 8
  const normalised = radius - stroke / 2
  const circumference = 2 * Math.PI * normalised
  const offset    = circumference - (score / 100) * circumference

  const color =
    score >= 80 ? '#22c55e' :
    score >= 60 ? '#6366f1' :
    score >= 40 ? '#f97316' :
                  '#ef4444'

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={radius * 2} height={radius * 2} className="-rotate-90">
        {/* Track */}
        <circle
          cx={radius} cy={radius} r={normalised}
          fill="none" stroke="#1f2937" strokeWidth={stroke}
        />
        {/* Progress */}
        <circle
          cx={radius} cy={radius} r={normalised}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
          style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
        />
      </svg>
      {/* Centre label */}
      <div className="absolute flex flex-col items-center leading-tight">
        <span className="text-3xl font-extrabold text-gray-100">{score}%</span>
        <span className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">Match</span>
      </div>
    </div>
  )
}

/* ─── Skill badge ──────────────────────────────────────── */
const SkillBadge = ({ label, matched }) => (
  <span className={`
    inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border
    transition-all duration-200 hover:-translate-y-0.5
    ${matched
      ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20'
      : 'bg-red-500/10  text-red-400  border-red-500/20  hover:bg-red-500/20'}
  `}>
    {matched
      ? <RiCheckLine size={11} />
      : <RiCloseLine size={11} />
    }
    {label}
  </span>
)

/* ─── Section heading ──────────────────────────────────── */
const SectionHeading = ({ icon: Icon, iconCls, title, count }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconCls}`}>
      <Icon size={16} className="opacity-80" />
    </div>
    <h3 className="text-base font-semibold text-gray-200">{title}</h3>
    {count !== undefined && (
      <span className="ml-auto text-xs font-semibold text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">
        {count}
      </span>
    )}
  </div>
)

/* ─── Analyzing overlay steps ──────────────────────────── */
const analyzingSteps = [
  'Parsing job description…',
  'Matching skills against profile…',
  'Scoring keyword density…',
  'Generating recommendations…',
]

/* ══════════════════════════════════════════════════════════
   Main Component
══════════════════════════════════════════════════════════ */
const JDAnalyzer = () => {
  const [jdText,     setJdText]     = useState('')
  const [analysis,   setAnalysis]   = useState(null)
  const [analyzing,  setAnalyzing]  = useState(false)
  const [stepIdx,    setStepIdx]    = useState(0)
  const resultsRef                  = useRef(null)

  /* Run analysis */
  const handleAnalyze = () => {
    if (!jdText.trim()) return
    setAnalysis(null)
    setAnalyzing(true)
    setStepIdx(0)

    // Cycle through step labels during loading
    let step = 0
    const stepTimer = setInterval(() => {
      step += 1
      if (step < analyzingSteps.length) setStepIdx(step)
      else clearInterval(stepTimer)
    }, 450)

    setTimeout(() => {
      clearInterval(stepTimer)
      setAnalyzing(false)
      setAnalysis(mockAnalysis)
      // Smooth-scroll to results
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
    }, 2000)
  }

  const handleClear = () => {
    setJdText('')
    setAnalysis(null)
    setAnalyzing(false)
  }

  const wordCount = jdText.trim() ? jdText.trim().split(/\s+/).length : 0

  /* ── Status badge colours ── */
  const matchScore = analysis?.matchPercentage ?? 0
  const statusCfg =
    matchScore >= 80 ? { label: 'Excellent Match', cls: 'bg-green-500/15 text-green-400'  } :
    matchScore >= 60 ? { label: 'Good Match',       cls: 'bg-indigo-500/15 text-indigo-400' } :
    matchScore >= 40 ? { label: 'Partial Match',    cls: 'bg-orange-500/15 text-orange-400' } :
                       { label: 'Low Match',         cls: 'bg-red-500/15 text-red-400'    }

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <PageHeader
        title="JD Analyzer"
        description="Paste a job description and instantly see how well your profile matches — with skill gaps and AI recommendations."
      />

      {/* ── Input card ──────────────────────────────── */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center">
            <RiFileTextLine size={16} className="text-violet-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-200">Paste Job Description</h2>
            <p className="text-xs text-gray-500">Copy the full JD from any job board and paste it below</p>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste the job description here...&#10;&#10;e.g. We are looking for a Senior Frontend Engineer with experience in React, TypeScript, and cloud infrastructure..."
            rows={10}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 resize-none transition-colors leading-relaxed"
          />
          {/* Word count */}
          <span className="absolute bottom-3 right-4 text-xs text-gray-600 pointer-events-none">
            {wordCount > 0 ? `${wordCount} words` : ''}
          </span>
        </div>

        {/* Actions row */}
        <div className="flex items-center justify-between mt-4 gap-3">
          <p className="text-xs text-gray-600 hidden sm:block">
            Tip: Include the full JD for the most accurate analysis.
          </p>
          <div className="flex items-center gap-3 ml-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleClear}
              disabled={!jdText && !analysis}
            >
              <RiDeleteBack2Line size={15} />
              Clear
            </Button>
            <Button
              size="sm"
              onClick={handleAnalyze}
              disabled={!jdText.trim() || analyzing}
              loading={analyzing}
              className="shadow-md shadow-indigo-500/20 min-w-40"
            >
              {!analyzing && <RiSearchEyeLine size={15} />}
              {analyzing ? 'Analyzing…' : 'Analyze Job Description'}
            </Button>
          </div>
        </div>
      </div>

      {/* ── Analyzing indicator ──────────────────────── */}
      {analyzing && (
        <div className="bg-gray-900 border border-indigo-500/20 rounded-2xl p-6">
          <div className="flex flex-col items-center text-center gap-5">
            {/* Spinner */}
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-gray-800" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin" />
              <div className="absolute inset-2 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <RiSparklingLine size={18} className="text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-200 mb-1">AI Analysis in Progress</p>
              <p className="text-xs text-indigo-400 animate-pulse">{analyzingSteps[stepIdx]}</p>
            </div>
            {/* Step dots */}
            <div className="flex items-center gap-6">
              {analyzingSteps.map((s, i) => (
                <div key={s} className="flex flex-col items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${i <= stepIdx ? 'bg-indigo-500 scale-125' : 'bg-gray-700'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Results ──────────────────────────────────── */}
      {analysis && !analyzing && (
        <div ref={resultsRef} className="space-y-6">

          {/* ── Row 1: Score + Skills ─────────────────── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Match Score card */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col items-center text-center">
              <SectionHeading
                icon={RiBarChartLine}
                iconCls="bg-indigo-500/15 text-indigo-400"
                title="Match Score"
              />
              <CircularScore score={analysis.matchPercentage} />
              <span className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusCfg.cls}`}>
                <RiCheckLine size={11} />
                {statusCfg.label}
              </span>
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                Your profile matches <span className="text-gray-300 font-medium">{analysis.matchPercentage}%</span> of the requirements in this job description.
              </p>
            </div>

            {/* Matched Skills */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <SectionHeading
                icon={RiCheckLine}
                iconCls="bg-green-500/15 text-green-400"
                title="Matched Skills"
                count={analysis.matchedSkills.length}
              />
              <div className="flex flex-wrap gap-2">
                {analysis.matchedSkills.map((skill) => (
                  <SkillBadge key={skill} label={skill} matched />
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <SectionHeading
                icon={RiCloseLine}
                iconCls="bg-red-500/15 text-red-400"
                title="Missing Skills"
                count={analysis.missingSkills.length}
              />
              <div className="flex flex-wrap gap-2">
                {analysis.missingSkills.map((skill) => (
                  <SkillBadge key={skill} label={skill} matched={false} />
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-4">
                Closing these gaps could raise your match score significantly.
              </p>
            </div>
          </div>

          {/* ── Recommendations ──────────────────────── */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <SectionHeading
              icon={RiLightbulbLine}
              iconCls="bg-yellow-500/15 text-yellow-400"
              title="AI Recommendations"
              count={analysis.recommendations.length}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              {analysis.recommendations.map((rec, i) => {
                const pc = priorityConfig[rec.priority] ?? priorityConfig.Low
                return (
                  <div
                    key={rec.title}
                    className="group bg-gray-800/50 border border-gray-700/50 hover:border-gray-600 rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 text-xs font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-sm font-semibold text-gray-200">{rec.title}</p>
                      </div>
                      <span className={`flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${pc.cls}`}>
                        {pc.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{rec.detail}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Analysis Summary ──────────────────────── */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <SectionHeading
              icon={RiSparklingLine}
              iconCls="bg-indigo-500/15 text-indigo-400"
              title="Analysis Summary"
            />

            <div className="grid sm:grid-cols-3 gap-6">

              {/* Strengths */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <RiShieldCheckLine size={14} className="text-green-400" />
                  <p className="text-xs font-semibold text-green-400 uppercase tracking-wider">Strengths</p>
                </div>
                <ul className="space-y-2.5">
                  {analysis.summary.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-green-500/15 flex items-center justify-center">
                        <RiCheckLine size={9} className="text-green-400" />
                      </span>
                      <span className="text-xs text-gray-400 leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <RiAlertLine size={14} className="text-red-400" />
                  <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">Weaknesses</p>
                </div>
                <ul className="space-y-2.5">
                  {analysis.summary.weaknesses.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-red-500/15 flex items-center justify-center">
                        <RiCloseLine size={9} className="text-red-400" />
                      </span>
                      <span className="text-xs text-gray-400 leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggested Improvements */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <RiArrowUpLine size={14} className="text-indigo-400" />
                  <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Improvements</p>
                </div>
                <ul className="space-y-2.5">
                  {analysis.summary.improvements.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-indigo-500/15 flex items-center justify-center">
                        <RiArrowUpLine size={9} className="text-indigo-400" />
                      </span>
                      <span className="text-xs text-gray-400 leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── Re-analyze banner ─────────────────────── */}
          <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-200">Want a better score?</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Update your resume based on the recommendations above, re-upload it, and run this analysis again.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleClear} className="flex-shrink-0">
              <RiSearchEyeLine size={14} />
              Analyze another JD
            </Button>
          </div>

        </div>
      )}

      {/* ── Empty result placeholder ─────────────────── */}
      {!analysis && !analyzing && (
        <div className="bg-gray-900 border border-gray-800 border-dashed rounded-2xl p-12 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-4">
            <RiSearchEyeLine size={30} className="text-violet-400" />
          </div>
          <p className="text-gray-300 font-semibold mb-1">No analysis yet</p>
          <p className="text-gray-500 text-sm max-w-sm">
            Paste a job description above and click <span className="text-gray-400 font-medium">Analyze Job Description</span> to see your match score, skill gaps, and AI-powered recommendations.
          </p>
        </div>
      )}

    </div>
  )
}

export default JDAnalyzer
