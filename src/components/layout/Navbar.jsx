import { Link } from 'react-router-dom'
import { RiMenu2Line, RiBellLine, RiSearchLine, RiUser3Line } from 'react-icons/ri'

const Navbar = ({ onMenuClick }) => {
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

      {/* Search */}
      <div className="hidden sm:flex flex-1 max-w-sm ml-auto lg:ml-0">
        <div className="relative w-full">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="search"
            placeholder="Search..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors">
          <RiBellLine size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-gray-900" />
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-800 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <RiUser3Line size={16} className="text-white" />
          </div>
          <span className="hidden md:block text-sm text-gray-300">User</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
