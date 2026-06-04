import { useState } from 'react'
import { RiSparklingLine, RiCheckLine, RiAlertLine, RiArrowUpLine } from 'react-icons/ri'
import { defaultReadinessInputs, calcReadiness, labelMap, readinessBadge } from './mockPlacementData'

/* ── Gauge SVG ── */
const Gauge = ({ score }) => {
  const R = 70, SW = 12
  const norm = R - SW / 2
  const arc  = Math.PI * norm          // half-circle arc
  const fill = (score / 100) * arc
  const color = score >= 85 ? '#22c55e' : score >= 70 ? '#6366f1' : score >= 55 ? '#f97316' : '#ef4444'
  const sx = R - norm, ex = R * 2 - norm
  const sy = R, ey = R

  return (
    <div className="flex flex-col items-center">
      <svg width={R * 2} height={R + 16} className="overflow-visible">
        <defs>
          <filter id="glow2"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {/* Track */}
        <path d={`M ${sx} ${sy} A ${norm} ${norm} 0 0 1 ${ex} ${ey}`}
          fill="none" stroke="#1f2937" strokeWidth={SW} strokeLinecap="round" />
        {/* Fill */}
        <path d={`M ${sx} ${sy} A ${norm} ${norm} 0 0 1 ${ex} ${ey}`}
          fill="none" stroke={color} strokeWidth={SW} strokeLinecap="round"
          strokeDasharray={`${fill} ${arc}`}
          style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
        />
        {/* Needle dot */}
        <circle cx={R} cy={sy - norm + SW / 2} r="5" fill={color} />
      </svg>
      <div className="-mt-4 text-center">
        <p className="text-4xl font-extrabold text-gray-100">{score}</p>
        <p className="text-xs text-gray-500">/ 100</p>
      </div>
    </div>
  )
}

/* ── Slider row ── */
const SliderRow = ({ label, value, onChange }) => (
  <div>
    <div className="flex justify-between mb-1.5">
      <span className="text-sm font-medium text-gray-300">{label}</span>
      <span className="text-sm font-bold text-indigo-400">{value}%</span>
    </div>
    <input type="range" min={0} max={100} value={value} onChange={e => onChange(Number(e.target.value))}
      className="w-full h-2 rounded-full appearance-none cursor-pointer accent-indigo-500 bg-gray-800" />
  </div>
)

const ReadinessPredictor = () => {
  const [inputs, setInputs] = useState({ ...defaultReadinessInputs })
  const result = calcReadiness(inputs)
  const badge  = readinessBadge(result.score)
  const set = (k) => (v) => setInputs(p => ({ ...p, [k]: v }))

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <RiSparklingLine size={18} className="text-yellow-400" />
        <h2 className="text-base font-bold text-gray-200">Placement Readiness Predictor</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-4">Adjust your scores</h3>
            {Object.entries(labelMap).map(([k, label]) => (
              <div key={k} className="mb-4 last:mb-0">
                <SliderRow label={label} value={inputs[k]} onChange={set(k)} />
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col items-center text-center gap-4">
          <Gauge score={result.score} />

          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${badge.cls}`}>
            {badge.label}
          </span>

          {/* Score bars */}
          <div className="w-full space-y-2 mt-2">
            {Object.entries(inputs).map(([k, v]) => {
              const color = v >= 75 ? '#22c55e' : v >= 55 ? '#6366f1' : '#f97316'
              return (
                <div key={k} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-28 text-right">{labelMap[k]}</span>
                  <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${v}%`, background: color }} />
                  </div>
                  <span className="text-xs font-bold text-gray-300 w-8 text-right">{v}%</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Strengths / Weaknesses / Actions */}
      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <p className="text-xs font-bold text-green-400 uppercase tracking-wider flex items-center gap-1.5 mb-3"><RiCheckLine size={12}/>Strengths</p>
          {result.strengths.length ? result.strengths.map(s => (
            <p key={s} className="text-xs text-gray-400 flex items-center gap-2 mb-1.5">
              <span className="w-4 h-4 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0"><RiCheckLine size={9} className="text-green-400"/></span>{s}
            </p>
          )) : <p className="text-xs text-gray-600">Keep improving!</p>}
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <p className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5 mb-3"><RiAlertLine size={12}/>Weaknesses</p>
          {result.weaknesses.length ? result.weaknesses.map(w => (
            <p key={w} className="text-xs text-gray-400 flex items-center gap-2 mb-1.5">
              <span className="w-4 h-4 rounded-full bg-red-500/15 flex items-center justify-center flex-shrink-0"><RiAlertLine size={9} className="text-red-400"/></span>{w}
            </p>
          )) : <p className="text-xs text-gray-600">No major gaps!</p>}
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5 mb-3"><RiArrowUpLine size={12}/>Recommended Actions</p>
          {result.actions.map((a, i) => (
            <p key={i} className="text-xs text-gray-400 flex items-center gap-2 mb-1.5">
              <span className="w-4 h-4 rounded-full bg-indigo-500/15 flex items-center justify-center flex-shrink-0 text-[9px] font-bold text-indigo-400">{i+1}</span>{a}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReadinessPredictor
