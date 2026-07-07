import { Link } from 'react-router-dom'
import { RiMenu2Line, RiUser3Line } from 'react-icons/ri'
import { useAuth } from '../../context/AuthContext'

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth()

  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() || 'U'
    : 'U'
  const displayName = user?.firstName
    ? `${user.firstName}${user.lastName ? ' ' + user.lastName[0] + '.' : ''}`
    : 'Profile'

  return (
    <header className="h-14 bg-[#080f14] border-b border-[#253243] flex items-center px-4 lg:px-6 gap-3 shrink-0">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-[#121820] transition-colors"
        aria-label="Open menu"
      >
        <RiMenu2Line size={18} />
      </button>

      <Link to="/dashboard" className="lg:hidden flex items-center gap-2">
        <span className="w-6 h-6 rounded-md bg-[#0f766e] flex items-center justify-center text-white font-bold text-xs">
          C
        </span>
        <span className="text-sm font-semibold text-slate-200">Career Copilot</span>
      </Link>

      <div className="flex-1" />

      <Link
        to="/profile"
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-[#121820] transition-colors"
      >
        <div className="w-7 h-7 rounded-full bg-[#0f766e] flex items-center justify-center shrink-0">
          {initials.length >= 2 ? (
            <span className="text-[11px] font-semibold text-white leading-none">{initials}</span>
          ) : (
            <RiUser3Line size={14} className="text-white" />
          )}
        </div>
        <span className="hidden md:block text-sm text-slate-400 max-w-[100px] truncate">
          {displayName}
        </span>
      </Link>
    </header>
  )
}

export default Navbar
