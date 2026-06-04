import { RiBarChartLine } from 'react-icons/ri'
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { insightsStats, readinessTrend, applicationFunnelData } from './mockPlacementData'

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs shadow-xl">
      <p className="text-gray-400 mb-1">{label}</p>
      {payload.map(p => <p key={p.name} style={{ color: p.color }} className="font-semibold">{p.name}: {p.value}{typeof p.value === 'number' ? '%' : ''}</p>)}
    </div>
  )
}

const FUNNEL_COLORS = ['#6366f1', '#f97316', '#eab308', '#22c55e']

const StudentInsights = () => (
  <div>
    <div className="flex items-center gap-2 mb-6">
      <RiBarChartLine size={18} className="text-blue-400" />
      <h2 className="text-base font-bold text-gray-200">Student Insights Dashboard</h2>
    </div>

    {/* Stat cards */}
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {[
        { label: 'Total Applications', value: insightsStats.totalApplications, color: 'text-indigo-400', bg: 'bg-indigo-500/15', suffix: '' },
        { label: 'OA Clearance Rate',  value: insightsStats.oaClearanceRate,   color: 'text-orange-400', bg: 'bg-orange-500/15', suffix: '%' },
        { label: 'Interview Conversion', value: insightsStats.interviewConversion, color: 'text-yellow-400', bg: 'bg-yellow-500/15', suffix: '%' },
        { label: 'Offers Received',    value: insightsStats.offersReceived,    color: 'text-green-400',  bg: 'bg-green-500/15',  suffix: '' },
      ].map(s => (
        <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
            <RiBarChartLine size={16} className={s.color} />
          </div>
          <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}{s.suffix}</p>
          <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      {/* Readiness trend */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <p className="text-sm font-bold text-gray-200 mb-1">Placement Readiness Trend</p>
        <p className="text-xs text-gray-500 mb-5">8-week score progression</p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={readinessTrend} margin={{ top:5, right:10, left:-20, bottom:0 }}>
            <defs>
              <linearGradient id="trendLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366f1"/>
                <stop offset="100%" stopColor="#22c55e"/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false}/>
            <XAxis dataKey="week" tick={{fill:'#6b7280',fontSize:11}} axisLine={false} tickLine={false}/>
            <YAxis domain={[30,90]} tick={{fill:'#6b7280',fontSize:11}} axisLine={false} tickLine={false}/>
            <Tooltip content={<ChartTooltip/>}/>
            <Line type="monotone" dataKey="score" name="Readiness" stroke="url(#trendLine)"
              strokeWidth={3} dot={{fill:'#6366f1',r:4,strokeWidth:0}}
              activeDot={{r:5,fill:'#22c55e',strokeWidth:0}}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Application funnel */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <p className="text-sm font-bold text-gray-200 mb-1">Application Funnel</p>
        <p className="text-xs text-gray-500 mb-5">Conversion through hiring stages</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={applicationFunnelData} margin={{ top:5, right:10, left:-20, bottom:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false}/>
            <XAxis dataKey="stage" tick={{fill:'#6b7280',fontSize:10}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:'#6b7280',fontSize:11}} axisLine={false} tickLine={false}/>
            <Tooltip content={<ChartTooltip/>}/>
            <Bar dataKey="count" name="Count" radius={[6,6,0,0]} maxBarSize={40}>
              {applicationFunnelData.map((_, i) => <Cell key={i} fill={FUNNEL_COLORS[i]}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
)

export default StudentInsights
