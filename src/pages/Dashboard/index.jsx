import { Link } from 'react-router-dom'
import {
  RiFileTextLine,
  RiSearchEyeLine,
  RiBarChartLine,
  RiQuestionAnswerLine,
  RiLightbulbLine,
  RiArrowRightLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiCheckLine,
  RiAlertLine,
  RiUploadCloud2Line,
  RiTimeLine,
} from 'react-icons/ri'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts'

import PageHeader from '../../components/ui/PageHeader'
import {
  statsData,
  atsTrendData,
  skillProgressData,
  readinessPieData,
  recentActivity,
  readinessSummary,
} from './mockData'

/* ─── Stat icon map ──────────────────────────────────── */
const statIcons = {
  ats: RiBarChartLine,
  match: RiSearchEyeLine,
  analyses: RiFileTextLine,
  questions: RiQuestionAnswerLine,
}

const statGradients = {
  ats:       { from: 'from-green-500/20',   to: 'to-emerald-500/5',  icon: 'bg-green-500/15',   text: 'text-green-400'   },
  match:     { from: 'from-indigo-500/20',  to: 'to-indigo-500/5',   icon: 'bg-indigo-500/15',  text: 'text-indigo-400'  },
  analyses:  { from: 'from-blue-500/20',    to: 'to-blue-500/5',     icon: 'bg-blue-500/15',    text: 'text-blue-400'    },
  questions: { from: 'from-orange-500/20',  to: 'to-orange-500/5',   icon: 'bg-orange-500/15',  text: 'text-orange-400'  },
}

/* ─── Activity icon map ──────────────────────────────── */
const activityConfig = {
  file:      { icon: RiFileTextLine,     bg: 'bg-blue-500/15',    text: 'text-blue-400'    },
  chart:     { icon: RiBarChartLine,     bg: 'bg-green-500/15',   text: 'text-green-400'   },
  question:  { icon: RiQuestionAnswerLine, bg: 'bg-orange-500/15', text: 'text-orange-400'  },
  lightbulb: { icon: RiLightbulbLine,    bg: 'bg-yellow-500/15',  text: 'text-yellow-400'  },
  search:    { icon: RiSearchEyeLine,    bg: 'bg-violet-500/15',  text: 'text-violet-400'  },
}

/* ─── Quick actions ──────────────────────────────────── */
const quickActions = [
  { label: 'Resume Upload',       icon: RiUploadCloud2Line,    to: '/resume-upload',       bg: 'bg-blue-500/10',   text: 'text-blue-400',   border: 'hover:border-blue-500/40'   },
  { label: 'ATS Score',           icon: RiBarChartLine,        to: '/ats-score',           bg: 'bg-green-500/10',  text: 'text-green-400',  border: 'hover:border-green-500/40'  },
  { label: 'JD Analyzer',         icon: RiSearchEyeLine,       to: '/jd-analyzer',         bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'hover:border-violet-500/40' },
  { label: 'Interview Generator', icon: RiQuestionAnswerLine,  to: '/interview-generator', bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'hover:border-orange-500/40' },
  { label: 'Skill Gap Analysis',  icon: RiLightbulbLine,       to: '/skill-gap',           bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'hover:border-yellow-500/40' },
]

/* ─── Custom chart tooltip ───────────────────────────── */
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 shadow-2xl text-sm">
      <p className="text-gray-400 mb-1.5 font-medium">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-semibold">
          {p.name}: {p.value}{typeof p.value === 'number' && p.name !== 'Target' ? '%' : p.name === 'Target' ? '%' : ''}
        </p>
      ))}
    </div>
  )
}

/* ─── Custom pie label ───────────────────────────────── */
const PieCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  if (percent < 0.1) return null
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

/* ─── Section heading ────────────────────────────────── */
const SectionTitle = ({ children }) => (
  <h2 className="text-base font-semibold text-gray-200 mb-4">{children}</h2>
)

