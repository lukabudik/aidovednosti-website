'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { setCookie, getCookie } from '@/utils/cookies'

function ReferralHandlerInner() {
  const searchParams = useSearchParams()
  
  if (typeof window !== 'undefined') {
    const ref = searchParams.get('ref')
    const existingRef = getCookie('referral')
    
    if (ref && !existingRef) {
      // Set cookie for 60 days
      setCookie('referral', ref, 60)
    }
  }

  return null
}

export default function ReferralHandler() {
  return (
    <Suspense fallback={null}>
      <ReferralHandlerInner />
    </Suspense>
  )
}
