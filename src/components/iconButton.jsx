'use client'
export const IconButton = ({ handleClick, children }) => {
  return (
    <section
      onClick={handleClick}
    >
      {children}
    </section>
  )
}
