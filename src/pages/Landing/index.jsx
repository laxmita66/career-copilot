import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  RiRocketLine,
  RiArrowRightLine,
  RiCheckLine,
  RiFileTextLine,
  RiBarChartLine,
  RiLightbulbLine,
  RiQuestionAnswerLine,
  RiMenuLine,
  RiCloseLine,
  RiShieldCheckLine,
  RiSpeedLine,
  RiBrainLine,
  RiStarFill,
  RiUploadCloud2Line,
  RiSearchEyeLine,
  RiAwardLine,
  RiLinkedinBoxFill,
  RiTwitterXLine,
  RiGithubFill,
} from 'react-icons/ri'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

/* ─── Data ─────────────────────────────────────────── */

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Testimonials', href: '#testimonials' },
]

const features = [
  {
    icon: RiFileTextLine,
    title: 'Resume Analysis',
    description:
      'Upload your resume and get instant AI-powered feedback on structure, content, keywords, and impact — tailored to your target role.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'group-hover:border-blue-500/30',
  },
  {
    icon: RiBarChartLine,
    title: 'ATS Score Analysis',
    description:
      'See exactly how Applicant Tracking Systems read your resume. Fix gaps before recruiters even see your application.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'group-hover:border-green-500/30',
  },
  {
    icon: RiLightbulbLine,
    title: 'Skill Gap Detection',
    description:
      'Compare your current skill set against job descriptions and get a personalised learning roadmap to close the gaps fast.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'group-hover:border-yellow-500/30',
  },
  {
    icon: RiQuestionAnswerLine,
    title: 'Interview Question Generator',
    description:
      'Generate role-specific technical and behavioural questions with model answers to help you walk into every interview with confidence.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'group-hover:border-orange-500/30',
  },
]

const steps = [
  {
    step: '01',
    icon: RiUploadCloud2Line,
    title: 'Upload Your Resume',
    description: 'Drop your PDF or DOCX resume. Our AI parses and structures every detail in seconds.',
  },
  {
    step: '02',
    icon: RiSearchEyeLine,
    title: 'Analyze & Match',
    description: 'Paste a job description to see your match score, missing keywords, and skill gaps instantly.',
  },
  {
    step: '03',
    icon: RiBrainLine,
    title: 'Get AI Insights',
    description: 'Receive actionable recommendations to improve your ATS score and stand out to recruiters.',
  },
  {
    step: '04',
    icon: RiAwardLine,
    title: 'Land the Job',
    description: 'Walk into interviews prepared, with a polished resume and a clear career strategy.',
  },
]

const benefits = [
  { icon: RiShieldCheckLine, text: 'ATS-optimised in minutes' },
  { icon: RiSpeedLine, text: 'Instant AI feedback' },
  { icon: RiBrainLine, text: 'Personalised career roadmap' },
  { icon: RiCheckLine, text: 'Role-specific interview prep' },
  { icon: RiBarChartLine, text: 'Real-time scoring dashboard' },
  { icon: RiLightbulbLine, text: 'Skill gap analysis' },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer at Google',
    avatar: 'PS',
    gradient: 'from-indigo-500 to-purple-600',
    rating: 5,
    quote:
      'Career Copilot helped me identify exactly what was missing in my resume. My ATS score went from 54% to 91% in one afternoon. Got my Google offer two months later.',
  },
  {
    name: 'James Okonkwo',
    role: 'Product Manager at Stripe',
    avatar: 'JO',
    gradient: 'from-blue-500 to-cyan-500',
    rating: 5,
    quote:
      'The interview question generator is insanely good. It gave me role-specific questions I hadn\'t even thought of, and I nailed every behavioural round.',
  },
  {
    name: 'Sara Müller',
    role: 'Data Scientist at Airbnb',
    avatar: 'SM',
    gradient: 'from-pink-500 to-rose-500',
    rating: 5,
    quote:
      'I was applying for six months with no luck. After using Career Copilot for a week, I had three interviews lined up. The skill gap report was a game changer.',
  },
]

/* ─── Sub-components ────────────────────────────────── */

const SectionLabel = ({ children }) => (
  <span className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
    {children}
  </span>
)

