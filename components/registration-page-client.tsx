'use client'

import { useState, useEffect } from 'react'
import RegistrationForm, { RegistrationFormData } from '@/components/registration-form'
import { courseDates } from '@/data/course-dates'
import toast from 'react-hot-toast'
import { submitRegistration } from '@/services/airtable'
import { getCookie } from '@/utils/cookies'
import { trackRegistration } from '@/utils/facebook-pixel'

export default function RegistrationPageClient() {
  const [validDateParam, setValidDateParam] = useState<string | null>(null)
  const [validLocationParam, setValidLocationParam] = useState<string | null>(null)
  
  // Add a console log whenever validDateParam changes
  useEffect(() => {
    console.log('validDateParam changed:', validDateParam);
    console.log('validLocationParam changed:', validLocationParam);
  }, [validDateParam, validLocationParam]);
  
  // Get the date and location parameters from the URL on the client side
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const dateParam = searchParams.get('date')
    const locationParam = searchParams.get('location')
    
    console.log('URL Parameters:', { dateParam, locationParam })
    
    if (!dateParam) {
      console.log('No date parameter provided')
      return; // No date parameter provided
    }
    
    // Find all courses on the specified date
    const coursesOnDate = courseDates.filter(date => date.date === dateParam && date.level === 'beginner')
    console.log('Courses on date:', coursesOnDate)
    
    if (coursesOnDate.length === 0) {
      // No courses found for this date
      console.log('No courses found for this date')
      toast.error('Neplatné datum v URL. Prosím vyberte termín z nabídky.')
      return;
    }
    
    if (coursesOnDate.length === 1) {
      // Only one course on this date, so we can select it directly
      console.log('Only one course found, selecting it directly:', coursesOnDate[0])
      setValidDateParam(dateParam)
      return;
    }
    
    // Multiple courses on the same date, so we need to check location
    console.log('Multiple courses found for this date, checking location')
    
    if (locationParam) {
      // Decode the URL-encoded location parameter
      const decodedLocation = decodeURIComponent(locationParam)
      console.log('Decoded location:', decodedLocation)
      
      // Log each course location for comparison
      coursesOnDate.forEach(course => {
        console.log(`Comparing: "${course.location}" with "${decodedLocation}"`, {
          matches: course.location === decodedLocation,
          courseLocationLength: course.location.length,
          decodedLocationLength: decodedLocation.length,
          courseLocationChars: Array.from(course.location).map(c => c.charCodeAt(0)),
          decodedLocationChars: Array.from(decodedLocation).map(c => c.charCodeAt(0))
        })
      })
      
      const matchingCourse = coursesOnDate.find(course => course.location === decodedLocation)
      
      if (matchingCourse) {
        console.log('Matching course found:', matchingCourse)
        setValidDateParam(dateParam)
        setValidLocationParam(decodedLocation)
      } else {
        console.log('No matching course found for location:', decodedLocation)
        toast.error(`Pro datum ${dateParam} neexistuje kurz v lokaci "${decodedLocation}". Prosím vyberte správnou lokaci.`)
      }
    } else {
      // Multiple courses on the same date but no location specified
      console.log('No location specified for a date with multiple courses')
      toast.error(`Pro datum ${dateParam} existuje více kurzů v různých lokacích. Prosím upřesněte lokaci v URL.`)
    }
  }, [])
  
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
          const selectedDate = courseDates.find(date => date.date === data.course)
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

      // Determine the level based on the selected course
      const selectedDate = data.course !== 'unknown' ? courseDates.find(date => date.date === data.course) : null;
      const level: 'beginner' | 'advanced' = selectedDate?.level === 'advanced' ? 'advanced' : 'beginner';

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
        Level: level
      })
      
      trackRegistration() // Track the conversion
      toast.success('Registrace byla úspěšná! Přesměrováváme vás...')
      
      setTimeout(() => {
        const isAdvanced = courseDates.some(date => date.date === data.course && date.level === 'advanced');
        window.location.href = isAdvanced 
          ? 'https://www.uradprace.cz/web/cz/vyhledani-rekvalifikacniho-kurzu#/rekvalifikacni-kurz-detail/18901'
          : 'https://www.uradprace.cz/web/cz/vyhledani-rekvalifikacniho-kurzu#/rekvalifikacni-kurz-detail/18900';
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
    window.location.href = '/'
  }

  // Filter course dates to only show beginner courses
  const beginnerCourseDates = courseDates.filter(date => date.level === 'beginner')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Registrace na kurz</h1>
          <p className="text-gray-600 mb-8">
            Vyplňte prosím registrační formulář níže pro přihlášení na kurz.
          </p>
          
          <RegistrationForm 
            dates={beginnerCourseDates} 
            onSubmit={handleSubmit} 
            onClose={handleClose}
            preselectedDate={validDateParam}
            preselectedLocation={validLocationParam}
          />
        </div>
      </div>
    </div>
  )
}
