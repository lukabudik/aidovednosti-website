'use client'

import { useState, useEffect } from 'react'
import RegistrationForm, { RegistrationFormData } from '@/components/registration-form'
import { courseDates } from '@/data/course-dates'
import toast from 'react-hot-toast'
import { submitRegistration } from '@/services/airtable'
import { getCookie } from '@/utils/cookies'
import { trackRegistration } from '@/utils/facebook-pixel'

export default function AdvancedRegistrationPageClient() {
  const [validDateParam, setValidDateParam] = useState<string | null>(null)
  
  // Filter course dates to only show advanced courses
  const advancedCourseDates = courseDates.filter(date => date.level === 'advanced')
  
  // Get the date parameter from the URL on the client side
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const param = searchParams.get('date')
    
    // Validate that the date parameter exists in advancedCourseDates
    const isValid = param && advancedCourseDates.some(date => date.date === param)
    setValidDateParam(isValid ? param : null)
    
    // Show a notification if an invalid date was provided
    if (param && !isValid) {
      toast.error('Neplatné datum v URL. Prosím vyberte termín z nabídky.')
    }
  }, [advancedCourseDates])
  
  const [, setIsSubmitting] = useState(false)

  // Function to handle form submission
  const handleSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true)
    try {
      const cookieReferral = getCookie('referral')
      let selectedLocation = ''
      
      if (data.course !== 'unknown') {
        const selectedDate = advancedCourseDates.find(date => date.date === data.course)
        if (!selectedDate) {
          throw new Error('Selected date not found')
        }
        selectedLocation = selectedDate.location
      }

      console.log('Form submission data:', {
        formData: data,
        cookieReferral,
        selectedLocation
      })

      await submitRegistration({
        Name: data.name,
        Email: data.email,
        Phone: data.phone,
        ReferralCodeWritten: data.writtenReferral || '',
        ReferralCodeCookies: cookieReferral || '',
        Course: data.course === 'unknown' ? 'Zatím nevybrán' : (() => {
          const date = new Date(data.course);
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          return `${day}.${month}. ${year} - ${selectedLocation}`;
        })(),
        GDPRConsent: true,
        Status: 'New'
      })
      
      trackRegistration() // Track the conversion
      toast.success('Registrace byla úspěšná! Přesměrováváme vás...')
      
      setTimeout(() => {
        // Advanced courses always redirect to the advanced course URL
        window.location.href = 'https://www.uradprace.cz/web/cz/vyhledani-rekvalifikacniho-kurzu#/rekvalifikacni-kurz-detail/18901';
      }, 2000)
      
      return { success: true }
    } catch (error: unknown) {
      console.error('Form submission error:', error)
      let errorMessage = 'Něco se pokazilo. Zkuste to prosím znovu.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast.error(`Chyba: ${errorMessage}`)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  // Function to close the form (redirects to homepage in this case)
  const handleClose = () => {
    window.location.href = '/asistenti'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Registrace na pokročilý kurz</h1>
          <p className="text-gray-600 mb-8">
            Vyplňte prosím registrační formulář níže pro přihlášení na pokročilý kurz.
          </p>
          
          <RegistrationForm 
            dates={advancedCourseDates} 
            onSubmit={handleSubmit} 
            onClose={handleClose}
            preselectedDate={validDateParam}
          />
        </div>
      </div>
    </div>
  )
}