const SectionHeading = ({ children, className = '' }) => (
  <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-100 tracking-tight ${className}`}>
    {children}
  </h2>
)

const StarRating = ({ count = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <RiStarFill key={i} size={14} className="text-yellow-400" />
    ))}
  </div>
)

/* ─── Main Component ────────────────────────────────── */

const Landing = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col overflow-x-hidden">

      {/* ── Navbar ──────────────────────────────────── */}
      <nav className="border-b border-gray-800/60 bg-gray-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/40">
              <RiRocketLine size={16} className="text-white" />
            </span>
            <span className="font-bold text-lg tracking-tight">Career Copilot</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm text-gray-400 hover:text-gray-100 transition-colors font-medium"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-800 bg-gray-950 px-4 py-4 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-gray-100 hover:bg-gray-800 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="secondary" fullWidth>Login</Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)}>
                <Button fullWidth>Sign Up</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ────────────────────────────────────── */}
      <section id="home" className="relative flex items-center justify-center px-4 py-28 lg:py-36 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-indigo-600/12 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-60 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-60 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-3xl" />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(to right, #6366f1 1px, transparent 1px)',
              backgroundSize: '72px 72px',
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <RiRocketLine size={14} />
            AI-Powered Career Acceleration
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            AI-Powered Career Assistant{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              for Placement Success
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Analyze resumes, improve ATS scores, identify skill gaps, and prepare for
            interviews with AI — all in one powerful platform.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="min-w-48 shadow-xl shadow-indigo-500/25">
                Get Started
                <RiArrowRightLine size={18} />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" className="min-w-48">
                Login
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['PS', 'JO', 'SM'].map((av, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-gray-950 flex items-center justify-center text-[9px] font-bold text-white"
                  >
                    {av}
                  </div>
                ))}
              </div>
              <span>1,200+ students placed</span>
            </div>
            <span className="hidden sm:block text-gray-700">•</span>
            <div className="flex items-center gap-1">
              <StarRating />
              <span className="ml-1">4.9 / 5 rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────── */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Features</SectionLabel>
            <SectionHeading>
              Everything you need to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                land the role
              </span>
            </SectionHeading>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto text-base leading-relaxed">
              Four AI-powered tools working together to give you an unfair advantage in the job market.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className={`group bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300 ${f.border}`}
              >
                <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-5`}>
                  <f.icon size={24} className={f.color} />
                </div>
                <h3 className="font-semibold text-gray-100 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-4 bg-gray-900/40 border-y border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>How It Works</SectionLabel>
            <SectionHeading>From upload to offer in 4 steps</SectionHeading>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto text-base leading-relaxed">
              Career Copilot turns a complex, frustrating job search into a clear, actionable process.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line – desktop only */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

            {steps.map((s, i) => (
              <div key={s.step} className="relative flex flex-col items-center text-center group">
                {/* Step circle */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-gray-900 border border-gray-700 group-hover:border-indigo-500/50 flex items-center justify-center mb-5 shadow-lg transition-colors duration-300">
                  <s.icon size={26} className="text-indigo-400" />
                  <span className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md shadow-indigo-500/30">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-100 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left copy */}
            <div>
              <SectionLabel>Benefits</SectionLabel>
              <SectionHeading className="mb-6">
                Why students choose{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Career Copilot
                </span>
              </SectionHeading>
              <p className="text-gray-400 leading-relaxed mb-8">
                We built Career Copilot because the hiring process is broken. Resumes get rejected by
                bots before a human ever reads them. We fix that — and help you show up fully prepared
                at every stage.
              </p>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b.text} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                      <b.icon size={16} className="text-indigo-400" />
                    </span>
                    <span className="text-gray-300 text-sm">{b.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right visual card */}
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-600/10 rounded-3xl blur-3xl -z-10" />
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
                {/* ATS score card */}
                <div className="flex items-center gap-4 bg-gray-800/60 rounded-xl p-4">
                  <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <RiBarChartLine size={26} className="text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">ATS Score</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full w-[91%] bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" />
                      </div>
                      <span className="text-green-400 font-bold text-sm">91%</span>
                    </div>
                  </div>
                </div>
                {/* Skills matched */}
                <div className="flex items-center gap-4 bg-gray-800/60 rounded-xl p-4">
                  <div className="w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                    <RiLightbulbLine size={26} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Skills Matched</p>
                    <p className="text-gray-100 font-semibold">18 / 20 required skills</p>
                  </div>
                </div>
                {/* Interview ready */}
                <div className="flex items-center gap-4 bg-gray-800/60 rounded-xl p-4">
                  <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <RiQuestionAnswerLine size={26} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Interview Questions</p>
                    <p className="text-gray-100 font-semibold">42 questions generated</p>
                  </div>
                </div>
                <div className="pt-2">
                  <Link to="/signup">
                    <Button fullWidth>
                      Get These Results
                      <RiArrowRightLine size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────── */}
      <section id="testimonials" className="py-24 px-4 bg-gray-900/40 border-y border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Testimonials</SectionLabel>
            <SectionHeading>
              Real results from{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                real students
              </span>
            </SectionHeading>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto text-base">
              Here's what our users say after landing their dream jobs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 transition-all duration-300"
              >
                <StarRating count={t.rating} />
                <p className="text-gray-300 text-sm leading-relaxed mt-4 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-200">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ─────────────────────────────── */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/5 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <SectionLabel>Get Started Today</SectionLabel>
          <SectionHeading className="mb-6">
            Your next career move{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              starts here
            </span>
          </SectionHeading>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Join thousands of students who used Career Copilot to optimise their resumes,
            crack interviews, and land top-tier jobs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="min-w-48 shadow-xl shadow-indigo-500/25">
                Get Started — It&apos;s Free
                <RiArrowRightLine size={18} />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="min-w-48">
                Login to Your Account
              </Button>
            </Link>
          </div>
          <p className="text-xs text-gray-600 mt-6">No credit card required · Free forever plan available</p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────── */}
      <footer className="border-t border-gray-800 bg-gray-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2.5 mb-4">
                <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <RiRocketLine size={16} className="text-white" />
                </span>
                <span className="font-bold text-gray-100">Career Copilot</span>
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed">
                AI-powered career tools to help students and professionals land their dream jobs.
              </p>
              <div className="flex gap-3 mt-4">
                {[RiLinkedinBoxFill, RiTwitterXLine, RiGithubFill].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">Product</h4>
              <ul className="space-y-2.5">
                {['Features', 'How It Works', 'Pricing', 'Changelog'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">Tools</h4>
              <ul className="space-y-2.5">
                {['Resume Analysis', 'ATS Score', 'Skill Gap', 'Interview Prep'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">Company</h4>
              <ul className="space-y-2.5">
                {['About', 'Blog', 'Privacy Policy', 'Terms of Service'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} Career Copilot. All rights reserved.
            </p>
            <p className="text-xs text-gray-700">
              Built with ❤️ for students & job seekers
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
