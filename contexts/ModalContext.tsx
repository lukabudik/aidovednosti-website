'use client'

import React, { createContext, useContext, useState } from 'react'
import { getCookie } from '@/utils/cookies'
import { submitRegistration } from '@/services/airtable'
import toast from 'react-hot-toast'
import Modal from '@/components/ui/modal'
import RegistrationForm, { RegistrationFormData } from '@/components/registration-form'
import { CourseDate } from '@/components/pricing-dates'

// Define the type expected by the RegistrationForm component
interface RegistrationFormDate {
  date: string;
  type: string;
  location: string;
  cityLocative: string;
  level: string;
  focus?: string;
  deadline?: string;
  isFull?: boolean;
}

interface ModalContextType {
  openModal: (dates: CourseDate[]) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalDates, setModalDates] = useState<RegistrationFormDate[]>([])

  // Helper function to convert CourseDate[] to RegistrationFormDate[]
  const convertDates = (dates: CourseDate[]): RegistrationFormDate[] => {
    return dates.map(date => ({
      date: date.date instanceof Date ? date.date.toISOString().split('T')[0] : date.date,
      type: date.type,
      location: date.location,
      cityLocative: date.cityLocative,
      level: date.level,
      focus: date.focus,
      deadline: date.deadline instanceof Date ? date.deadline.toISOString().split('T')[0] : date.deadline,
      isFull: date.isFull
    }));
  };

  const handleSubmit = async (data: RegistrationFormData) => {
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
          const selectedDate = modalDates.find(date => date.date === data.course)
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
      const selectedDate = data.course !== 'unknown' ? 
        modalDates.find(date => date.date === data.course) : null;
      const level: 'beginner' | 'advanced' = selectedDate?.level === 'advanced' ? 'advanced' : 'beginner';

      const promise = toast.promise(
        submitRegistration({
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
        }),
        {
          loading: 'Odesílám registraci...',
          success: 'Registrace byla úspěšně odeslána!',
          error: (err) => `Chyba: ${err.message || 'Něco se pokazilo. Zkuste to prosím znovu.'}`,
        }
      )

      await promise
      
      setTimeout(() => {
        setIsModalOpen(false)
      }, 1000)
    } catch (error: unknown) {
      console.error('Form submission error:', error)
      let errorMessage = 'Něco se pokazilo. Zkuste to prosím znovu.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast.error(`Chyba: ${errorMessage}`)
    }
  }

  const openModal = (dates: CourseDate[]) => {
    // The dates passed to openModal are already filtered by the page component
    // (e.g., Hero component in app/(default)/page.tsx filters for beginner courses)
    // So we just need to convert them to the format expected by the RegistrationForm
    setModalDates(convertDates(dates))
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Registrace na kurz"
      >
        <RegistrationForm
          dates={modalDates}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      </Modal>
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
