import IsItForMe from "@/components/is-it-for-me";

export const metadata = {
  title: 'Home - Creative',
  description: 'Page description',
}

import Hero from '@/components/hero'
import WhatWillYouLearn from '@/components/what-will-you-learn'
import Features02 from '@/components/features-02'
import Features03 from '@/components/features-03'
import PricingTabs from '@/components/pricing-tabs'
import Testimonials from '@/components/testimonials'
import Cta from '@/components/cta'
import PricingDates from "@/components/pricing-dates";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWillYouLearn />
        <IsItForMe />
        <PricingDates />
      <Features02 />
      <Features03 />
      <PricingTabs />
      <Testimonials />
      <Cta />
    </>
  )
}
