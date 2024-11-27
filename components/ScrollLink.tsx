'use client'

import { ReactNode } from 'react'

interface ScrollLinkProps {
  to: string
  children: ReactNode
  className?: string
}

export default function ScrollLink({ to, children, className }: ScrollLinkProps) {
  const handleClick = () => {
    const element = document.getElementById(to)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
