import { NavLink, Link } from 'react-router-dom'
import {
  RiDashboardLine, RiFileTextLine, RiSearchEyeLine, RiBarChartLine,
  RiQuestionAnswerLine, RiLightbulbLine, RiUser3Line, RiCloseLine,
  RiBriefcaseLine, RiMapPinLine,
} from 'react-icons/ri'

const navItems = [
  {
    group: 'Overview',
    items: [
      { label: 'Dashboard', icon: RiDashboardLine, to: '/dashboard' },
    ],
  },
  {
    group: 'Tools',
    items: [
      { label: 'Resume Upload',       icon: RiFileTextLine,       to: '/resume-upload'        },
      { label: 'JD Analyzer',         icon: RiSearchEyeLine,      to: '/jd-analyzer'          },
      { label: 'ATS Score',           icon: RiBarChartLine,       to: '/ats-score'            },
      { label: 'Interview Generator', icon: RiQuestionAnswerLine, to: '/interview-generator'  },
      { label: 'Skill Gap',           icon: RiLightbulbLine,      to: '/skill-gap'            },
    ],
  },
  {
    group: 'Progress',
    items: [
      { label: 'Placement Tracker', icon: RiBriefcaseLine, to: '/placement-tracker' },
      { label: 'Journey',           icon: RiMapPinLine,    to: '/placement-journey' },
    ],
  },
  {
    group: 'Account',
    items: [
      { label: 'Profile', icon: RiUser3Line, to: '/profile' },
    ],
  },
]

const Sidebar = ({ open, onClose }) => (
  <>
    {open && (
      <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} aria-hidden="true" />
    )}

    <aside
      className={`
        fixed top-0 left-0 h-full w-56 bg-[#080f14] border-r border-[#253243] z-50
        flex flex-col transition-transform duration-200
        lg:translate-x-0 lg:static lg:z-auto
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Logo */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-[#253243] shrink-0">
        <Link to="/dashboard" className="flex items-center gap-2.5" onClick={onClose}>
          <span className="w-6 h-6 rounded-md bg-[#0f766e] flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">C</span>
          </span>
          <span className="text-sm font-semibold text-slate-200 tracking-tight">Career Copilot</span>
        </Link>
        <button onClick={onClose} className="lg:hidden p-1 rounded text-slate-500 hover:text-slate-300 transition-colors">
          <RiCloseLine size={16} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
        {navItems.map((group) => (
          <div key={group.group}>
            <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider px-2 mb-1.5">
              {group.group}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) => `
                      flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors duration-150
                      ${isActive
                        ? 'bg-[#0f766e]/15 text-[#0f766e] font-medium'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#121820] font-normal'}
                    `}
                  >
                    <item.icon size={16} className="shrink-0" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  </>
)

export default Sidebar
