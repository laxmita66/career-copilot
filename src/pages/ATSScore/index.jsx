import {
  RiBarChartLine,
  RiCheckLine,
  RiCloseLine,
  RiLightbulbLine,
  RiArrowUpLine,
  RiSparklingLine,
  RiFileTextLine,
  RiBriefcaseLine,
  RiBookOpenLine,
  RiCodeLine,
  RiKeyLine,
  RiDownloadLine,
  RiRefreshLine,
} from 'react-icons/ri'
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts'

import PageHeader    from '../../components/ui/PageHeader'
import Card          from '../../components/ui/Card'
import Button        from '../../components/ui/Button'
import {
  overallScore,
  getRating,
  categoryScores,
  atsChecklist,
  recommendations,
  categoryChartData,
  atsHistory,
} from '../../utils/mockATSData'

/* ─── Icon map for categories ──────────────────────────── */
const categoryIcons = {
  skill:   { Icon: RiCodeLine,      bg: 'bg-indigo-500/15', text: 'text-indigo-400'  },
  project: { Icon: RiFileTextLine,  bg: 'bg-blue-500/15',   text: 'text-blue-400'    },
  edu:     { Icon: RiBookOpenLine,  bg: 'bg-purple-500/15', text: 'text-purple-400'  },
  exp:     { Icon: RiBriefcaseLine, bg: 'bg-orange-500/15', text: 'text-orange-400'  },
  keyword: { Icon: RiKeyLine,       bg: 'bg-yellow-500/15', text: 'text-yellow-400'  },
}

const priorityConfig = {
  High:   'bg-red-500/15 text-red-400 border-red-500/25',
  Medium: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  Low:    'bg-gray-700/60 text-gray-400 border-gray-600/25',
}

/* ─── Circular ATS Score ───────────────────────────────── */
const CircularATS = ({ score }) => {
  const rating       = getRating(score)
  const radius       = 72
  const strokeW      = 10
  const norm         = radius - strokeW / 2
  const circumference = 2 * Math.PI * norm
  const offset       = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative inline-flex items-center justify-center">
        <svg width={radius * 2} height={radius * 2} className="-rotate-90">
          {/* Glow filter */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {/* Track */}
          <circle cx={radius} cy={radius} r={norm}
            fill="none" stroke="#1f2937" strokeWidth={strokeW} />
          {/* Progress */}
          <circle cx={radius} cy={radius} r={norm}
            fill="none"
            stroke={rating.color}
            strokeWidth={strokeW}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            filter="url(#glow)"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Centre */}
        <div className="absolute flex flex-col items-center leading-none">
          <span className="text-5xl font-extrabold text-gray-100">{score}</span>
          <span className="text-xs text-gray-500 font-medium mt-1 tracking-wide">/100</span>
        </div>
      </div>
      {/* Rating badge */}
      <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold ${rating.bg} ${rating.text}`}>
        <RiSparklingLine size={13} />
        {rating.label}
      </span>
    </div>
  )
}

/* ─── Score progress bar row ───────────────────────────── */
const ScoreBar = ({ label, score, icon }) => {
  const rating = getRating(score)
  const cfg    = categoryIcons[icon] ?? categoryIcons.skill
  const Icon   = cfg.Icon
  return (
    <div className="group flex items-center gap-4 py-3 hover:bg-gray-800/40 -mx-4 px-4 rounded-xl transition-colors duration-200">
      <div className={`w-9 h-9 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
        <Icon size={16} className={cfg.text} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          <span className={`text-xs font-bold ${rating.text}`}>{score}%</span>
        </div>
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${score}%`, background: rating.color, boxShadow: `0 0 8px ${rating.color}60` }}
          />
        </div>
      </div>
      <span className={`flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${rating.bg} ${rating.text}`}>
        {rating.label}
      </span>
    </div>
  )
}

/* ─── Custom chart tooltip ─────────────────────────────── */
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 shadow-2xl text-xs">
      <p className="text-gray-400 font-medium mb-1.5">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-semibold">
          {p.name}: {p.value}%
        </p>
      ))}
    </div>
  )
}

/* ─── Section title ────────────────────────────────────── */
const SectionTitle = ({ icon: Icon, iconCls, title, subtitle }) => (
  <div className="flex items-start gap-3 mb-5">
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${iconCls}`}>
      <Icon size={15} />
    </div>
    <div>
      <h2 className="text-base font-semibold text-gray-200">{title}</h2>
      {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  </div>
)

