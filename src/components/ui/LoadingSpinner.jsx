const sizes = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-[3px]',
  xl: 'h-16 w-16 border-4',
}

const LoadingSpinner = ({ size = 'md', className = '', fullScreen = false }) => {
  const spinner = (
    <div
      className={`
        rounded-full border-gray-700 border-t-indigo-500 animate-spin
        ${sizes[size]}
        ${className}
      `}
      role="status"
      aria-label="Loading"
    />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm z-50">
        {spinner}
      </div>
    )
  }

  return spinner
}

export default LoadingSpinner
