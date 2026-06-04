import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  RiRocketLine, RiMailLine, RiLockLine,
  RiEyeLine, RiEyeOffLine, RiCheckLine,
} from 'react-icons/ri'
import Button     from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'

/* ── Inline field error ─────────────────────────── */
const FieldError = ({ msg }) =>
  msg ? <p className="mt-1.5 text-xs text-red-400">{msg}</p> : null

/* ── Top toast ──────────────────────────────────── */
const Toast = ({ show, message }) => (
  <div className={`
    fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3
    px-5 py-3.5 rounded-2xl border border-green-500/30 bg-gray-900 text-green-400
    shadow-2xl transition-all duration-300 whitespace-nowrap
    ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
  `}>
    <RiCheckLine size={15} />
    <span className="text-sm font-medium">{message}</span>
  </div>
)

const inputCls = (err) =>
  `w-full bg-gray-800 border ${err ? 'border-red-500' : 'border-gray-700'}
   rounded-xl pl-10 pr-10 py-2.5 text-sm text-gray-100 placeholder-gray-500
   focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors`

/* ══════════════════════════════════════════════════
   Login Page
══════════════════════════════════════════════════ */
const Login = () => {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { login } = useAuth()

  // After login, return to the page the user tried to visit (or dashboard)
  const from = location.state?.from?.pathname || '/dashboard'

  const [form,    setForm]    = useState({ email: '', password: '' })
  const [errors,  setErrors]  = useState({})
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const [toast,   setToast]   = useState({ show: false, message: '' })

  const set = (k) => (e) => {
    setForm((p) => ({ ...p, [k]: e.target.value }))
    setErrors((p) => ({ ...p, [k]: '' }))
  }

  /* ── Validation ── */
  const validate = () => {
    const e = {}
    if (!form.email.trim())
      e.email    = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email    = 'Enter a valid email address.'
    if (!form.password)
      e.password = 'Password is required.'
    else if (form.password.length < 6)
      e.password = 'Password must be at least 6 characters.'
    return e
  }

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('[Login] Form submitted', { email: form.email })

    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      console.log('[Login] Validation failed', errs)
      return
    }

    console.log('[Login] Validation passed — calling mock auth…')
    setLoading(true)

    try {
      // useAuth().login → calls authService.login (mock) → saves token + user
      // → sets isAuthenticated = true in AuthContext synchronously
      await login({ email: form.email.trim(), password: form.password })

      console.log('[Login] Auth context updated, isAuthenticated = true')
      setToast({ show: true, message: 'Welcome back! Redirecting…' })

      setTimeout(() => {
        console.log('[Login] Redirecting to', from)
        navigate(from, { replace: true })
      }, 800)
    } catch (err) {
      console.error('[Login] Error', err)
      setErrors({ password: 'Invalid email or password.' })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <Toast show={toast.show} message={toast.message} />

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-8">
          <span className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <RiRocketLine size={18} className="text-white" />
          </span>
          <span className="font-bold text-xl text-gray-100">Career Copilot</span>
        </Link>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-gray-100 mb-1">Welcome back</h1>
          <p className="text-gray-400 text-sm mb-8">Sign in to your account to continue</p>

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <RiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set('email')}
                  autoComplete="email"
                  className={inputCls(!!errors.email)}
                />
              </div>
              <FieldError msg={errors.email} />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-300">
                  Password <span className="text-red-400">*</span>
                </label>
                <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <RiLockLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                <input
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={set('password')}
                  autoComplete="current-password"
                  className={inputCls(!!errors.password)}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPwd ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                </button>
              </div>
              <FieldError msg={errors.password} />
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={loading}
              disabled={loading}
              className="shadow-lg shadow-indigo-500/20 mt-2"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          {/* Demo hint */}
          <p className="text-xs text-gray-600 text-center mt-4">
            Demo: use any valid email + min 6 characters to sign in.
          </p>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
