'use client'

import React, { createContext, useContext, useState } from 'react'
import { getCookie } from '@/utils/cookies'
import { submitRegistration } from '@/services/airtable'
import toast from 'react-hot-toast'
import Modal from '@/components/ui/modal'
import RegistrationForm, { RegistrationFormData } from '@/components/registration-form'

interface ModalContextType {
  openModal: (dates: any[]) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalDates, setModalDates] = useState<any[]>([])

  const handleSubmit = async (data: RegistrationFormData) => {
    try {
      const cookieReferral = getCookie('referral')
      let selectedLocation = ''
      
      if (data.course !== 'unknown') {
        const selectedDate = modalDates.find(date => date.date === data.course)
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
          Status: 'New'
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
    } catch (error: any) {
      console.error('Form submission error:', error)
      toast.error(`Chyba: ${error.message || 'Něco se pokazilo. Zkuste to prosím znovu.'}`)
    }
  }

  const openModal = (dates: any[]) => {
    setModalDates(dates)
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
