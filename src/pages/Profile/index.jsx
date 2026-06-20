import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  RiUser3Line, RiMailLine, RiPhoneLine, RiMapPinLine,
  RiBriefcaseLine, RiEditLine, RiCheckLine, RiCloseLine,
  RiUploadCloud2Line, RiFileTextLine, RiSearchEyeLine,
  RiLightbulbLine, RiQuestionAnswerLine, RiBarChartLine,
  RiArrowUpLine, RiArrowDownLine, RiLockLine, RiBellLine,
  RiMoonLine, RiShieldCheckLine, RiTimeLine, RiLogoutBoxLine,
  RiGithubFill, RiLinkedinBoxFill, RiBookOpenLine,
  RiDeleteBin6Line, RiAlertLine, RiSparklingLine,
} from 'react-icons/ri'
import PageHeader from '../../components/ui/PageHeader'
import Button     from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'
import {
  userProfile, placementStats, atsHistory,
  resumeHistory as initialResumeHistory,
  analysisHistory, defaultSettings, securityInfo,
} from './mockProfileData'

/* ─── helpers ─── */
const inputCls = 'w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors'

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

const Toggle = ({ checked, onChange, label, sub }) => (
  <div className="flex items-center justify-between py-3.5 border-b border-gray-800 last:border-0">
    <div>
      <p className="text-sm font-medium text-gray-300">{label}</p>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
    <button
      type="button" role="switch" aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-950 flex-shrink-0 ${checked ? 'bg-indigo-600' : 'bg-gray-700'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  </div>
)

const Sparkline = ({ data }) => {
  const max = Math.max(...data), min = Math.min(...data)
  const w = 80, h = 28, pad = 2
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2)
    const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={pts} fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => {
        const x = pad + (i / (data.length - 1)) * (w - pad * 2)
        const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2)
        return i === data.length - 1 ? <circle key={i} cx={x} cy={y} r="3" fill="#6366f1" /> : null
      })}
    </svg>
  )
}

const analysisIconCfg = {
  jd:        { Icon: RiSearchEyeLine,      bg: 'bg-violet-500/15', text: 'text-violet-400' },
  ats:       { Icon: RiBarChartLine,       bg: 'bg-green-500/15',  text: 'text-green-400'  },
  skill:     { Icon: RiLightbulbLine,      bg: 'bg-yellow-500/15', text: 'text-yellow-400' },
  interview: { Icon: RiQuestionAnswerLine, bg: 'bg-orange-500/15', text: 'text-orange-400' },
}

const resumeStatusCfg = {
  Active:   'bg-green-500/15 text-green-400 border-green-500/20',
  Archived: 'bg-gray-700/60 text-gray-400 border-gray-600/30',
}

const atsColor = (s) => s >= 85 ? 'text-green-400' : s >= 70 ? 'text-indigo-400' : s >= 50 ? 'text-orange-400' : 'text-red-400'

