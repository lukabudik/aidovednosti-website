'use client'

import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { CourseDate } from './pricing-dates'

interface RegistrationFormProps {
  dates: {
    date: string;
    type: string;
    location: string;
    cityLocative: string;
    deadline: string;
  }[]
  onSubmit: (data: RegistrationFormData) => void
  onClose: () => void
}

export interface RegistrationFormData {
  name: string
  email: string
  phone?: string
  source?: string
  courseDate: string
  writtenReferral?: string
  cookieReferral?: string
  gdprConsent: boolean
}

export default function RegistrationForm({ dates, onSubmit, onClose }: RegistrationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>()

  const onSubmitWrapper = async (data: RegistrationFormData) => {
    try {
      // Ensure gdprConsent is explicitly converted to boolean
      const formData = {
        ...data,
        gdprConsent: Boolean(data.gdprConsent)
      }
      await onSubmit(formData)
      onClose()
      toast.success('Registrace byla úspěšná! Přesměrováváme vás...')
      setTimeout(() => {
        window.location.href = 'https://www.uradprace.cz/web/cz/vyhledani-rekvalifikacniho-kurzu#/rekvalifikacni-kurz-detail/18900'
      }, 2000)
    } catch (error) {
      toast.error('Něco se pokazilo. Zkuste to prosím znovu.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitWrapper)} className="space-y-4">
      <div>
        <label htmlFor="courseDate" className="block text-sm font-medium text-gray-700">
          Termín kurzu *
        </label>
        <select
          {...register('courseDate', { required: 'Vyberte termín kurzu' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Vyberte termín</option>
          {dates
            .filter(date => {
              const courseDate = new Date(date.date);
              const deadline = date.deadline ? new Date(date.deadline) : null;
              const now = new Date();
              return courseDate > now && (!deadline || deadline > now);
            })
            .map((date, index) => (
              <option key={index} value={date.date}>
                {new Date(date.date).toLocaleDateString('cs-CZ', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })} - {date.location}
              </option>
            ))}
        </select>
        {errors.courseDate && (
          <p className="mt-1 text-sm text-red-600">{errors.courseDate.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Jméno *
        </label>
        <input
          type="text"
          {...register('name', { required: 'Jméno je povinné' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email *
        </label>
        <input
          type="email"
          {...register('email', {
            required: 'Email je povinný',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Neplatný email',
            },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Telefon
        </label>
        <input
          type="tel"
          {...register('phone')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
        <div>
            <label htmlFor="source" className="block text-sm font-medium text-gray-700 flex items-center">
              Promo kód
              <div className="relative ml-1 group">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48 text-center">
                  Zadejte promo kód, který jste obdrželi od našich partnerů nebo ambasadorů
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                {...register('source')}
                placeholder="Zadejte váš promo kód"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-4"
              />
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
              </svg>
              <p className="text-sm text-blue-700 font-medium">
                Získejte dárek v hodnotě 490 Kč
              </p>
            </div>
        </div>
      </div>


      <div className="mt-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              {...register('gdprConsent', { 
                required: 'Pro odeslání formuláře je nutné souhlasit se zpracováním osobních údajů' 
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="gdprConsent" className="text-sm text-gray-600">
              Souhlasím se <a href="https://www.aiinstitute.cz/oou" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">zpracováním osobních údajů</a> *
            </label>
            {errors.gdprConsent && (
              <p className="mt-1 text-sm text-red-600">{errors.gdprConsent.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Zrušit
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            <>
              <span className="opacity-0">Odeslat</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            </>
          ) : (
            'Odeslat'
          )}
        </button>
      </div>
    </form>
  )
}
