import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  RiArrowRightLine, RiCheckLine, RiFileTextLine, RiBarChartLine,
  RiLightbulbLine, RiQuestionAnswerLine, RiMenuLine, RiCloseLine,
  RiUploadCloud2Line, RiSearchEyeLine, RiBrainLine, RiAwardLine,
  RiShieldCheckLine, RiSpeedLine, RiDashboardLine,
} from 'react-icons/ri'
import Button from '../../components/ui/Button'

/* ── Nav links ── */
const navLinks = [
  { label: 'Features',    href: '#features'    },
  { label: 'How It Works', href: '#how-it-works' },
]

/* ── Feature cards ── */
const features = [
  {
    icon: RiFileTextLine,
    title: 'Resume Analysis',
    description: 'Upload your resume to identify structural and keyword gaps before applying.',
  },
  {
    icon: RiBarChartLine,
    title: 'ATS Score',
    description: 'Check how your resume scores against ATS filters used by recruiters.',
  },
  {
    icon: RiLightbulbLine,
    title: 'Skill Gap Detection',
    description: 'Compare your skills against your target role and see what to learn next.',
  },
  {
    icon: RiQuestionAnswerLine,
    title: 'Interview Prep',
    description: 'Generate technical and HR questions tailored to your role and experience level.',
  },
]

/* ── Steps ── */
const steps = [
  { icon: RiUploadCloud2Line, label: 'Upload Resume',    desc: 'PDF, up to 5 MB'             },
  { icon: RiSearchEyeLine,    label: 'ATS Analysis',     desc: 'Keyword & format check'       },
  { icon: RiBrainLine,        label: 'Skill Gap',        desc: 'Role comparison'              },
  { icon: RiAwardLine,        label: 'Interview Prep',   desc: 'Tailored question sets'       },
]

/* ── Why list ── */
const whyItems = [
  'Resume Analysis',
  'ATS Optimization',
  'Skill Gap Detection',
  'Interview Preparation',
  'Placement Dashboard',
  'Application Tracker',
]

/* ─────────────────────────────────── */