/* ─── Edit Modal ─── */
const EditModal = ({ data, onSave, onClose }) => {
  const [form, setForm] = useState({ ...data })
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }))
  const fields = [
    { key: 'firstName', label: 'First Name', type: 'text' },
    { key: 'lastName',  label: 'Last Name',  type: 'text' },
    { key: 'email',     label: 'Email',      type: 'email' },
    { key: 'phone',     label: 'Phone',      type: 'tel' },
    { key: 'college',   label: 'College',    type: 'text' },
    { key: 'degree',    label: 'Degree',     type: 'text' },
    { key: 'graduationYear', label: 'Graduation Year', type: 'text' },
    { key: 'targetRole', label: 'Target Role', type: 'text' },
    { key: 'location',  label: 'Location',   type: 'text' },
    { key: 'linkedin',  label: 'LinkedIn',   type: 'text' },
    { key: 'github',    label: 'GitHub',     type: 'text' },
  ]
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center">
              <RiEditLine size={15} className="text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-200">Edit Profile</h3>
              <p className="text-xs text-gray-500">Update your personal information</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors">
            <RiCloseLine size={18} />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5 flex-1">
          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map(({ key, label, type }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
                <input type={type} value={form[key] || ''} onChange={(e) => set(key, e.target.value)} className={inputCls} />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Bio / Career Summary</label>
            <textarea rows={3} value={form.bio || ''} onChange={(e) => set('bio', e.target.value)} className={`${inputCls} resize-none`} />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 flex-shrink-0">
          <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={() => onSave(form)} className="shadow-md shadow-indigo-500/20">
            <RiCheckLine size={14} />Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ─── Password Modal ─── */
const PasswordModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }))
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center">
              <RiLockLine size={15} className="text-orange-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-200">Change Password</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors">
            <RiCloseLine size={18} />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          {[{ key:'current', label:'Current Password', ph:'••••••••' }, { key:'next', label:'New Password', ph:'Min. 8 characters' }, { key:'confirm', label:'Confirm New Password', ph:'••••••••' }].map(({ key, label, ph }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
              <input type="password" placeholder={ph} value={form[key]} onChange={(e) => set(key, e.target.value)} className={inputCls} />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-800">
          <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={onSave} className="shadow-md shadow-indigo-500/20">
            <RiCheckLine size={14} />Update Password
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ─── 2FA Coming Soon Modal ─── */
const TwoFAModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-sm shadow-2xl p-6">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center">
            <RiShieldCheckLine size={18} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-200">Two-Factor Authentication</h3>
            <p className="text-xs text-gray-500 mt-0.5">Extra layer of account security</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors">
          <RiCloseLine size={18} />
        </button>
      </div>
      <div className="bg-indigo-500/8 border border-indigo-500/20 rounded-xl p-4 mb-5">
        <p className="text-xs font-semibold text-indigo-400 mb-1">Coming Soon</p>
        <p className="text-xs text-gray-400 leading-relaxed">
          2FA via authenticator app (Google Authenticator / Authy) will be available once the backend is connected. This requires server-side session management.
        </p>
      </div>
      <ul className="space-y-2 mb-5">
        {['Scan QR code with authenticator app', 'Enter 6-digit code to verify', 'Enabled for all future logins'].map((step, i) => (
          <li key={i} className="flex items-center gap-2.5 text-xs text-gray-500">
            <span className="w-5 h-5 rounded-full bg-gray-800 text-gray-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
            {step}
          </li>
        ))}
      </ul>
      <Button variant="secondary" size="sm" fullWidth onClick={onClose}>Got it</Button>
    </div>
  </div>
)
const Toast = ({ message, show }) => (
  <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-2xl px-5 py-3.5 shadow-2xl transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
    <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
      <RiCheckLine size={13} className="text-green-400" />
    </span>
    <span className="text-sm text-gray-200 font-medium">{message}</span>
  </div>
)

/* ══════════════════════════════════════════════════════════
   Main Profile Page
══════════════════════════════════════════════════════════ */
const Profile = () => {
  const navigate           = useNavigate()
  const { user, logout, updateUser } = useAuth()

  // Seed profile from auth user; fall back to mock defaults for extra fields
  const buildInitialProfile = () => {
    const base = { ...userProfile }
    if (user) {
      base.firstName      = user.firstName  || base.firstName
      base.lastName       = user.lastName   || base.lastName
      base.email          = user.email      || base.email
      base.targetRole     = user.targetRole || base.targetRole
      base.avatarInitials = `${(user.firstName?.[0] || 'S')}${(user.lastName?.[0] || 'U')}`.toUpperCase()
    }
    return base
  }

  const [profile,    setProfile]    = useState(buildInitialProfile)
  const [resumes,    setResumes]    = useState(initialResumeHistory)
  const [settings,   setSettings]   = useState(() => {
    const stored = localStorage.getItem('cc_settings')
    return stored ? JSON.parse(stored) : { ...defaultSettings }
  })
  const [showEdit,   setShowEdit]   = useState(false)
  const [showPwd,    setShowPwd]    = useState(false)
  const [show2FA,    setShow2FA]    = useState(false)
  const [toast,      setToast]      = useState({ show: false, message: '' })
  const [avatarSrc,  setAvatarSrc]  = useState(null)
  const avatarRef                   = useRef(null)
  const toastTimer                  = useRef(null)

  // Apply dark mode class on settings change
  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.darkMode)
    localStorage.setItem('cc_settings', JSON.stringify(settings))
  }, [settings])

  const showToastMsg = (msg) => {
    clearTimeout(toastTimer.current)
    setToast({ show: true, message: msg })
    toastTimer.current = setTimeout(() => setToast({ show: false, message: '' }), 3000)
  }

  // Save profile → update AuthContext (persists to localStorage via updateUser)
  const handleSaveProfile = (data) => {
    setProfile(data)
    updateUser({
      firstName:  data.firstName,
      lastName:   data.lastName,
      email:      data.email,
      targetRole: data.targetRole,
    })
    setShowEdit(false)
    showToastMsg('Profile updated successfully!')
  }

  const handleSavePwd = () => {
    setShowPwd(false)
    showToastMsg('Password changed successfully!')
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setAvatarSrc(ev.target.result)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  // Resume delete — removes from local state immediately
  const handleDeleteResume = (id) => {
    setResumes((prev) => prev.filter((r) => r.id !== id))
    showToastMsg('Resume removed.')
  }

  // Dark mode toggle — persisted via useEffect
  const toggleSetting = (key) => setSettings((p) => ({ ...p, [key]: !p[key] }))

  // Logout — clears localStorage and navigates to /
  const handleLogout = async () => {
    await logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <PageHeader
        title="Profile"
        description="Manage your account, track your placement journey, and configure preferences."
        actions={
          <Button size="sm" onClick={() => setShowEdit(true)} className="shadow-md shadow-indigo-500/20">
            <RiEditLine size={14} />Edit Profile
          </Button>
        }
      />

      {/* ── Avatar + Stats ── */}
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="relative group mb-4">
            <div className={`w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br ${profile.avatarGradient} shadow-xl shadow-indigo-500/20`}>
              {avatarSrc
                ? <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
                : <span className="text-2xl font-extrabold text-white">{profile.avatarInitials}</span>
              }
            </div>
            <button onClick={() => avatarRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200" title="Change photo">
              <RiUploadCloud2Line size={22} className="text-white" />
            </button>
            <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>
          <h2 className="text-lg font-bold text-gray-100">{profile.firstName} {profile.lastName}</h2>
          <p className="text-xs text-indigo-400 font-medium mt-0.5">{profile.targetRole}</p>
          <div className="w-full mt-5 pt-5 border-t border-gray-800 space-y-2.5 text-left">
            {[
              { Icon: RiMailLine,      val: profile.email    },
              { Icon: RiPhoneLine,     val: profile.phone    },
              { Icon: RiMapPinLine,    val: profile.location },
              { Icon: RiBookOpenLine,  val: profile.college  },
              { Icon: RiBriefcaseLine, val: profile.degree   },
            ].map(({ Icon, val }) => val ? (
              <div key={val} className="flex items-center gap-2">
                <Icon size={13} className="text-gray-600 flex-shrink-0" />
                <span className="text-xs text-gray-400 truncate">{val}</span>
              </div>
            ) : null)}
          </div>
          <div className="flex gap-2 mt-4">
            {profile.linkedin && (
              <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-blue-600/20 flex items-center justify-center text-gray-500 hover:text-blue-400 transition-colors">
                <RiLinkedinBoxFill size={16} />
              </a>
            )}
            {profile.github && (
              <a href={`https://${profile.github}`} target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors">
                <RiGithubFill size={16} />
              </a>
            )}
          </div>
          <p className="text-[10px] text-gray-600 mt-4">Member since {profile.joinDate}</p>
        </div>

        <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4 content-start">
          {placementStats.map((s) => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-2xl font-extrabold text-gray-100">{s.value}</p>
                  <p className="text-sm font-medium text-gray-400 mt-0.5">{s.label}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{s.sub}</p>
                </div>
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${s.up ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
                  {s.up ? <RiArrowUpLine size={11} /> : <RiArrowDownLine size={11} />}{s.trend}
                </span>
              </div>
              {s.label === 'ATS Score' && <Sparkline data={atsHistory} />}
            </div>
          ))}
        </div>
      </div>

      {/* ── Resume History + Analysis History ── */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <SectionTitle icon={RiFileTextLine} iconCls="bg-blue-500/15 text-blue-400" title="Resume History" subtitle="All uploaded resume versions" />
          <div className="space-y-3">
            {resumes.length === 0 && (
              <p className="text-xs text-gray-500 text-center py-6">No resumes uploaded yet.</p>
            )}
            {resumes.map((r) => (
              <div key={r.id} className="flex items-center gap-3 bg-gray-800/50 border border-gray-700/50 hover:border-gray-600 rounded-xl px-4 py-3 transition-colors group">
                <div className="w-9 h-10 bg-gray-900 border border-gray-700 rounded-lg flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                  <div className="w-full bg-red-500/70 rounded-t-lg py-0.5 flex items-center justify-center">
                    <span className="text-[7px] font-bold text-white tracking-widest">PDF</span>
                  </div>
                  <RiFileTextLine size={14} className="text-gray-500 mt-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-300 truncate">{r.name}</p>
                  <p className="text-[10px] text-gray-600 mt-0.5 flex items-center gap-1">
                    <RiTimeLine size={9} />{r.uploadDate}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs font-bold ${atsColor(r.atsScore)}`}>{r.atsScore}%</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${resumeStatusCfg[r.status]}`}>{r.status}</span>
                  {/* Delete button — removes from local state immediately */}
                  <button
                    onClick={() => handleDeleteResume(r.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title="Delete resume"
                  >
                    <RiDeleteBin6Line size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <SectionTitle icon={RiSparklingLine} iconCls="bg-indigo-500/15 text-indigo-400" title="Analysis History" subtitle="Recent AI analyses performed" />
          <div className="space-y-2">
            {analysisHistory.map((a, idx) => {
              const cfg = analysisIconCfg[a.icon] ?? analysisIconCfg.ats
              const Icon = cfg.Icon
              return (
                <div key={a.id}>
                  <div className="flex items-start gap-3 py-2.5 group hover:bg-gray-800/40 -mx-3 px-3 rounded-xl transition-colors">
                    <div className={`w-8 h-8 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon size={14} className={cfg.text} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-300">{a.type}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{a.result}</p>
                    </div>
                    <span className="text-[10px] text-gray-600 flex items-center gap-1 flex-shrink-0 mt-0.5">
                      <RiTimeLine size={9} />{a.date}
                    </span>
                  </div>
                  {idx < analysisHistory.length - 1 && <div className="border-b border-gray-800/50 ml-11" />}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Account Settings + Security ── */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <SectionTitle icon={RiBellLine} iconCls="bg-yellow-500/15 text-yellow-400" title="Account Settings" subtitle="Manage notifications and preferences" />
          <div className="flex flex-wrap gap-3 mb-5">
            <Button variant="secondary" size="sm" onClick={() => setShowEdit(true)}>
              <RiEditLine size={14} />Edit Profile
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setShowPwd(true)}>
              <RiLockLine size={14} />Change Password
            </Button>
          </div>
          <div className="divide-y divide-gray-800">
            <Toggle checked={settings.emailNotifications} onChange={() => toggleSetting('emailNotifications')}
              label="Email Notifications" sub="Receive updates and analysis results via email" />
            <Toggle checked={settings.pushNotifications} onChange={() => toggleSetting('pushNotifications')}
              label="Push Notifications" sub="Browser push notifications for important alerts" />
            <Toggle checked={settings.weeklyReport} onChange={() => toggleSetting('weeklyReport')}
              label="Weekly Progress Report" sub="Receive a weekly summary of your career progress" />
            {/* Dark mode: persisted to localStorage via useEffect */}
            <Toggle
              checked={settings.darkMode}
              onChange={() => toggleSetting('darkMode')}
              label={<span className="flex items-center gap-1.5"><RiMoonLine size={13} />Dark Mode</span>}
              sub="Persisted to your browser preferences"
            />
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <SectionTitle icon={RiShieldCheckLine} iconCls="bg-green-500/15 text-green-400" title="Security" subtitle="Account security and session info" />
          <div className="space-y-4 mb-6">
            {[
              { label: 'Last Login',      value: securityInfo.lastLogin,     icon: RiTimeLine       },
              { label: 'Account Status',  value: securityInfo.accountStatus, icon: RiShieldCheckLine },
              { label: 'Active Sessions', value: `${securityInfo.sessions} device${securityInfo.sessions > 1 ? 's' : ''}`, icon: RiUser3Line },
              { label: 'Two-Factor Auth', value: securityInfo.twoFactor ? 'Enabled' : 'Disabled', icon: RiLockLine },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                <div className="flex items-center gap-2.5">
                  <Icon size={14} className="text-gray-600" />
                  <span className="text-sm text-gray-400">{label}</span>
                </div>
                <span className={`text-xs font-semibold ${value === 'Active' || value === 'Enabled' ? 'text-green-400' : value === 'Disabled' ? 'text-orange-400' : 'text-gray-300'}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
          {!securityInfo.twoFactor && (
            <div className="flex items-start gap-3 bg-orange-500/8 border border-orange-500/15 rounded-xl p-4 mb-5">
              <RiAlertLine size={15} className="text-orange-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-400 leading-relaxed">
                <span className="text-orange-400 font-semibold">Tip: </span>
                Enable two-factor authentication to keep your account secure.
              </p>
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="sm" onClick={() => setShow2FA(true)}>
              <RiShieldCheckLine size={14} />Enable 2FA
            </Button>
            {/* Logout: clears auth state and navigates to landing page */}
            <Button variant="danger" size="sm" onClick={handleLogout}>
              <RiLogoutBoxLine size={14} />Logout
            </Button>
          </div>
        </div>
      </div>

      {showEdit && <EditModal data={profile} onSave={handleSaveProfile} onClose={() => setShowEdit(false)} />}
      {showPwd  && <PasswordModal onClose={() => setShowPwd(false)} onSave={handleSavePwd} />}
      {show2FA  && <TwoFAModal onClose={() => setShow2FA(false)} />}
      <Toast show={toast.show} message={toast.message} />
    </div>
  )
}

export default Profile
