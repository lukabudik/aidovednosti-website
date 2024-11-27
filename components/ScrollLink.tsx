'use client'

import { ReactNode } from 'react'

interface ScrollLinkProps {
  to: string
  children: ReactNode
  className?: string
  smooth?: boolean
  duration?: number
}

export default function ScrollLink({ to, children, className, smooth = true }: ScrollLinkProps) {
  const handleClick = () => {
    const element = document.getElementById(to)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - 100 // Adjust offset as needed

      window.scrollTo({
        top: offsetPosition,
        behavior: smooth ? 'smooth' : 'auto'
      })
    }
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
