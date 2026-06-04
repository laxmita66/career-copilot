import { useState } from 'react'
import {
  RiAddLine, RiBriefcaseLine, RiTimeLine, RiMoneyDollarCircleLine,
  RiDeleteBin6Line, RiStickyNoteLine, RiCheckLine,
} from 'react-icons/ri'
import { applications as initialApps, STATUSES, STATUS_CONFIG } from './mockPlacementData'
import Button from '../../components/ui/Button'

/* ── Status counter pills ── */
const CounterPills = ({ apps }) => (
  <div className="flex flex-wrap gap-2 mb-6">
    {STATUSES.map((s) => {
      const cfg   = STATUS_CONFIG[s]
      const count = apps.filter((a) => a.status === s).length
      return (
        <span key={s} className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
          <span className="font-bold text-base leading-none">{count}</span> {s}
        </span>
      )
    })}
  </div>
)

/* ── Application card ── */
const AppCard = ({ app, onDelete }) => {
  const cfg = STATUS_CONFIG[app.status]
  return (
    <div className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-xl p-4 transition-all duration-150 hover:shadow-md hover:shadow-black/20 group">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400 flex-shrink-0">
            {app.company.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-200 leading-tight">{app.company}</p>
            <p className="text-xs text-gray-500">{app.role}</p>
          </div>
        </div>
        <button onClick={() => onDelete(app.id)}
          className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0">
          <RiDeleteBin6Line size={13} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2 text-[10px] text-gray-500">
        <span className="flex items-center gap-1"><RiTimeLine size={10} />{app.date}</span>
        {app.ctc && <span className="flex items-center gap-1"><RiMoneyDollarCircleLine size={10} />{app.ctc}</span>}
      </div>
      {app.notes && (
        <p className="mt-2 text-[11px] text-gray-500 flex items-start gap-1">
          <RiStickyNoteLine size={11} className="flex-shrink-0 mt-0.5" />{app.notes}
        </p>
      )}
    </div>
  )
}

/* ── Add application modal ── */
const AddModal = ({ onAdd, onClose }) => {
  const [form, setForm] = useState({ company: '', role: '', ctc: '', notes: '', status: 'Applied' })
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }))
  const handleSubmit = () => {
    if (!form.company || !form.role) return
    onAdd({ ...form, id: Date.now(), date: new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) })
    onClose()
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md shadow-2xl p-6">
        <h3 className="text-base font-bold text-gray-200 mb-5">Add Application</h3>
        <div className="space-y-3">
          {[['company','Company Name','Google'],['role','Role','Software Engineer'],['ctc','CTC (optional)','₹30 LPA']].map(([k,l,ph]) => (
            <div key={k}>
              <label className="block text-xs text-gray-400 mb-1">{l}</label>
              <input value={form[k]} onChange={e=>set(k,e.target.value)} placeholder={ph}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500" />
            </div>
          ))}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Initial Status</label>
            <select value={form.status} onChange={e=>set('status',e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Notes</label>
            <input value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="Any notes..."
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500" />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-5">
          <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={handleSubmit}><RiCheckLine size={14}/>Add</Button>
        </div>
      </div>
    </div>
  )
}

/* ── Main Component ── */
const ApplicationTracker = () => {
  const [apps, setApps]       = useState(initialApps)
  const [showAdd, setShowAdd] = useState(false)

  const handleDelete = (id) => setApps(a => a.filter(x => x.id !== id))
  const handleAdd    = (app) => setApps(a => [app, ...a])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <RiBriefcaseLine size={18} className="text-indigo-400" />
          <h2 className="text-base font-bold text-gray-200">Application Tracker</h2>
          <span className="text-xs bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full">{apps.length} total</span>
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)} className="shadow-sm shadow-indigo-500/20">
          <RiAddLine size={15} />Add Application
        </Button>
      </div>

      <CounterPills apps={apps} />

      {/* Kanban board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 overflow-x-auto pb-2">
        {STATUSES.map((status) => {
          const cfg  = STATUS_CONFIG[status]
          const cols = apps.filter(a => a.status === status)
          return (
            <div key={status} className={`bg-gray-900/50 border ${cfg.border} rounded-2xl p-3 min-w-[200px]`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[11px] font-bold uppercase tracking-wider ${cfg.text}`}>{status}</span>
                <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${cfg.bg} ${cfg.text}`}>{cols.length}</span>
              </div>
              <div className="space-y-2 min-h-[80px]">
                {cols.map(app => (
                  <AppCard key={app.id} app={app} onDelete={handleDelete} />
                ))}
                {cols.length === 0 && (
                  <p className="text-center text-xs text-gray-700 py-6">No applications</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Timeline */}
      <div className="mt-8">
        <h3 className="text-sm font-bold text-gray-300 mb-4">Application Timeline</h3>
        <div className="space-y-3">
          {[...apps].sort((a,b) => new Date(b.date)-new Date(a.date)).slice(0,6).map((app, i) => {
            const cfg = STATUS_CONFIG[app.status]
            return (
              <div key={app.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${cfg.bg} border-2 ${cfg.border}`} />
                  {i < 5 && <div className="w-px flex-1 bg-gray-800 mt-1 min-h-[24px]" />}
                </div>
                <div className="flex-1 flex items-center justify-between pb-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-200">{app.company} — {app.role}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><RiTimeLine size={10}/>{app.date}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ml-3 ${cfg.bg} ${cfg.text} ${cfg.border}`}>{app.status}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {showAdd && <AddModal onAdd={handleAdd} onClose={() => setShowAdd(false)} />}
    </div>
  )
}

export default ApplicationTracker
