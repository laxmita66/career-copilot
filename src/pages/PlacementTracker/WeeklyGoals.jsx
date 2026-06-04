import { useState } from 'react'
import {
  RiCalendarLine, RiAddLine, RiSubtractLine,
  RiTrophyLine, RiLockLine,
} from 'react-icons/ri'
import { defaultGoals, badges } from './mockPlacementData'

const goalColors = {
  resumesSent:     { bar: 'from-indigo-500 to-indigo-400', icon: '📄' },
  dsaSolved:       { bar: 'from-yellow-500 to-yellow-400', icon: '💡' },
  mockInterviews:  { bar: 'from-purple-500 to-purple-400', icon: '🎤' },
  companiesApplied:{ bar: 'from-green-500 to-green-400',   icon: '🏢' },
}

const GoalCard = ({ id, goal, onIncrement, onDecrement }) => {
  const cfg = goalColors[id]
  const pct = Math.min(Math.round((goal.current / goal.target) * 100), 100)
  const done = goal.current >= goal.target
  return (
    <div className={`bg-gray-900 border ${done ? 'border-green-500/30' : 'border-gray-800'} rounded-2xl p-5 transition-all duration-200`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-2xl">{cfg.icon}</span>
          <p className="text-sm font-bold text-gray-200 mt-1">{goal.label}</p>
          <p className="text-xs text-gray-500">Target: {goal.target} {goal.unit}</p>
        </div>
        {done && <span className="text-xs bg-green-500/15 text-green-400 border border-green-500/25 px-2 py-0.5 rounded-full font-bold">✅ Done!</span>}
      </div>

      <div className="flex items-end gap-2 mb-3">
        <span className="text-3xl font-extrabold text-gray-100">{goal.current}</span>
        <span className="text-base text-gray-500 mb-1">/ {goal.target}</span>
      </div>

      <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden mb-3">
        <div className={`h-full rounded-full bg-gradient-to-r ${cfg.bar} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-gray-500 mb-4">{pct}% complete</p>

      <div className="flex gap-2">
        <button onClick={() => onDecrement(id)} className="flex-1 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-200 transition-colors flex items-center justify-center">
          <RiSubtractLine size={16} />
        </button>
        <button onClick={() => onIncrement(id)} className="flex-1 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center justify-center gap-1 text-xs font-medium">
          <RiAddLine size={14} />Log one
        </button>
      </div>
    </div>
  )
}

const WeeklyGoals = () => {
  const [goals, setGoals] = useState(defaultGoals)

  const increment = (id) => setGoals(g => ({ ...g, [id]: { ...g[id], current: Math.min(g[id].current + 1, g[id].target + 5) } }))
  const decrement = (id) => setGoals(g => ({ ...g, [id]: { ...g[id], current: Math.max(g[id].current - 1, 0) } }))

  const totalPct = Math.round(
    Object.values(goals).reduce((sum, g) => sum + Math.min(g.current / g.target, 1), 0) /
    Object.keys(goals).length * 100
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <RiCalendarLine size={18} className="text-green-400" />
          <h2 className="text-base font-bold text-gray-200">Weekly Placement Goals</h2>
        </div>
        <span className="text-sm font-bold text-gray-300">{totalPct}% complete</span>
      </div>

      {/* Overall progress */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-gray-300">This Week's Progress</p>
          <p className="text-xs text-gray-500">Week of Apr 1 – Apr 7, 2024</p>
        </div>
        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-green-500 transition-all duration-700" style={{ width: `${totalPct}%` }} />
        </div>
        <p className="text-xs text-gray-600 mt-1.5">{totalPct}% of weekly goals achieved</p>
      </div>

      {/* Goal cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {Object.entries(goals).map(([id, goal]) => (
          <GoalCard key={id} id={id} goal={goal} onIncrement={increment} onDecrement={decrement} />
        ))}
      </div>

      {/* Achievement badges */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <RiTrophyLine size={16} className="text-yellow-400" />
          <h3 className="text-sm font-bold text-gray-300">Achievement Badges</h3>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {badges.map(b => (
            <div key={b.id} className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-center transition-all ${b.unlocked ? 'bg-gray-900 border-yellow-500/20 hover:border-yellow-500/40' : 'bg-gray-900/40 border-gray-800 opacity-50'}`}>
              <span className="text-2xl">{b.icon}</span>
              <p className="text-[10px] font-semibold text-gray-400 leading-tight">{b.label}</p>
              {!b.unlocked && <RiLockLine size={11} className="text-gray-600" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeeklyGoals
