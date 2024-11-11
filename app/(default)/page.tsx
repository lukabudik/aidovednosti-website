export const metadata = {
  title: 'AI Dovednosti - Ovládni umělou inteligenci',
  description: 'Kurz AI Dovednosti ti pomůže ovládnout umělou inteligenci a strojové učení. Získej nové dovednosti a získej lepší práci.',
}

import Hero from '@/components/hero'
import WhatWillYouLearn from '@/components/what-will-you-learn'
import IsItForMe from '@/components/is-it-for-me'
import Features02 from '@/components/features-02'
import Features03 from '@/components/features-03'
import PricingDates from '@/components/pricing-dates'
import MeetTrainers from '@/components/meet-trainers'
import Bonuses from '@/components/bonuses'
import Testimonials from '@/components/testimonials'
import Cta from '@/components/cta'
import CourseProgramme from '@/components/course-programme'
import FinancingOptions from '@/components/financing-options'
import SignInInstructions from '@/components/SignInInstructions'
import PartnerLogos from '@/components/PartnerLogos'

export default function Home() {
  return (
    <>
      <Hero />
        <MeetTrainers />
        <PricingDates />
        <FinancingOptions />

        <CourseProgramme />
        <WhatWillYouLearn />

      <Bonuses />
      <Testimonials />
      <SignInInstructions />
      {/* <PartnerLogos /> */}
    </>
  )
}
