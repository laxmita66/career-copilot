import { useState } from 'react'
import {
  RiMapPinLine, RiCheckLine, RiCloseLine, RiTimeLine,
  RiMoneyDollarCircleLine, RiLightbulbLine, RiChatQuoteLine,
  RiArrowDownLine, RiArrowUpLine, RiBarChartLine, RiTrophyLine,
  RiAlertLine, RiArrowRightLine,
} from 'react-icons/ri'
import PageHeader from '../../components/ui/PageHeader'
import { journeyEntries, journeyAnalytics } from '../PlacementTracker/mockPlacementData'

/* ── Type config ── */
const typeConfig = {
  offer:    { bg: 'bg-green-500/15', border: 'border-green-500/25', dot: 'bg-green-500',    label: '🏆 Offer Received' },
  ongoing:  { bg: 'bg-indigo-500/15', border:'border-indigo-500/25', dot: 'bg-indigo-500',  label: '⏳ In Progress'    },
  rejected: { bg: 'bg-red-500/15',   border: 'border-red-500/25',   dot: 'bg-red-500',     label: '❌ Rejected'       },
}

/* ── Round pill ── */
const RoundPill = ({ name, result }) => {
  const passed = result === 'Cleared' || result === 'Selected'
  const sched  = result === 'Scheduled'
  const cls = passed ? 'bg-green-500/15 text-green-400 border-green-500/20'
              : sched ? 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20'
              : 'bg-red-500/15 text-red-400 border-red-500/20'
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${cls} text-xs font-semibold`}>
      {passed ? <RiCheckLine size={11}/> : sched ? <RiTimeLine size={11}/> : <RiCloseLine size={11}/>}
      <span>{name}</span>
      <span className="text-[10px] opacity-70">— {result}</span>
    </div>
  )
}

/* ── Journey card ── */
const JourneyCard = ({ entry }) => {
  const [open, setOpen] = useState(entry.type === 'offer')
  const cfg = typeConfig[entry.type]

  return (
    <div className={`bg-gray-900 border ${cfg.border} rounded-2xl overflow-hidden transition-all duration-200`}>
      <button className="w-full text-left p-5 focus:outline-none" onClick={() => setOpen(v => !v)}>
        <div className="flex items-start gap-4">
          <div className="text-2xl flex-shrink-0 mt-0.5">{entry.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-base font-bold text-gray-200">{entry.company}</span>
              <span className="text-xs text-gray-500">·</span>
              <span className="text-sm text-gray-400">{entry.role}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ml-auto flex-shrink-0 ${cfg.bg} ${cfg.border}`}>
                {cfg.label}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 text-[11px] text-gray-500">
              <span className="flex items-center gap-1"><RiTimeLine size={10}/>{entry.date}</span>
              <span className="flex items-center gap-1"><RiMoneyDollarCircleLine size={10}/>{entry.ctc}</span>
              <span className="flex items-center gap-1"><RiMapPinLine size={10}/>{entry.category}</span>
              <span className="flex items-center gap-1">{entry.rounds.length} round{entry.rounds.length > 1 ? 's' : ''}</span>
            </div>
          </div>
          <div className={`transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}>
            <RiArrowDownLine size={16} className="text-gray-600" />
          </div>
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-800 px-5 pb-5 pt-4 space-y-5">
          {/* Rounds */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Interview Rounds</p>
            <div className="flex flex-wrap gap-2">
              {entry.rounds.map((r, i) => <RoundPill key={i} name={r.name} result={r.result} />)}
            </div>
          </div>

          {/* Feedback */}
          {entry.feedback && (
            <div className="bg-gray-800/60 rounded-xl p-4">
              <p className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 mb-2">
                <RiChatQuoteLine size={12}/>Interviewer Feedback
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">{entry.feedback}</p>
            </div>
          )}

          {/* Lesson */}
          {entry.lesson && (
            <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-xl p-4">
              <p className="text-xs font-bold text-yellow-400 flex items-center gap-1.5 mb-2">
                <RiLightbulbLine size={12}/>Lesson Learned
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">{entry.lesson}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ── Analytics row ── */
const AnalyticsRow = () => {
  const a = journeyAnalytics
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {[
        { icon: RiTrophyLine,   color: 'text-green-400',  bg: 'bg-green-500/15',  label: 'Success Rate',          value: `${a.successRate}%` },
        { icon: RiAlertLine,    color: 'text-red-400',    bg: 'bg-red-500/15',    label: 'Most Common Rejection', value: a.mostCommonRejection },
        { icon: RiBarChartLine, color: 'text-indigo-400', bg: 'bg-indigo-500/15', label: 'Strongest Category',    value: a.strongestCategory },
        { icon: RiCheckLine,    color: 'text-yellow-400', bg: 'bg-yellow-500/15', label: 'Avg Rounds to Offer',   value: a.avgRoundsBeforeOffer },
        { icon: RiMapPinLine,   color: 'text-purple-400', bg: 'bg-purple-500/15', label: 'Companies Applied',     value: a.totalCompanies },
        { icon: RiMoneyDollarCircleLine, color:'text-emerald-400', bg:'bg-emerald-500/15', label:'Offers Received', value: a.offersReceived },
      ].map(s => (
        <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
            <s.icon size={18} className={s.color}/>
          </div>
          <div>
            <p className="text-xl font-extrabold text-gray-100">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Main page ── */
const PlacementJourney = () => {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? journeyEntries : journeyEntries.filter(e => e.type === filter)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader
        title="Placement Journey"
        description="Your complete placement story — every application, round, feedback, and lesson in one timeline."
      />

      {/* Analytics */}
      <div>
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <RiBarChartLine size={14}/>Journey Analytics
        </h2>
        <AnalyticsRow />
      </div>

      {/* Filter + Timeline */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <RiTimeLine size={14}/>Application Timeline
          </h2>
          {/* Filter pills */}
          <div className="flex gap-1.5 bg-gray-900 border border-gray-800 rounded-xl p-1">
            {[['all','All'],['offer','Offers'],['ongoing','Ongoing'],['rejected','Rejected']].map(([v,l]) => (
              <button key={v} onClick={() => setFilter(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === v ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-6 bottom-6 w-px bg-gray-800 hidden sm:block" />
          <div className="space-y-6 sm:pl-14">
            {filtered.map((entry, i) => {
              const cfg = typeConfig[entry.type]
              return (
                <div key={entry.id} className="relative">
                  {/* Timeline dot */}
                  <div className={`hidden sm:flex absolute -left-9 top-5 w-4 h-4 rounded-full ${cfg.dot} shadow-lg ring-4 ring-gray-950 items-center justify-center`} />
                  <JourneyCard entry={entry} />
                </div>
              )
            })}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-600 text-sm">No entries match this filter.</div>
        )}
      </div>

      {/* Tips banner — clicking scrolls back to timeline top */}
      <div
        className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-2xl p-5 flex items-start gap-4 cursor-pointer hover:border-indigo-500/40 transition-colors"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
          <RiLightbulbLine size={17} className="text-indigo-400"/>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-200 mb-1">Keep documenting your journey</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Students who review their interview feedback and lessons learned are <span className="text-indigo-400 font-semibold">3× more likely</span> to clear subsequent rounds. Every rejection is data.
          </p>
        </div>
        <RiArrowRightLine size={16} className="text-indigo-400 flex-shrink-0 mt-1" />
      </div>
    </div>
  )
}

export default PlacementJourney
