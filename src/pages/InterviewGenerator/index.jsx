import { useState, useCallback, useEffect, useRef } from 'react'
import {
  RiQuestionAnswerLine,
  RiSparklingLine,
  RiRefreshLine,
  RiFileCopyLine,
  RiSaveLine,
  RiCheckLine,
  RiCodeLine,
  RiUser3Line,
  RiAlertLine,
  RiInformationLine,
  RiArrowDownLine,
} from 'react-icons/ri'
import PageHeader   from '../../components/ui/PageHeader'
import Button       from '../../components/ui/Button'
import { roles, interviewData } from './mockInterviewData'

/* ─── Difficulty badge ─────────────────────────────────── */
const diffConfig = {
  Easy:   { cls: 'bg-green-500/15 text-green-400 border-green-500/20'     },
  Medium: { cls: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20'  },
  Hard:   { cls: 'bg-red-500/15 text-red-400 border-red-500/20'           },
}

const DiffBadge = ({ level }) => {
  const cfg = diffConfig[level] ?? diffConfig.Medium
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${cfg.cls}`}>
      {level}
    </span>
  )
}

/* ─── Toast notification ───────────────────────────────── */
const Toast = ({ message, show }) => (
  <div className={`
    fixed bottom-6 right-6 z-50 flex items-center gap-3
    bg-gray-800 border border-gray-700 rounded-2xl px-5 py-3.5
    shadow-2xl shadow-black/40 transition-all duration-300
    ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
  `}>
    <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
      <RiCheckLine size={13} className="text-green-400" />
    </span>
    <span className="text-sm text-gray-200 font-medium">{message}</span>
  </div>
)

/* ─── Question card ────────────────────────────────────── */
const QuestionCard = ({ number, question, difficulty, type }) => {
  const isHR = type === 'hr'
  return (
    <div className="group flex items-start gap-4 bg-gray-800/40 hover:bg-gray-800/70 border border-gray-700/50 hover:border-gray-600 rounded-2xl px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20">
      {/* Number */}
      <span className={`
        flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold
        ${isHR ? 'bg-violet-500/15 text-violet-400' : 'bg-indigo-500/15 text-indigo-400'}
      `}>
        {number}
      </span>
      {/* Question text */}
      <p className="flex-1 text-sm text-gray-300 group-hover:text-gray-200 leading-relaxed pt-1 transition-colors">
        {question}
      </p>
      {/* Difficulty (only for technical) */}
      {!isHR && difficulty && <DiffBadge level={difficulty} />}
    </div>
  )
}

/* ─── Section header ───────────────────────────────────── */
const SectionHeader = ({ icon: Icon, iconCls, title, subtitle, count, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconCls}`}>
        <Icon size={17} />
      </div>
      <div>
        <h3 className="text-base font-semibold text-gray-200">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
      {count !== undefined && (
        <span className="ml-1 text-xs bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full font-medium">
          {count} questions
        </span>
      )}
    </div>
    {children}
  </div>
)

