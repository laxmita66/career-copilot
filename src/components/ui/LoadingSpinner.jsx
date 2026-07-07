const sizes = {
  sm: 'h-4 w-4 border-2',
  md: 'h-7 w-7 border-2',
  lg: 'h-10 w-10 border-[3px]',
  xl: 'h-14 w-14 border-[3px]',
}

const LoadingSpinner = ({ size = 'md', className = '', fullScreen = false }) => {
  const spinner = (
    <div
      className={`rounded-full border-[#253243] border-t-[#0f766e] animate-spin ${sizes[size]} ${className}`}
      role="status"
      aria-label="Loading"
    />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#080f14]/80 z-50">
        {spinner}
      </div>
    )
  }

  return spinner
}

export default LoadingSpinner
