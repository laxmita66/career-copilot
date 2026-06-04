import { NavLink, Link } from 'react-router-dom'
import {
  RiDashboardLine,
  RiFileTextLine,
  RiSearchEyeLine,
  RiBarChartLine,
  RiQuestionAnswerLine,
  RiLightbulbLine,
  RiUser3Line,
  RiCloseLine,
  RiRocketLine,
  RiBriefcaseLine,
  RiMapPinLine,
} from 'react-icons/ri'

const navItems = [
  {
    group: 'Overview',
    items: [
      { label: 'Dashboard',    icon: RiDashboardLine, to: '/dashboard' },
    ],
  },
  {
    group: 'AI Tools',
    items: [
      { label: 'Resume Upload',       icon: RiFileTextLine,       to: '/resume-upload'        },
      { label: 'JD Analyzer',         icon: RiSearchEyeLine,      to: '/jd-analyzer'          },
      { label: 'ATS Score',           icon: RiBarChartLine,       to: '/ats-score'            },
      { label: 'Interview Generator', icon: RiQuestionAnswerLine, to: '/interview-generator'  },
      { label: 'Skill Gap',           icon: RiLightbulbLine,      to: '/skill-gap'            },
    ],
  },
  {
    group: 'Placement',
    items: [
      { label: 'Placement Tracker',   icon: RiBriefcaseLine, to: '/placement-tracker'  },
      { label: 'Placement Journey',   icon: RiMapPinLine,    to: '/placement-journey'  },
    ],
  },
  {
    group: 'Account',
    items: [
      { label: 'Profile', icon: RiUser3Line, to: '/profile' },
    ],
  },
]

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-800 z-50
          flex flex-col transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-gray-800 flex-shrink-0">
          <Link to="/dashboard" className="flex items-center gap-2.5" onClick={onClose}>
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <RiRocketLine size={16} className="text-white" />
            </span>
            <span className="font-bold text-gray-100 text-base tracking-tight">Career Copilot</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors"
          >
            <RiCloseLine size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navItems.map((group) => (
            <div key={group.group}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
                {group.group}
              </p>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={onClose}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                        ${isActive
                          ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20'
                          : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
                        }
                      `}
                    >
                      <item.icon size={18} className="flex-shrink-0" />
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Upgrade banner */}
        <div className="p-4 border-t border-gray-800 flex-shrink-0">
          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-200 mb-1">Upgrade to Pro</p>
            <p className="text-xs text-gray-400 mb-3">Unlock all features and tools.</p>
            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium py-2 rounded-lg transition-colors">
              Get Pro
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
