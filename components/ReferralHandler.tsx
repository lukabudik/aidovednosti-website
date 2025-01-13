'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { setCookie, getCookie } from '@/utils/cookies'

export default function ReferralHandler() {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const ref = searchParams.get('ref')
    const existingRef = getCookie('referral')
    
    if (ref && !existingRef) {
      // Set cookie for 60 days
      setCookie('referral', ref, 60)
    }
  }, [searchParams])

  return null
}
