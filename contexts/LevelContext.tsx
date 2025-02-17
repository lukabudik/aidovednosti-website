'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Level = 'beginner' | 'advanced'

interface LevelContextType {
  level: Level
  setLevel: (level: Level) => void
}

const LevelContext = createContext<LevelContextType | undefined>(undefined)

export function LevelProvider({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState<Level>('beginner')
  useEffect(() => {
    // Check URL parameters for level
    const path = window.location.pathname
    if (path === '/asistenti') {
      setLevel('advanced')
    }
  }, [])

  return (
    <LevelContext.Provider value={{ level, setLevel }}>
      {children}
    </LevelContext.Provider>
  )
}

export function useLevel() {
  const context = useContext(LevelContext)
  if (context === undefined) {
    throw new Error('useLevel must be used within a LevelProvider')
  }
  return context
}
