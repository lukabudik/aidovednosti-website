'use client'

import React, { createContext, useContext, useState } from 'react'
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

  const handleSubmit = (data: RegistrationFormData) => {
    console.log('Form submitted:', data)
    setIsModalOpen(false)
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
