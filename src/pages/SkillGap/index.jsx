import { useState } from 'react'
import {
  RiLightbulbLine,
  RiCheckLine,
  RiAlertLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiTimeLine,
  RiBookOpenLine,
  RiCodeLine,
  RiMapPinLine,
  RiFilterLine,
  RiSparklingLine,
  RiRocketLine,
  RiExternalLinkLine,
  RiArrowRightLine,
  RiBrainLine,
  RiShieldCheckLine,
  RiLoader4Line,
} from 'react-icons/ri'
import PageHeader from '../../components/ui/PageHeader'
import Button     from '../../components/ui/Button'
import {
  skills,
  roadmap,
  overallStats,
  targetRole,
} from './mockSkillGapData'

// Resource URLs for the "View Resources" and "Start Learning" CTA buttons.
// "recommendedNext" is 'Docker' — point to its first resource URL.
const RECOMMENDED_RESOURCES_URL = 'https://docs.docker.com'
const RECOMMENDED_ROADMAP_URL   = 'https://roadmap.sh/devops'

/* ══════════════════════════════════════════════════════════
   Config / Helpers
══════════════════════════════════════════════════════════ */

const priorityConfig = {
  high:   { label: 'High',   badgeCls: 'bg-red-500/15 text-red-400 border-red-500/20',       dotCls: 'bg-red-500'    },
  medium: { label: 'Medium', badgeCls: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20', dotCls: 'bg-yellow-500' },
  low:    { label: 'Low',    badgeCls: 'bg-gray-700/60 text-gray-400 border-gray-600/30',     dotCls: 'bg-gray-500'   },
}

const statusConfig = {
  'Critical Gap': { cls: 'bg-red-500/15 text-red-400',     icon: RiAlertLine        },
  'Needs Work':   { cls: 'bg-orange-500/15 text-orange-400', icon: RiLoader4Line     },
  'In Progress':  { cls: 'bg-indigo-500/15 text-indigo-400', icon: RiArrowUpLine     },
  'Completed':    { cls: 'bg-green-500/15 text-green-400',   icon: RiCheckLine       },
}

const resourceTypeConfig = {
  Course:        { cls: 'bg-indigo-500/15 text-indigo-400'  },
  Documentation: { cls: 'bg-blue-500/15 text-blue-400'      },
  Book:          { cls: 'bg-purple-500/15 text-purple-400'  },
  Article:       { cls: 'bg-yellow-500/15 text-yellow-400'  },
  Practice:      { cls: 'bg-green-500/15 text-green-400'    },
  Tool:          { cls: 'bg-orange-500/15 text-orange-400'  },
}

const roadmapColor = {
  indigo:  { bar: 'from-indigo-500 to-indigo-400',  dot: 'bg-indigo-500',  ring: 'ring-indigo-500/30', badge: 'bg-indigo-500/15 text-indigo-400', border: 'border-indigo-500/30' },
  purple:  { bar: 'from-purple-500 to-purple-400',  dot: 'bg-purple-500',  ring: 'ring-purple-500/30', badge: 'bg-purple-500/15 text-purple-400', border: 'border-purple-500/30' },
  emerald: { bar: 'from-emerald-500 to-emerald-400', dot: 'bg-emerald-500', ring: 'ring-emerald-500/30', badge: 'bg-emerald-500/15 text-emerald-400', border: 'border-emerald-500/30' },
}

const FILTERS = [
  { value: 'all',    label: 'All Skills'  },
  { value: 'high',   label: 'High'        },
  { value: 'medium', label: 'Medium'      },
  { value: 'low',    label: 'Low'         },
]

const getGapColor = (gap) => {
  if (gap >= 40) return 'text-red-400'
  if (gap >= 20) return 'text-orange-400'
  if (gap >= 10) return 'text-yellow-400'
  return 'text-green-400'
}

/* ══════════════════════════════════════════════════════════
   Sub-components
══════════════════════════════════════════════════════════ */

/* ── Dual-bar showing current vs required ── */
const SkillLevelBar = ({ current, required }) => {
  const reqPct = (required / 100) * 100
  const curPct = (current / 100) * 100
  return (
    <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-visible">
      {/* Required level marker */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gray-500 rounded-full z-10"
        style={{ left: `${reqPct}%` }}
        title={`Required: ${required}%`}
      />
      {/* Current level */}
      <div
        className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
        style={{
          width: `${curPct}%`,
          background: current >= required
            ? 'linear-gradient(90deg,#22c55e,#4ade80)'
            : current >= required * 0.7
            ? 'linear-gradient(90deg,#6366f1,#818cf8)'
            : 'linear-gradient(90deg,#f97316,#fb923c)',
        }}
      />
    </div>
  )
}

/* ── Skill card ── */
const SkillCard = ({ skill }) => {
  const [expanded, setExpanded] = useState(false)
  const pc  = priorityConfig[skill.priority]
  const sc  = statusConfig[skill.status] ?? statusConfig['In Progress']
  const gap = skill.requiredLevel - skill.currentLevel

  const StatusIcon = sc.icon

  return (
    <div className={`
      bg-gray-900 border rounded-2xl overflow-hidden transition-all duration-200
      hover:border-gray-700 hover:shadow-lg hover:shadow-black/20
      ${expanded ? 'border-gray-700' : 'border-gray-800'}
    `}>
      {/* Card header – always visible */}
      <button
        className="w-full text-left p-5 focus:outline-none"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center flex-shrink-0">
            <RiCodeLine size={18} className="text-indigo-400" />
          </div>

          <div className="flex-1 min-w-0">
            {/* Name row */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-gray-200">{skill.name}</span>
              <span className="text-[10px] text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{skill.category}</span>

              {/* Priority badge */}
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${pc.badgeCls}`}>
                {pc.label}
              </span>

              {/* Status badge */}
              <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${sc.cls}`}>
                <StatusIcon size={10} />
                {skill.status}
              </span>
            </div>

            {/* Level bar */}
            <SkillLevelBar current={skill.currentLevel} required={skill.requiredLevel} />

            {/* Level labels */}
            <div className="flex items-center justify-between mt-1.5 text-[10px]">
              <span className="text-gray-500">Current: <span className="text-gray-300 font-semibold">{skill.currentLevel}%</span></span>
              <span className={`font-semibold ${getGapColor(gap)}`}>
                {gap > 0 ? `Gap: ${gap}%` : 'Achieved ✓'}
              </span>
              <span className="text-gray-500">Required: <span className="text-gray-300 font-semibold">{skill.requiredLevel}%</span></span>
            </div>
          </div>

          {/* Importance + chevron */}
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <span className="text-xs font-bold text-gray-300">{skill.importance}%</span>
            <span className="text-[9px] text-gray-600 uppercase tracking-wider">Importance</span>
            <div className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
              <RiArrowDownLine size={14} className="text-gray-600" />
            </div>
          </div>
        </div>
      </button>

      {/* Expandable: resources */}
      {expanded && (
        <div className="border-t border-gray-800 px-5 pb-5 pt-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <RiBookOpenLine size={12} />
            Learning Resources
          </p>
          <div className="space-y-2.5">
            {skill.resources.map((r, i) => {
              const tc = resourceTypeConfig[r.type] ?? resourceTypeConfig.Course
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-gray-800/50 border border-gray-700/50 hover:border-gray-600 rounded-xl px-4 py-3 transition-colors group"
                >
                  <span className={`flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${tc.cls}`}>
                    {r.type}
                  </span>
                  <span className="flex-1 text-xs text-gray-300 font-medium truncate">{r.name}</span>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="hidden sm:flex items-center gap-1 text-[10px] text-gray-600">
                      <RiTimeLine size={10} />{r.time}
                    </span>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                    >
                      Open <RiExternalLinkLine size={10} />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Priority section ── */
const PrioritySection = ({ priority, skillList }) => {
  if (!skillList.length) return null
  const pc = priorityConfig[priority]

  const headingCls = {
    high:   'from-red-500/20 to-transparent border-red-500/20',
    medium: 'from-yellow-500/20 to-transparent border-yellow-500/20',
    low:    'from-gray-800 to-transparent border-gray-700/50',
  }[priority]

  return (
    <div>
      {/* Section label */}
      <div className={`flex items-center gap-3 bg-gradient-to-r ${headingCls} border rounded-xl px-4 py-3 mb-4`}>
        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${pc.dotCls}`} />
        <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider">
          {pc.label} Priority Skills
        </h3>
        <span className="ml-auto text-xs text-gray-500 bg-gray-800/60 px-2 py-0.5 rounded-full font-medium">
          {skillList.length} skill{skillList.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="space-y-3">
        {skillList.map((s) => <SkillCard key={s.id} skill={s} />)}
      </div>
    </div>
  )
}

/* ── Roadmap card ── */
const RoadmapCard = ({ item, index }) => {
  const rc = roadmapColor[item.color] ?? roadmapColor.indigo
  return (
    <div className="relative">
      {/* Connector line between cards */}
      {index < roadmap.length - 1 && (
        <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-gray-700 to-transparent z-0 -translate-y-1/2" style={{ width: 'calc(100% - 2rem)', left: '100%' }} />
      )}

      <div className={`relative z-10 bg-gray-900 border ${rc.border} rounded-2xl p-6 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 transition-all duration-200`}>
        {/* Month badge + progress */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${rc.badge}`}>
              <RiMapPinLine size={11} />
              {item.month}
            </span>
            <p className="text-base font-bold text-gray-200 mt-2">{item.theme}</p>
          </div>
          {/* Circular % */}
          <div className={`w-12 h-12 rounded-full ring-4 ${rc.ring} bg-gray-900 flex items-center justify-center flex-shrink-0`}>
            <span className="text-xs font-extrabold text-gray-200">{item.progress}%</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${rc.bar} transition-all duration-700`}
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>

        {/* Target skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.skills.map((s) => (
            <span key={s} className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${rc.badge} ${rc.border}`}>
              {s}
            </span>
          ))}
        </div>

        {/* Milestone */}
        <div className="flex items-start gap-2 mb-4 bg-gray-800/50 rounded-xl p-3">
          <RiShieldCheckLine size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-400 leading-relaxed">
            <span className="text-gray-300 font-semibold">Milestone: </span>
            {item.milestone}
          </p>
        </div>

        {/* Task list */}
        <ul className="space-y-2">
          {item.tasks.map((t, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
              <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-gray-800 flex items-center justify-center text-[9px] text-gray-600 font-bold">
                {i + 1}
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   Main Page
══════════════════════════════════════════════════════════ */
const SkillGap = () => {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? skills : skills.filter((s) => s.priority === filter)

  const byPriority = (p) => filtered.filter((s) => s.priority === p)

  const completionPct = Math.round(
    (overallStats.skillsCompleted / overallStats.totalSkills) * 100
  )

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Header */}
      <PageHeader
        title="Skill Gap Analysis"
        description={`Skills roadmap for your target role: ${targetRole}`}
      />

      {/* ── Overall Progress Row ──────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Readiness Score',
            value: `${overallStats.readinessScore}%`,
            sub: 'Overall',
            icon: RiSparklingLine,
            bg: 'bg-indigo-500/15',
            text: 'text-indigo-400',
            grad: 'from-indigo-500/15 to-indigo-500/5',
          },
          {
            label: 'Skills Progress',
            value: `${completionPct}%`,
            sub: `${overallStats.skillsCompleted}/${overallStats.totalSkills} done`,
            icon: RiCheckLine,
            bg: 'bg-green-500/15',
            text: 'text-green-400',
            grad: 'from-green-500/15 to-green-500/5',
          },
          {
            label: 'Recommended Next',
            value: overallStats.recommendedNext,
            sub: 'Start here',
            icon: RiArrowRightLine,
            bg: 'bg-orange-500/15',
            text: 'text-orange-400',
            grad: 'from-orange-500/15 to-orange-500/5',
          },
          {
            label: 'Est. Completion',
            value: overallStats.estimatedCompletion,
            sub: 'At current pace',
            icon: RiTimeLine,
            bg: 'bg-purple-500/15',
            text: 'text-purple-400',
            grad: 'from-purple-500/15 to-purple-500/5',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`bg-gradient-to-br ${stat.grad} border border-gray-800 rounded-2xl p-5 hover:border-gray-700 hover:-translate-y-0.5 transition-all duration-200`}
          >
            <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon size={17} className={stat.text} />
            </div>
            <p className="text-xl font-extrabold text-gray-100">{stat.value}</p>
            <p className="text-xs font-medium text-gray-400 mt-0.5">{stat.label}</p>
            <p className="text-[10px] text-gray-600 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Overall readiness progress bar */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <RiBrainLine size={16} className="text-indigo-400" />
            <span className="text-sm font-semibold text-gray-200">Overall Skill Readiness</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-gray-500">
              <span className="w-2 h-2 rounded-full bg-green-500" /> {overallStats.skillsCompleted} Completed
            </span>
            <span className="flex items-center gap-1.5 text-gray-500">
              <span className="w-2 h-2 rounded-full bg-indigo-500" /> {overallStats.skillsInProgress} In Progress
            </span>
            <span className="flex items-center gap-1.5 text-gray-500">
              <span className="w-2 h-2 rounded-full bg-gray-600" /> {overallStats.skillsNotStarted} Not Started
            </span>
          </div>
        </div>
        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden flex">
          {/* Completed */}
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-700"
            style={{ width: `${(overallStats.skillsCompleted / overallStats.totalSkills) * 100}%` }}
          />
          {/* In progress */}
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
            style={{ width: `${(overallStats.skillsInProgress / overallStats.totalSkills) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-[10px] text-gray-600">
          <span>0%</span>
          <span className="text-indigo-400 font-semibold">{overallStats.readinessScore}% ready</span>
          <span>100%</span>
        </div>
      </div>

      {/* ── Skills Section ───────────────────────────── */}
      <div>
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <RiLightbulbLine size={18} className="text-yellow-400" />
            <h2 className="text-base font-bold text-gray-200">Skill Gap Breakdown</h2>
            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full ml-1">
              {filtered.length} skills
            </span>
          </div>
          <div className="flex items-center gap-2">
            <RiFilterLine size={14} className="text-gray-500" />
            <div className="flex gap-1.5 bg-gray-900 border border-gray-800 rounded-xl p-1">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`
                    px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
                    ${filter === f.value
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}
                  `}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-600 mb-5 flex items-center gap-1.5">
          <RiArrowDownLine size={12} />
          Click any skill card to expand learning resources
        </p>

        <div className="space-y-8">
          <PrioritySection priority="high"   skillList={byPriority('high')}   />
          <PrioritySection priority="medium" skillList={byPriority('medium')} />
          <PrioritySection priority="low"    skillList={byPriority('low')}    />
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-sm">No skills match this filter.</div>
          )}
        </div>
      </div>

      {/* ── Roadmap Section ──────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center">
            <RiRocketLine size={16} className="text-indigo-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-200">Learning Roadmap</h2>
            <p className="text-xs text-gray-500">Your 3-month skill development plan</p>
          </div>
        </div>

        {/* Month cards grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {roadmap.map((item, i) => (
            <RoadmapCard key={item.month} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* ── CTA Banner ───────────────────────────────── */}
      <div className="bg-gradient-to-r from-indigo-600/10 via-purple-600/8 to-indigo-600/10 border border-indigo-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/30">
          <RiSparklingLine size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-200">Ready to close the gaps?</p>
          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
            Start with <span className="text-indigo-400 font-semibold">{overallStats.recommendedNext}</span> — it's your highest-impact next step.
            Estimated completion: <span className="text-gray-300 font-medium">{overallStats.estimatedCompletion}</span>.
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.open(RECOMMENDED_RESOURCES_URL, '_blank', 'noopener,noreferrer')}
          >
            View Resources
          </Button>
          <Button
            size="sm"
            className="shadow-md shadow-indigo-500/20"
            onClick={() => window.open(RECOMMENDED_ROADMAP_URL, '_blank', 'noopener,noreferrer')}
          >
            Start Learning
            <RiArrowRightLine size={14} />
          </Button>
        </div>
      </div>

    </div>
  )
}

export default SkillGap
