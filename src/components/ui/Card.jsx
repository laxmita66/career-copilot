const Card = ({ children, className = '', hover = false, padding = true, ...props }) => (
  <div
    className={`
      bg-[#121820] border border-[#253243] rounded-xl
      ${hover ? 'hover:border-[#374151] transition-colors duration-150' : ''}
      ${padding ? 'p-6' : ''}
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
)

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>{children}</div>
)

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-base font-semibold text-slate-100 ${className}`} {...props}>{children}</h3>
)

const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-slate-400 mt-1 ${className}`} {...props}>{children}</p>
)

const CardContent = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>{children}</div>
)

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-4 pt-4 border-t border-[#253243] ${className}`} {...props}>{children}</div>
)

Card.Header      = CardHeader
Card.Title       = CardTitle
Card.Description = CardDescription
Card.Content     = CardContent
Card.Footer      = CardFooter

export default Card