const Landing = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#080f14] text-slate-200 flex flex-col">

      {/* ── Navbar ── */}
      <header className="border-b border-[#253243] bg-[#080f14] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-[#0f766e] flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">C</span>
            </span>
            <span className="text-sm font-semibold text-slate-200">Career Copilot</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="text-sm text-slate-400 hover:text-slate-200 transition-colors">{l.label}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
            <Link to="/signup"><Button size="sm">Get Started</Button></Link>
          </div>

          <button className="md:hidden p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-[#121820]" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <RiCloseLine size={20} /> : <RiMenuLine size={20} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-[#253243] bg-[#080f14] px-4 py-4 space-y-1">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-slate-100 hover:bg-[#121820] transition-colors">{l.label}</a>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link to="/login" onClick={() => setOpen(false)}><Button variant="secondary" fullWidth>Login</Button></Link>
              <Link to="/signup" onClick={() => setOpen(false)}><Button fullWidth>Get Started</Button></Link>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
        <div className="max-w-2xl">
          
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
            Career Copilot
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
            Your all-in-one placement preparation platform. Analyze resumes, improve ATS scores,
            identify skill gaps, and prepare confidently for placements.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/signup">
              <Button size="lg">
                Get Started
                <RiArrowRightLine size={16} />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg">Login</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="border-t border-[#253243]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="mb-10">
            <p className="text-xs font-semibold text-[#0f766e] uppercase tracking-widest mb-2">Features</p>
            <h2 className="text-2xl font-bold text-white">Everything in one place</h2>
            <p className="text-slate-400 mt-2 text-sm max-w-md">
              Four tools built specifically for students preparing for campus and off-campus placements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(f => (
              <div key={f.title} className="bg-[#121820] border border-[#253243] rounded-xl p-5 hover:border-[#374151] transition-colors duration-150">
                <div className="w-8 h-8 rounded-lg bg-[#0f766e]/10 flex items-center justify-center mb-4">
                  <f.icon size={17} className="text-[#0f766e]" />
                </div>
                <h3 className="text-sm font-semibold text-slate-100 mb-1.5">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="border-t border-[#253243]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="mb-10">
            <p className="text-xs font-semibold text-[#0f766e] uppercase tracking-widest mb-2">How It Works</p>
            <h2 className="text-2xl font-bold text-white">Four steps to placement readiness</h2>
          </div>

          {/* Horizontal stepper */}
          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-5 left-[calc(12.5%+16px)] right-[calc(12.5%+16px)] h-px bg-[#253243]" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <div key={s.label} className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-[#121820] border border-[#253243] mb-4">
                    <s.icon size={18} className="text-[#0f766e]" />
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#0f766e] text-white text-[9px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-200 mb-0.5">{s.label}</p>
                  <p className="text-xs text-slate-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Career Copilot ── */}
      <section className="border-t border-[#253243]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold text-[#0f766e] uppercase tracking-widest mb-2">Why Career Copilot?</p>
              <h2 className="text-2xl font-bold text-white mb-4">
                Built for students. Not generic job seekers.
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Most resume tools are built for professionals switching jobs. Career Copilot is built
                for students preparing for placement season — with tools that match how campus hiring actually works.
              </p>
              <ul className="space-y-3">
                {whyItems.map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-md bg-[#0f766e]/15 flex items-center justify-center shrink-0">
                      <RiCheckLine size={12} className="text-[#0f766e]" />
                    </span>
                    <span className="text-sm text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Simple dashboard illustration — no gradients, no glow */}
            <div className="bg-[#121820] border border-[#253243] rounded-xl p-5 space-y-3">
              {/* Stat row */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'ATS Score',   value: '91%' },
                  { label: 'Skills Matched', value: '18/20' },
                ].map(s => (
                  <div key={s.label} className="bg-[#0d1520] border border-[#253243] rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">{s.label}</p>
                    <p className="text-xl font-semibold text-slate-100">{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Progress bars */}
              {[
                { label: 'Resume Score',     pct: 91 },
                { label: 'Keyword Match',    pct: 78 },
                { label: 'Interview Prep',   pct: 65 },
              ].map(b => (
                <div key={b.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{b.label}</span>
                    <span className="text-slate-500">{b.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-[#253243] rounded-full overflow-hidden">
                    <div className="h-full bg-[#0f766e] rounded-full" style={{ width: `${b.pct}%` }} />
                  </div>
                </div>
              ))}

              <div className="pt-1">
                <Link to="/signup">
                  <Button fullWidth size="sm">
                    View Your Dashboard
                    <RiDashboardLine size={14} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-[#253243]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Start preparing for placements today
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm">
            Free to use. No credit card required. Get your ATS score in under two minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/signup">
              <Button size="lg">
                Get Started — Free
                <RiArrowRightLine size={16} />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Login to Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#253243] bg-[#080f14] mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded bg-[#0f766e] flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">C</span>
                </span>
                <span className="text-sm font-semibold text-slate-300">Career Copilot</span>
              </div>
              <p className="text-xs text-slate-600 max-w-xs">
                Placement preparation platform for engineering students.
              </p>
            </div>

            <nav className="flex flex-wrap gap-x-5 gap-y-2">
              {[
                { label: 'Home',       href: '#home'        },
                { label: 'Features',   href: '#features'    },
                { label: 'Dashboard',  href: '/dashboard'   },
                { label: 'Privacy',    href: '#'            },
              ].map(l => (
                <a key={l.label} href={l.href} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">{l.label}</a>
              ))}
            </nav>
          </div>

          <div className="border-t border-[#253243] mt-6 pt-6">
            <p className="text-xs text-slate-700">© {new Date().getFullYear()} Career Copilot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
