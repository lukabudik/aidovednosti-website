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
  const [validLocationParam, setValidLocationParam] = useState<string | null>(null)
  const [promoCodeParam, setPromoCodeParam] = useState<string | null>(null)
  
  // Add a console log whenever parameters change
  useEffect(() => {
    console.log('Advanced - validDateParam changed:', validDateParam);
    console.log('Advanced - validLocationParam changed:', validLocationParam);
    console.log('Advanced - promoCodeParam changed:', promoCodeParam);
  }, [validDateParam, validLocationParam, promoCodeParam]);
  
  // Filter course dates to only show advanced courses
  const advancedCourseDates = courseDates.filter(date => date.level === 'advanced')
  
  // Get the date and location parameters from the URL on the client side
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const dateParam = searchParams.get('date')
    const locationParam = searchParams.get('location')
    const promoCode = searchParams.get('promo')
    
    // Set promo code if provided
    if (promoCode) {
      setPromoCodeParam(promoCode)
    }
    
    if (!dateParam) {
      return; // No date parameter provided
    }
    
    // Find all advanced courses on the specified date
    const coursesOnDate = advancedCourseDates.filter(date => date.date === dateParam)
    
    if (coursesOnDate.length === 0) {
      // No courses found for this date
      toast.error('Neplatné datum v URL. Prosím vyberte termín z nabídky.')
      return;
    }
    
    if (coursesOnDate.length === 1) {
      // Only one course on this date, so we can select it directly
      setValidDateParam(dateParam)
      return;
    }
    
    // Multiple courses on the same date, so we need to check location
    if (locationParam) {
      // Decode the URL-encoded location parameter
      const decodedLocation = decodeURIComponent(locationParam)
      const matchingCourse = coursesOnDate.find(course => course.location === decodedLocation)
      if (matchingCourse) {
        setValidDateParam(dateParam)
        setValidLocationParam(decodedLocation)
      } else {
        toast.error(`Pro datum ${dateParam} neexistuje pokročilý kurz v lokaci "${decodedLocation}". Prosím vyberte správnou lokaci.`)
      }
    } else {
      // Multiple courses on the same date but no location specified
      toast.error(`Pro datum ${dateParam} existuje více pokročilých kurzů v různých lokacích. Prosím upřesněte lokaci v URL.`)
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
        // Parse the course value to get date and location
        const [courseDate, courseLocation] = data.course.split('|');
        
        // If the course value is in the new format (date|location)
        if (courseLocation) {
          selectedLocation = courseLocation;
          // Update data.course to just the date part for backward compatibility
          data.course = courseDate;
        } else {
          // Fallback for backward compatibility
          const selectedDate = advancedCourseDates.find(date => date.date === data.course)
          if (!selectedDate) {
            throw new Error('Selected date not found')
          }
          selectedLocation = selectedDate.location
        }
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
        Status: 'New',
        Level: 'advanced' // Always advanced for this page
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
            preselectedLocation={validLocationParam}
            preselectedPromoCode={promoCodeParam}
          />
        </div>
      </div>
    </div>
  )
}
