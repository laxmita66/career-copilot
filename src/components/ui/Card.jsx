const Card = ({ children, className = '', hover = false, padding = true, ...props }) => {
  return (
    <div
      className={`
        bg-gray-900 border border-gray-800 rounded-xl
        ${hover ? 'hover:border-gray-700 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200' : ''}
        ${padding ? 'p-6' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3 className={`text-xl font-semibold text-gray-100 ${className}`} {...props}>
      {children}
    </h3>
  )
}

const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`text-sm text-gray-400 mt-1 ${className}`} {...props}>
      {children}
    </p>
  )
}

const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-800 ${className}`} {...props}>
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Footer = CardFooter

export default Card
