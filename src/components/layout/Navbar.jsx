import { Link } from 'react-router-dom'
import { RiMenu2Line, RiUser3Line } from 'react-icons/ri'
import { useAuth } from '../../context/AuthContext'

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth()

  // Derive initials and display name from the auth user object
  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() || 'U'
    : 'U'
  const displayName = user?.firstName
    ? `${user.firstName}${user.lastName ? ' ' + user.lastName[0] + '.' : ''}`
    : 'Profile'

  return (
    <header className="h-16 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-30">
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors"
        aria-label="Open menu"
      >
        <RiMenu2Line size={20} />
      </button>

      {/* Logo – visible on mobile when sidebar is hidden */}
      <Link to="/dashboard" className="lg:hidden flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
          CC
        </span>
        <span className="font-semibold text-gray-100">Career Copilot</span>
      </Link>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Profile link — shows real user initials */}
      <Link
        to="/profile"
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
          {initials.length >= 2 ? (
            <span className="text-xs font-bold text-white leading-none">{initials}</span>
          ) : (
            <RiUser3Line size={15} className="text-white" />
          )}
        </div>
        <span className="hidden md:block text-sm text-gray-300 max-w-[120px] truncate">
          {displayName}
        </span>
      </Link>
    </header>
  )
}

export default Navbar
