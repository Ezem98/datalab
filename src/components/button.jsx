export const Button = ({ children, color, onClick }) => {
  let bgColor
  let focusColor
  let textColor

  if (color === 'primary') {
    bgColor = 'bg-primary'
    focusColor = 'focus:ring-green-700'
    textColor = 'text-quaternary'
  } else if (color === 'secondary') {
    bgColor = 'bg-gray-100'
    focusColor = 'focus:ring-quinary'
    textColor = 'text-quinary'
  }

  const dynamicClassName = `${bgColor} rounded-xl px-4 py-2 focus:ring ${focusColor} border-none text-lg ${textColor} active:transform active:translate-y-1`

  return (
    <button className={dynamicClassName} onClick={onClick}>
      {children}
    </button>
  )
}
