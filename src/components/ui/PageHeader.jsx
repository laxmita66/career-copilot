const PageHeader = ({ title, description, actions, className = '' }) => (
  <div className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8 pb-6 border-b border-[#253243] ${className}`}>
    <div>
      <h1 className="text-xl font-semibold text-slate-100 tracking-tight">{title}</h1>
      {description && (
        <p className="text-sm text-slate-400 mt-1">{description}</p>
      )}
    </div>
    {actions && (
      <div className="flex items-center gap-2 shrink-0">
        {actions}
      </div>
    )}
  </div>
)

export default PageHeader