/* ══════════════════════════════════════════════════════
   Dashboard Component
══════════════════════════════════════════════════════ */
const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's your career readiness snapshot."
      />

      {/* ── Stats Row ─────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {statsData.map((stat) => {
          const Icon = statIcons[stat.id]
          const g = statGradients[stat.id]
          return (
            <div
              key={stat.id}
              className={`relative bg-gradient-to-br ${g.from} ${g.to} border border-gray-800 rounded-2xl p-5 overflow-hidden group hover:border-gray-700 hover:-translate-y-0.5 transition-all duration-200`}
            >
              {/* Subtle glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/[0.02] rounded-2xl" />
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${g.icon} flex items-center justify-center`}>
                  <Icon size={20} className={g.text} />
                </div>
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${stat.trend === 'up' ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
                  {stat.trend === 'up' ? <RiArrowUpLine size={12} /> : <RiArrowDownLine size={12} />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-extrabold text-gray-100 mb-0.5">{stat.value}</p>
              <p className="text-sm font-medium text-gray-300">{stat.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.sub}</p>
            </div>
          )
        })}
      </div>

      {/* ── Charts Row ────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* ATS Trend – Line chart (spans 2 cols) */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <SectionTitle>ATS Score Trend</SectionTitle>
          <p className="text-xs text-gray-500 -mt-3 mb-5">Your ATS score over the last 8 weeks</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={atsTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="atsLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[40, 100]} tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Line
                type="monotone"
                dataKey="score"
                name="ATS Score"
                stroke="url(#atsLine)"
                strokeWidth={3}
                dot={{ fill: '#6366f1', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#a855f7', strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Readiness Pie chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <SectionTitle>Readiness Distribution</SectionTitle>
          <p className="text-xs text-gray-500 -mt-3 mb-4">Placement score breakdown</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={readinessPieData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
                labelLine={false}
                label={PieCustomLabel}
              >
                {readinessPieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}%`, name]}
                contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: '12px', fontSize: 12 }}
                itemStyle={{ color: '#d1d5db' }}
                labelStyle={{ color: '#9ca3af' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <ul className="space-y-2 mt-2">
            {readinessPieData.map((d) => (
              <li key={d.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-gray-400">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.color }} />
                  {d.name}
                </span>
                <span className="font-semibold text-gray-300">{d.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Skill Progress Bar Chart ──────────────── */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <SectionTitle>Skill Progress</SectionTitle>
        <p className="text-xs text-gray-500 -mt-3 mb-5">Current level vs. target for your goal role</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={skillProgressData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis dataKey="skill" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12, color: '#9ca3af', paddingTop: '12px' }}
              iconType="square"
              iconSize={10}
            />
            <Bar dataKey="current" name="Current" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={32} />
            <Bar dataKey="target"  name="Target"  fill="#374151" radius={[4, 4, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Readiness + Activity Row ──────────────── */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Placement Readiness Summary */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <SectionTitle>Placement Readiness Summary</SectionTitle>

          {/* Overall % */}
          <div className="flex items-end justify-between mb-2">
            <span className="text-4xl font-extrabold text-gray-100">{readinessSummary.overall}%</span>
            <span className="text-sm text-green-400 font-semibold mb-1">On Track</span>
          </div>
          <p className="text-xs text-gray-500 mb-3">Overall placement readiness score</p>

          {/* Progress bar */}
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden mb-6">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
              style={{ width: `${readinessSummary.overall}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Strengths */}
            <div>
              <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <RiCheckLine size={13} /> Strengths
              </p>
              <ul className="space-y-2">
                {readinessSummary.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-green-500/15 flex items-center justify-center">
                      <RiCheckLine size={9} className="text-green-400" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas to improve */}
            <div>
              <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <RiAlertLine size={13} /> To Improve
              </p>
              <ul className="space-y-2">
                {readinessSummary.improvements.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-orange-500/15 flex items-center justify-center">
                      <RiAlertLine size={9} className="text-orange-400" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <SectionTitle>Recent Activity</SectionTitle>
          <ul className="space-y-1">
            {recentActivity.map((item, idx) => {
              const cfg = activityConfig[item.icon]
              const Icon = cfg.icon
              return (
                <li key={item.id}>
                  <div className="flex items-start gap-3 py-3 group">
                    <div className={`w-9 h-9 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon size={16} className={cfg.text} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-200 group-hover:text-gray-100 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{item.detail}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0 text-xs text-gray-600 mt-0.5">
                      <RiTimeLine size={12} />
                      {item.time}
                    </div>
                  </div>
                  {idx < recentActivity.length - 1 && (
                    <div className="border-b border-gray-800/60 ml-12" />
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* ── Quick Actions ─────────────────────────── */}
      <div>
        <SectionTitle>Quick Actions</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link to={action.to} key={action.to}>
                <div className={`group bg-gray-900 border border-gray-800 ${action.border} rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20 transition-all duration-200 cursor-pointer`}>
                  <div className={`w-12 h-12 rounded-xl ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon size={22} className={action.text} />
                  </div>
                  <span className="text-xs font-semibold text-gray-300 group-hover:text-gray-100 transition-colors leading-tight">
                    {action.label}
                  </span>
                  <RiArrowRightLine size={14} className="text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default Dashboard
