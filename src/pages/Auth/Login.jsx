import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiCheckLine } from 'react-icons/ri'
import Button   from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'

const FieldError = ({ msg }) =>
  msg ? <p className="mt-1.5 text-xs text-red-400">{msg}</p> : null

const Toast = ({ show, message }) => (
  <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg border border-[#0f766e]/30 bg-[#121820] text-[#0f766e] text-sm font-medium shadow-lg transition-all duration-200 whitespace-nowrap ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
    <RiCheckLine size={15} />
    {message}
  </div>
)

const inputCls = (err) =>
  `w-full bg-[#0d1520] border ${err ? 'border-red-500/60' : 'border-[#253243]'} rounded-lg pl-9 pr-9 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e]/40 transition-colors`

const Login = () => {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { login } = useAuth()
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

  const validate = () => {
    const e = {}
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.'
    if (!form.password) e.password = 'Password is required.'
    else if (form.password.length < 6) e.password = 'Minimum 6 characters.'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      await login({ email: form.email.trim(), password: form.password })
      setToast({ show: true, message: 'Signed in successfully' })
      setTimeout(() => navigate(from, { replace: true }), 800)
    } catch {
      setErrors({ password: 'Invalid email or password.' })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080f14] flex items-center justify-center px-4">
      <Toast show={toast.show} message={toast.message} />

      <div className="w-full max-w-sm">
        {/* Logo mark */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="w-7 h-7 rounded-lg bg-[#0f766e] flex items-center justify-center">
            <span className="text-white text-xs font-bold">C</span>
          </span>
          <span className="text-base font-semibold text-slate-200">Career Copilot</span>
        </Link>

        <div className="bg-[#121820] border border-[#253243] rounded-xl p-7">
          <h1 className="text-lg font-semibold text-slate-100 mb-1">Sign in</h1>
          <p className="text-sm text-slate-400 mb-6">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
              <div className="relative">
                <RiMailLine className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" size={15} />
                <input type="email" placeholder="you@college.edu" value={form.email} onChange={set('email')} autoComplete="email" className={inputCls(!!errors.email)} />
              </div>
              <FieldError msg={errors.email} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-400">Password</label>
                <a href="#" className="text-xs text-[#0f766e] hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <RiLockLine className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" size={15} />
                <input type={showPwd ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={set('password')} autoComplete="current-password" className={inputCls(!!errors.password)} />
                <button type="button" tabIndex={-1} onClick={() => setShowPwd(v => !v)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors">
                  {showPwd ? <RiEyeOffLine size={15} /> : <RiEyeLine size={15} />}
                </button>
              </div>
              <FieldError msg={errors.password} />
            </div>

            <Button type="submit" fullWidth loading={loading} disabled={loading} className="mt-2">
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <p className="text-xs text-slate-600 text-center mt-5">
            Demo: any valid email + 6+ characters
          </p>
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          No account?{' '}
          <Link to="/signup" className="text-[#0f766e] hover:underline font-medium">Create one</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
