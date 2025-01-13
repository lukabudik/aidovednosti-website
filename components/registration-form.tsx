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
}

export default function RegistrationForm({ dates, onSubmit, onClose }: RegistrationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>()

  const onSubmitWrapper = async (data: RegistrationFormData) => {
    try {
      await onSubmit(data)
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

      <div>
        <label htmlFor="source" className="block text-sm font-medium text-gray-700">
          Odkud jste o nás slyšeli?
        </label>
        <input
          type="text"
          {...register('source')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>


      <div className="mt-6 flex justify-end space-x-3">
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
