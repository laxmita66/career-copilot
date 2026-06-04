import { useState } from 'react'
import {
  RiBuildingLine, RiCheckLine, RiCloseLine,
  RiStarFill, RiStarLine, RiArrowRightLine, RiArrowLeftLine,
  RiListCheck2, RiLightbulbLine, RiQuestionAnswerLine,
  RiBarChartLine, RiBookOpenLine,
} from 'react-icons/ri'
import { companies } from './mockPlacementData'

/* ── Difficulty stars ── */
const DiffStars = ({ value, max = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: max }).map((_, i) =>
      i < value
        ? <RiStarFill key={i} size={12} className="text-yellow-400" />
        : <RiStarLine key={i} size={12} className="text-gray-700" />
    )}
  </div>
)

/* ── Checklist item ── */
const CheckItem = ({ task, done: initDone }) => {
  const [done, setDone] = useState(initDone)
  return (
    <li className="flex items-center gap-2.5 py-2 cursor-pointer group" onClick={() => setDone(d => !d)}>
      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${done ? 'bg-green-500 border-green-500' : 'border-gray-600 group-hover:border-indigo-500'}`}>
        {done && <RiCheckLine size={10} className="text-white" />}
      </span>
      <span className={`text-xs transition-colors ${done ? 'line-through text-gray-600' : 'text-gray-400 group-hover:text-gray-300'}`}>{task}</span>
    </li>
  )
}

/* ── Company detail panel ── */
const CompanyDetail = ({ company, onBack }) => {
  const [tab, setTab] = useState('process')
  const tabs = [
    { id: 'process',   label: 'Process',    icon: RiListCheck2     },
    { id: 'technical', label: 'Topics',     icon: RiBookOpenLine   },
    { id: 'questions', label: 'Questions',  icon: RiQuestionAnswerLine },
    { id: 'aptitude',  label: 'Aptitude',   icon: RiBarChartLine   },
    { id: 'checklist', label: 'Checklist',  icon: RiCheckLine      },
  ]

  return (
    <div>
      {/* Back */}
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors mb-5">
        <RiArrowLeftLine size={15} /> All Companies
      </button>

      {/* Header */}
      <div className={`bg-gradient-to-br ${company.gradient} border ${company.border} rounded-2xl p-6 mb-6`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gray-900/60 border border-gray-700 flex items-center justify-center text-sm font-extrabold text-gray-200">
              {company.logo}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-gray-100">{company.name}</h2>
              <p className="text-sm text-gray-400">{company.fullName}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {company.roles.map(r => (
                  <span key={r} className="text-[10px] bg-gray-800/60 text-gray-400 px-2 py-0.5 rounded-full border border-gray-700">{r}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-gray-500 mb-1">Difficulty</p>
            <DiffStars value={company.difficulty} />
            <p className="text-xs text-green-400 font-semibold mt-2">{company.ctc}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 bg-gray-900 border border-gray-800 rounded-xl p-1 mb-6 overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${tab === t.id ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}`}>
            <t.icon size={13} />{t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'process' && (
        <div className="space-y-3">
          {company.hiringProcess.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-indigo-500/15 text-indigo-400 text-xs font-bold flex items-center justify-center flex-shrink-0">{i+1}</span>
              <p className="text-sm text-gray-300 pt-1 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'technical' && (
        <div className="grid sm:grid-cols-2 gap-2">
          {company.technicalTopics.map(t => (
            <div key={t} className="flex items-center gap-2.5 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
              <RiLightbulbLine size={14} className="text-yellow-400 flex-shrink-0" />
              <span className="text-sm text-gray-300">{t}</span>
            </div>
          ))}
        </div>
      )}

      {tab === 'questions' && (
        <div className="space-y-3">
          {company.commonQuestions.map((q, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 hover:border-gray-700 transition-colors">
              <span className="w-6 h-6 rounded-lg bg-orange-500/15 text-orange-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i+1}</span>
              <p className="text-sm text-gray-300 leading-relaxed">{q}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'aptitude' && (
        <div className="grid sm:grid-cols-2 gap-2">
          {company.aptitudeAreas.map(a => (
            <div key={a} className="flex items-center gap-2.5 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
              <RiBarChartLine size={14} className="text-indigo-400 flex-shrink-0" />
              <span className="text-sm text-gray-300">{a}</span>
            </div>
          ))}
        </div>
      )}

      {tab === 'checklist' && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-200">Preparation Checklist</p>
            <span className="text-xs text-gray-500">{company.checklist.filter(c=>c.done).length}/{company.checklist.length} done</span>
          </div>
          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-green-500 rounded-full transition-all duration-500"
              style={{ width: `${(company.checklist.filter(c=>c.done).length/company.checklist.length)*100}%` }} />
          </div>
          <ul className="divide-y divide-gray-800/60">
            {company.checklist.map((item, i) => <CheckItem key={i} task={item.task} done={item.done} />)}
          </ul>
        </div>
      )}
    </div>
  )
}

/* ── Company grid ── */
const CompanyHub = () => {
  const [selected, setSelected] = useState(null)

  if (selected) return <CompanyDetail company={selected} onBack={() => setSelected(null)} />

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <RiBuildingLine size={18} className="text-purple-400" />
        <h2 className="text-base font-bold text-gray-200">Company Preparation Hub</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map(c => (
          <button key={c.id} onClick={() => setSelected(c)} className={`text-left bg-gradient-to-br ${c.gradient} border ${c.border} rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 transition-all duration-200 group`}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gray-900/60 border border-gray-700/50 flex items-center justify-center text-sm font-extrabold text-gray-200">
                {c.logo}
              </div>
              <div className="text-right">
                <DiffStars value={c.difficulty} />
                <p className="text-[10px] text-green-400 font-semibold mt-1">{c.ctc}</p>
              </div>
            </div>
            <p className="text-base font-bold text-gray-200 mb-0.5">{c.name}</p>
            <p className="text-xs text-gray-500 mb-3">{c.fullName}</p>
            <div className="flex flex-wrap gap-1">
              {c.roles.slice(0,2).map(r => (
                <span key={r} className="text-[9px] bg-gray-800/60 text-gray-400 px-2 py-0.5 rounded-full">{r}</span>
              ))}
            </div>
            <div className="flex items-center gap-1 mt-4 text-xs text-indigo-400 font-medium group-hover:gap-2 transition-all">
              View Prep Guide <RiArrowRightLine size={12} />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CompanyHub
