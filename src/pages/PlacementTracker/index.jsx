import { useState } from 'react'
import {
  RiBriefcaseLine, RiBuildingLine, RiSparklingLine,
  RiCalendarLine, RiBarChartLine,
} from 'react-icons/ri'
import PageHeader        from '../../components/ui/PageHeader'
import ApplicationTracker from './ApplicationTracker'
import CompanyHub         from './CompanyHub'
import ReadinessPredictor from './ReadinessPredictor'
import WeeklyGoals        from './WeeklyGoals'
import StudentInsights    from './StudentInsights'

const TABS = [
  { id: 'tracker',   label: 'Application Tracker',  icon: RiBriefcaseLine  },
  { id: 'company',   label: 'Company Hub',           icon: RiBuildingLine   },
  { id: 'predictor', label: 'Readiness Predictor',   icon: RiSparklingLine  },
  { id: 'goals',     label: 'Weekly Goals',          icon: RiCalendarLine   },
  { id: 'insights',  label: 'Student Insights',      icon: RiBarChartLine   },
]

const PlacementTracker = () => {
  const [tab, setTab] = useState('tracker')

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Placement Tracker"
        description="Your complete placement journey — track applications, prep for companies, and monitor readiness."
      />

      {/* Tab bar */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-1.5 flex gap-1 overflow-x-auto">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 whitespace-nowrap flex-shrink-0 ${tab === t.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}`}>
            <t.icon size={15} />{t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="min-h-[60vh]">
        {tab === 'tracker'   && <ApplicationTracker />}
        {tab === 'company'   && <CompanyHub />}
        {tab === 'predictor' && <ReadinessPredictor />}
        {tab === 'goals'     && <WeeklyGoals />}
        {tab === 'insights'  && <StudentInsights />}
      </div>
    </div>
  )
}

export default PlacementTracker