/* ══════════════════════════════════════════════════════════
   Main Component
══════════════════════════════════════════════════════════ */
const InterviewGenerator = () => {
  const [selectedRole, setSelectedRole] = useState('')
  const [set,          setSet]          = useState('A')   // 'A' or 'B'
  const [questions,    setQuestions]    = useState(null)
  const [generating,   setGenerating]   = useState(false)
  const [toast,        setToast]        = useState({ show: false, message: '' })
  const resultsRef                      = useRef(null)
  const toastTimer                      = useRef(null)

  /* Show toast helper */
  const showToast = useCallback((message) => {
    clearTimeout(toastTimer.current)
    setToast({ show: true, message })
    toastTimer.current = setTimeout(() => setToast({ show: false, message: '' }), 3000)
  }, [])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  /* Generate / Regenerate */
  const generate = useCallback((role, nextSet) => {
    if (!role) return
    setGenerating(true)
    setQuestions(null)

    setTimeout(() => {
      const data = interviewData[role]?.[nextSet]
      setQuestions(data ?? null)
      setGenerating(false)
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
    }, 1200)
  }, [])

  const handleGenerate = () => {
    const nextSet = 'A'
    setSet(nextSet)
    generate(selectedRole, nextSet)
  }

  const handleRegenerate = () => {
    const nextSet = set === 'A' ? 'B' : 'A'
    setSet(nextSet)
    generate(selectedRole, nextSet)
  }

  /* Copy all questions to clipboard */
  const handleCopy = async () => {
    if (!questions) return
    const roleLabel = roles.find((r) => r.value === selectedRole)?.label ?? selectedRole
    const lines = [
      `Interview Questions — ${roleLabel}`,
      '',
      '=== TECHNICAL QUESTIONS ===',
      ...questions.technical.map((q, i) => `${i + 1}. ${q.q} [${q.difficulty}]`),
      '',
      '=== HR QUESTIONS ===',
      ...questions.hr.map((q, i) => `${i + 1}. ${q.q}`),
    ].join('\n')

    try {
      await navigator.clipboard.writeText(lines)
      showToast('Questions copied to clipboard!')
    } catch {
      showToast('Copy failed — please try manually.')
    }
  }

  /* Save (mock) */
  const handleSave = () => {
    showToast('Questions saved to your profile!')
  }

  const roleLabel = roles.find((r) => r.value === selectedRole)?.label ?? ''
  const techCount = questions?.technical?.length ?? 0
  const hrCount   = questions?.hr?.length ?? 0

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <PageHeader
        title="Interview Generator"
        description="Select a role to generate tailored technical and HR interview questions powered by AI."
      />

      {/* ── Configuration card ──────────────────────── */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center">
            <RiSparklingLine size={16} className="text-orange-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-200">Configure Questions</h2>
            <p className="text-xs text-gray-500">Pick a role and generate your personalised question set</p>
          </div>
        </div>

        {/* Role selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Target Role
          </label>
          <div className="relative max-w-sm">
            <select
              value={selectedRole}
              onChange={(e) => { setSelectedRole(e.target.value); setQuestions(null) }}
              className="w-full appearance-none bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors cursor-pointer pr-10"
            >
              <option value="">Select a role…</option>
              {roles.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            <RiArrowDownLine size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Info chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { label: '10 Technical Questions', icon: RiCodeLine, cls: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
            { label: '5 HR Questions',          icon: RiUser3Line, cls: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
            { label: 'Role-specific content',   icon: RiInformationLine, cls: 'bg-gray-800 text-gray-400 border-gray-700' },
          ].map((chip) => (
            <span key={chip.label} className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${chip.cls}`}>
              <chip.icon size={12} />
              {chip.label}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleGenerate}
            disabled={!selectedRole || generating}
            loading={generating}
            className="shadow-md shadow-indigo-500/20 min-w-44"
          >
            {!generating && <RiSparklingLine size={16} />}
            {generating ? 'Generating…' : 'Generate Questions'}
          </Button>

          {questions && !generating && (
            <>
              <Button variant="secondary" onClick={handleRegenerate}>
                <RiRefreshLine size={15} />
                Regenerate
              </Button>
              <Button variant="secondary" onClick={handleCopy}>
                <RiFileCopyLine size={15} />
                Copy All
              </Button>
              <Button variant="secondary" onClick={handleSave}>
                <RiSaveLine size={15} />
                Save
              </Button>
            </>
          )}
        </div>
      </div>

      {/* ── Generating animation ─────────────────────── */}
      {generating && (
        <div className="bg-gray-900 border border-indigo-500/20 rounded-2xl p-10 flex flex-col items-center gap-5 text-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-gray-800" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 animate-spin" />
            <div className="absolute inset-2 rounded-full bg-orange-500/10 flex items-center justify-center">
              <RiQuestionAnswerLine size={18} className="text-orange-400 animate-pulse" />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-200 mb-1">Generating questions for <span className="text-orange-400">{roleLabel}</span></p>
            <p className="text-xs text-gray-500">Tailoring technical and HR questions to your selected role…</p>
          </div>
          {/* Skeleton lines */}
          <div className="w-full max-w-md space-y-2">
            {[90, 75, 85, 60].map((w, i) => (
              <div
                key={i}
                className="h-2.5 bg-gray-800 rounded-full animate-pulse"
                style={{ width: `${w}%`, animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Results ──────────────────────────────────── */}
      {questions && !generating && (
        <div ref={resultsRef} className="space-y-6">

          {/* Role + set badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
            <div>
              <h2 className="text-lg font-bold text-gray-100">
                {roleLabel} — Interview Questions
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Set {set} of 2 &nbsp;·&nbsp; {techCount + hrCount} questions total
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={handleCopy}>
                <RiFileCopyLine size={14} />
                Copy All
              </Button>
              <Button variant="secondary" size="sm" onClick={handleSave}>
                <RiSaveLine size={14} />
                Save
              </Button>
            </div>
          </div>

          {/* ── Technical Questions ─────────────────── */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <SectionHeader
              icon={RiCodeLine}
              iconCls="bg-indigo-500/15 text-indigo-400"
              title="Technical Questions"
              subtitle="Core engineering and problem-solving questions"
              count={techCount}
            >
              {/* Difficulty legend */}
              <div className="hidden sm:flex items-center gap-2 text-[10px]">
                {Object.entries(diffConfig).map(([level, cfg]) => (
                  <span key={level} className={`px-2 py-0.5 rounded-full border font-semibold ${cfg.cls}`}>
                    {level}
                  </span>
                ))}
              </div>
            </SectionHeader>

            <div className="space-y-3">
              {questions.technical.map((q, i) => (
                <QuestionCard
                  key={q.id}
                  number={i + 1}
                  question={q.q}
                  difficulty={q.difficulty}
                  type="technical"
                />
              ))}
            </div>
          </div>

          {/* ── HR Questions ─────────────────────────── */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <SectionHeader
              icon={RiUser3Line}
              iconCls="bg-violet-500/15 text-violet-400"
              title="HR Questions"
              subtitle="Behavioural, situational, and culture-fit questions"
              count={hrCount}
            />

            <div className="space-y-3">
              {questions.hr.map((q, i) => (
                <QuestionCard
                  key={q.id}
                  number={i + 1}
                  question={q.q}
                  type="hr"
                />
              ))}
            </div>
          </div>

          {/* ── Tips card ───────────────────────────── */}
          <div className="bg-gradient-to-r from-indigo-600/8 to-purple-600/8 border border-indigo-500/15 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/15 flex items-center justify-center flex-shrink-0">
              <RiAlertLine size={17} className="text-indigo-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-200 mb-1">Preparation tips</p>
              <ul className="space-y-1.5 text-xs text-gray-400 leading-relaxed">
                <li>• Use the STAR method (Situation, Task, Action, Result) for all behavioural questions.</li>
                <li>• For technical questions, talk through your approach before writing code.</li>
                <li>• Always ask clarifying questions before solving algorithmic problems.</li>
              </ul>
            </div>
            <div className="flex-shrink-0">
              <Button variant="secondary" size="sm" onClick={handleRegenerate}>
                <RiRefreshLine size={14} />
                New Set
              </Button>
            </div>
          </div>

        </div>
      )}

      {/* ── Empty placeholder ────────────────────────── */}
      {!questions && !generating && (
        <div className="bg-gray-900 border border-gray-800 border-dashed rounded-2xl p-14 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-4">
            <RiQuestionAnswerLine size={30} className="text-orange-400" />
          </div>
          <p className="text-gray-200 font-semibold mb-1">No questions generated yet</p>
          <p className="text-gray-500 text-sm max-w-sm">
            Select a role above and click <span className="text-gray-400 font-medium">Generate Questions</span> to get your tailored question set.
          </p>
        </div>
      )}

      {/* Toast */}
      <Toast show={toast.show} message={toast.message} />

    </div>
  )
}

export default InterviewGenerator
