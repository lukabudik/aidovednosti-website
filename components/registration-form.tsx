'use client'

import { useForm, Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input'
import { cs } from '@/app/translations/phone-input-cs'
import '@/app/css/additional-styles/phone-input.css'
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
  courseDate: string | 'unknown'
  writtenReferral?: string
  cookieReferral?: string
  gdprConsent: boolean
}

export default function RegistrationForm({ dates, onSubmit, onClose }: RegistrationFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>()

  const onSubmitWrapper = async (data: RegistrationFormData) => {
    try {
      const formData = {
        ...data,
        gdprConsent: Boolean(data.gdprConsent),
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
    <form onSubmit={handleSubmit(onSubmitWrapper)} className="space-y-4" noValidate>
      <div>
        <label htmlFor="courseDate" className="block text-sm font-medium text-gray-700">
          Termín kurzu *
        </label>
        <select
          {...register('courseDate', { required: 'Vyberte termín kurzu' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Vyberte termín</option>
          <option value="unknown">Ještě nevím termín</option>
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
        <div className="mt-1 relative">
          <input
            type="email"
            {...register('email', {
              required: 'Email je povinný',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Neplatný email',
              },
              onChange: (e) => {
                const input = e.target;
                const isValid = input.checkValidity() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
                const errorMessage = document.getElementById('email-error');
                if (errorMessage) {
                  if (!isValid && input.value) {
                    errorMessage.textContent = 'Neplatný email';
                    errorMessage.classList.remove('hidden');
                  } else {
                    errorMessage.classList.add('hidden');
                  }
                }
              }
            })}
            placeholder="vas@email.cz"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <p id="email-error" className="mt-1 text-sm text-red-600 hidden"></p>
        {errors.email && !document.getElementById('email-error')?.textContent && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Telefon
        </label>
        <div className="mt-1">
          <Controller
            name="phone"
            control={control}
            rules={{
              validate: (value) => {
                if (value && !/^\+[1-9]\d{1,14}$/.test(value)) {
                  return 'Zadejte platné telefonní číslo včetně mezinárodní předvolby'
                }
                return true
              }
            }}
            render={({ field: { onChange, value } }) => (
              <div className="relative">
                <PhoneInput
                  international
                  defaultCountry="CZ"
                  value={value}
                  onChange={onChange}
                  labels={cs}
                  placeholder="Zadejte telefonní číslo"
                  className="mt-1 block w-full"
                  countrySelectProps={{
                    className: "PhoneInputCountrySelect"
                  }}
                />
              </div>
            )}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => {
            const promoSection = document.getElementById('promoSection');
            const promoButton = document.getElementById('promoButton');
            if (promoSection && promoButton) {
              promoSection.classList.toggle('max-h-0');
              promoSection.classList.toggle('max-h-40');
              promoSection.classList.toggle('opacity-0');
              promoSection.classList.toggle('opacity-100');
              promoButton.classList.toggle('text-blue-800');
              
              // Rotate the plus icon
              const plusIcon = promoButton.querySelector('svg');
              if (plusIcon) {
                plusIcon.classList.toggle('rotate-45');
              }
            }
          }}
          id="promoButton"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center group transition-colors duration-200"
        >
          <svg 
            className="w-4 h-4 mr-1 transition-transform duration-200 ease-in-out" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4" 
            />
          </svg>
          Zadat promo kód
        </button>
        
        <div 
          id="promoSection" 
          className="max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out"
        >
          <div className="mt-3 px-0.5">
            <div className="relative flex items-center overflow-visible">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg 
                  className="h-5 w-5 text-blue-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>
              <input
                type="text"
                {...register('source', {
                  onChange: (e) => {
                    const giftMessage = document.getElementById('giftMessage');
                    if (giftMessage) {
                      if (e.target.value) {
                        giftMessage.classList.remove('opacity-0', 'max-h-0');
                        giftMessage.classList.add('opacity-100', 'max-h-20');
                      } else {
                        giftMessage.classList.remove('opacity-100', 'max-h-20');
                        giftMessage.classList.add('opacity-0', 'max-h-0');
                      }
                    }
                  }
                })}
                placeholder="Zadejte váš promo kód"
                className="pl-11 pr-4 py-2.5 block w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-offset-0 focus:bg-white transition-all duration-200 text-sm"
              />
            </div>
            <p id="giftMessage" className="mt-2.5 text-sm text-blue-600 font-medium opacity-0 max-h-0 overflow-hidden transition-all duration-300 ease-in-out flex items-center">
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Získáte dárek v hodnotě 490 Kč
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