/* ══════════════════════════════════════════════════════════
   ATSScore Page
══════════════════════════════════════════════════════════ */
const ATSScore = () => {
  const overallRating = getRating(overallScore)
  const passedCount   = atsChecklist.filter((c) => c.passed).length
  const totalCount    = atsChecklist.length

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <PageHeader
        title="ATS Score Analysis"
        description="See how well your resume performs against Applicant Tracking Systems and get targeted improvement suggestions."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">
              <RiRefreshLine size={14} />
              Re-scan
            </Button>
            <Button size="sm">
              <RiDownloadLine size={14} />
              Export Report
            </Button>
          </div>
        }
      />

      {/* ── Row 1: Main score + breakdown + checklist ── */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Main ATS Score card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-900/80 border border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-5">
          <div>
            <h3 className="text-base font-semibold text-gray-200 mb-0.5">Overall ATS Score</h3>
            <p className="text-xs text-gray-500">Based on latest resume scan</p>
          </div>

          <CircularATS score={overallScore} />

          {/* Mini stat pills */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {[
              { label: 'Sections Found',  value: `${passedCount}/${totalCount}` },
              { label: 'Keywords Matched', value: '74%' },
              { label: 'Format Score',     value: '92%' },
              { label: 'Last Scanned',     value: 'Apr 3'  },
            ].map((s) => (
              <div key={s.label} className="bg-gray-800/60 rounded-xl px-3 py-2.5 text-center">
                <p className="text-sm font-bold text-gray-100">{s.value}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <SectionTitle
            icon={RiBarChartLine}
            iconCls="bg-indigo-500/15 text-indigo-400"
            title="Score Breakdown"
            subtitle="Individual section scores"
          />
          <div className="divide-y divide-gray-800/60">
            {categoryScores.map((cat) => (
              <ScoreBar key={cat.id} label={cat.label} score={cat.score} icon={cat.icon} />
            ))}
          </div>
        </div>

        {/* ATS Checklist */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <SectionTitle
            icon={RiCheckLine}
            iconCls="bg-green-500/15 text-green-400"
            title="ATS Checklist"
            subtitle={`${passedCount} of ${totalCount} items passing`}
          />

          {/* Progress bar */}
          <div className="mb-5">
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>Completion</span>
              <span className="font-semibold text-gray-300">{Math.round((passedCount / totalCount) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-700"
                style={{ width: `${(passedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>

          <ul className="space-y-2">
            {atsChecklist.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-gray-800/50 transition-colors"
              >
                <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center
                  ${item.passed
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/15 text-red-400'}`}>
                  {item.passed
                    ? <RiCheckLine size={11} />
                    : <RiCloseLine size={11} />}
                </span>
                <span className={`text-sm ${item.passed ? 'text-gray-300' : 'text-gray-500 line-through'}`}>
                  {item.label}
                </span>
                {!item.passed && (
                  <span className="ml-auto text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                    Missing
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Row 2: Charts ──────────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Category Comparison Bar Chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <SectionTitle
            icon={RiBarChartLine}
            iconCls="bg-blue-500/15 text-blue-400"
            title="ATS Category Comparison"
            subtitle="Your scores vs. industry benchmark"
          />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={categoryChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis
                dataKey="category"
                tick={{ fill: '#6b7280', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: '#6b7280', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: 11, color: '#9ca3af', paddingTop: '12px' }}
                iconType="square"
                iconSize={9}
              />
              <Bar dataKey="score"     name="Your Score" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="benchmark" name="Benchmark"  fill="#374151" radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Improvement Trend Line Chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <SectionTitle
            icon={RiArrowUpLine}
            iconCls="bg-green-500/15 text-green-400"
            title="ATS Improvement Trend"
            subtitle="Score progression across all scans"
          />
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={atsHistory} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: '#6b7280', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[40, 100]}
                tick={{ fill: '#6b7280', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} />
              <ReferenceLine y={85} stroke="#22c55e22" strokeDasharray="4 4" label={{ value: 'Excellent', fill: '#22c55e', fontSize: 10, position: 'right' }} />
              <Line
                type="monotone"
                dataKey="score"
                name="ATS Score"
                stroke="url(#trendGrad)"
                strokeWidth={3}
                dot={{ fill: '#6366f1', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#22c55e', strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Row 3: Recommendations ─────────────────────── */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <SectionTitle
          icon={RiLightbulbLine}
          iconCls="bg-yellow-500/15 text-yellow-400"
          title="Improvement Recommendations"
          subtitle="Actionable steps to raise your ATS score"
        />

        <div className="grid sm:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="group bg-gray-800/50 border border-gray-700/50 hover:border-gray-600 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 text-xs font-bold flex-shrink-0">
                    {rec.id}
                  </span>
                  <p className="text-sm font-semibold text-gray-200 leading-snug">{rec.title}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${priorityConfig[rec.priority]}`}>
                    {rec.priority}
                  </span>
                  <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                    {rec.impact}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{rec.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA banner ──────────────────────────────────── */}
      <div className="bg-gradient-to-r from-indigo-600/10 via-purple-600/8 to-indigo-600/10 border border-indigo-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/30">
          <RiSparklingLine size={18} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-200">
            Ready to push your score above 90?
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            Apply the recommendations above, re-upload your resume, and re-scan to see your new score.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Button variant="secondary" size="sm">
            <RiFileTextLine size={14} />
            Upload Resume
          </Button>
          <Button size="sm" className="shadow-md shadow-indigo-500/20">
            <RiRefreshLine size={14} />
            Re-scan Now
          </Button>
        </div>
      </div>

    </div>
  )
}

export default ATSScore
