'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

/** Extended country info for validation & placeholders */
interface ExtendedCountryInfo {
  name: string
  dialCode: string
  minLength: number
  maxLength: number
  example: string
}

const extendedCountryData: Record<string, ExtendedCountryInfo> = {
  CZ: {
    name: 'Česká republika',
    dialCode: '+420',
    minLength: 9,
    maxLength: 9,
    example: '+420 777 123 456'
  },
  SK: {
    name: 'Slovensko',
    dialCode: '+421',
    minLength: 9,
    maxLength: 9,
    example: '+421 907 123 456'
  },
  DE: {
    name: 'Německo',
    dialCode: '+49',
    minLength: 7,
    maxLength: 11,
    example: '+49 157 123 4567'
  },
  AT: {
    name: 'Rakousko',
    dialCode: '+43',
    minLength: 7,
    maxLength: 10,
    example: '+43 664 123 456'
  },
  PL: {
    name: 'Polsko',
    dialCode: '+48',
    minLength: 9,
    maxLength: 9,
    example: '+48 123 456 789'
  },
  HU: {
    name: 'Maďarsko',
    dialCode: '+36',
    minLength: 8,
    maxLength: 9,
    example: '+36 70 123 456'
  },
  INT: {
    name: 'International',
    dialCode: '+',
    minLength: 1,
    maxLength: 15,
    example: '+ 123 456 789'
  }
}

interface EnhancedPhoneInputProps {
  value?: string
  onChange: (value: string) => void
  /** An external error message (e.g. from form validation) */
  error?: string
}

/**
 * Detect if 'raw' starts with a known dial code.
 * Returns { countryCode, localPart } if recognized, or { 'INT', raw } if not.
 */
function detectCountryFromNumber(raw: string) {
  const trimmed = raw.trimStart()

  for (const [code, { dialCode }] of Object.entries(extendedCountryData)) {
    if (trimmed.startsWith(dialCode) || trimmed.startsWith(dialCode + ' ')) {
      const rest = trimmed.slice(dialCode.length).trimStart()
      return { countryCode: code, localPart: rest }
    }
  }
  return { countryCode: 'INT', localPart: trimmed }
}

/**
 * Enforce a maximum digit count (based on country).
 * We'll trim any extra digits beyond maxLength.
 */
function limitLocalDigits(localPart: string, countryCode: string): string {
  const { maxLength } = extendedCountryData[countryCode] || extendedCountryData.INT
  // Extract digits only, then limit to maxLength
  const digits = localPart.replace(/\D/g, '').slice(0, maxLength)
  return digits
}

/**
 * Format local digits with spaces (e.g. for CZ 3-3-3, default 3-3-3..).
 */
function formatLocalNumber(localDigits: string, countryCode: string): string {
  const { dialCode, minLength, maxLength } = extendedCountryData[countryCode]

  // Czech & Slovak: 3-3-3
  if (countryCode === 'CZ' || countryCode === 'SK') {
    const match = localDigits.match(/^(\d{1,3})(\d{1,3})?(\d{1,3})?$/)
    if (!match) return localDigits
    const parts = [match[1], match[2], match[3]].filter(Boolean)
    return parts.join(' ')
  }

  // Default: chunk into groups of 3
  const chunks = localDigits.match(/.{1,3}/g) || []
  return chunks.join(' ')
}

/**
 * Combine dial code with local portion, separated by space if not empty.
 */
function combineNumber(dialCode: string, localFormatted: string) {
  const trimmed = localFormatted.trim()
  return trimmed ? `${dialCode} ${trimmed}` : dialCode
}

/**
 * Validate local digits length is within [minLength, maxLength].
 */
function validateLocalDigits(countryCode: string, localDigits: string): boolean {
  const { minLength, maxLength } = extendedCountryData[countryCode]
  // localDigits here is just digits; check length
  const length = localDigits.length
  return length >= minLength && length <= maxLength
}

export default function EnhancedPhoneInput({
                                             value,
                                             onChange,
                                             error
                                           }: EnhancedPhoneInputProps) {
  // Start with Czech if `value` is empty; else use provided `value`
  const defaultValue =
      value && value.trim() !== '' ? value : extendedCountryData.CZ.dialCode + ' '

  const [phoneNumber, setPhoneNumber] = useState<string>(defaultValue)
  const [selectedCountry, setSelectedCountry] = useState<string>('CZ')
  const [internalError, setInternalError] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  // If an external `value` changes, re-parse & re-validate
  useEffect(() => {
    if (value === undefined) return

    const trimmed = value.trim()
    if (!trimmed) {
      setPhoneNumber('')
      setSelectedCountry('INT')
      setInternalError('')
      return
    }

    const { countryCode, localPart } = detectCountryFromNumber(trimmed)
    const limitedLocal = limitLocalDigits(localPart, countryCode)

    if (countryCode !== 'INT') {
      const formatted = formatLocalNumber(limitedLocal, countryCode)
      const combined = combineNumber(extendedCountryData[countryCode].dialCode, formatted)
      setPhoneNumber(combined)
      setSelectedCountry(countryCode)

      // Run validation
      const isValid = validateLocalDigits(countryCode, limitedLocal)
      setInternalError(isValid ? '' : getValidationMessage(countryCode))
    } else {
      // unrecognized => store raw, fallback to INT
      setPhoneNumber(trimmed)
      setSelectedCountry('INT')

      const isValid = validateLocalDigits('INT', limitedLocal)
      setInternalError(isValid ? '' : getValidationMessage('INT'))
    }
  }, [value])

  /**
   * Construct a dynamic validation message based on the country’s example format.
   * E.g.: "Zadejte platné telefonní číslo ve formátu +420 777 123 456"
   */
  function getValidationMessage(countryCode: string) {
    return `Zadejte platné telefonní číslo ve formátu ${extendedCountryData[countryCode].example}`
  }

  /**
   * Handle keystrokes in the input.
   */
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value

    // If completely cleared
    if (!rawValue.trim()) {
      setPhoneNumber('')
      setSelectedCountry('INT')
      setInternalError('')
      onChange('')
      return
    }

    const { countryCode, localPart } = detectCountryFromNumber(rawValue)
    const limitedLocal = limitLocalDigits(localPart, countryCode)

    if (countryCode !== 'INT') {
      // recognized code => format local portion
      const formattedLocal = formatLocalNumber(limitedLocal, countryCode)
      const newPhone = combineNumber(extendedCountryData[countryCode].dialCode, formattedLocal)

      setPhoneNumber(newPhone)
      setSelectedCountry(countryCode)

      // Validate
      const isValid = validateLocalDigits(countryCode, limitedLocal)
      setInternalError(isValid ? '' : getValidationMessage(countryCode))

      onChange(newPhone)
    } else {
      // not recognized => fallback to INT
      // also limit total digits (minus the leading '+')
      const firstChar = rawValue.slice(0, 1)
      // If it starts with '+', preserve that, else keep raw
      const newPhone = firstChar === '+'
          ? '+' + limitLocalDigits(rawValue.slice(1), 'INT')
          : rawValue

      setPhoneNumber(newPhone)
      setSelectedCountry('INT')

      // Validate for 'INT'
      const isValid = validateLocalDigits('INT', limitLocalDigits(localPart, 'INT'))
      setInternalError(isValid ? '' : getValidationMessage('INT'))

      onChange(newPhone)
    }
  }

  /**
   * Handle user selecting a new country from the dropdown.
   */
  const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value

    const { countryCode: oldCode, localPart } = detectCountryFromNumber(phoneNumber)
    // Limit local digits to the new country’s max
    const limitedLocal = limitLocalDigits(localPart, newCode)

    // Format if not INT
    const newLocal = newCode === 'INT'
        ? limitedLocal
        : formatLocalNumber(limitedLocal, newCode)

    const newPhone = combineNumber(extendedCountryData[newCode].dialCode, newLocal)
    setPhoneNumber(newPhone)
    setSelectedCountry(newCode)

    // Validate
    const isValid = validateLocalDigits(newCode, limitedLocal)
    setInternalError(isValid ? '' : getValidationMessage(newCode))

    onChange(newPhone)

    // Subtle highlight effect
    if (inputRef.current) {
      inputRef.current.classList.add('bg-blue-50')
      setTimeout(() => {
        inputRef.current?.classList.remove('bg-blue-50')
      }, 300)
    }
  }

  // If external error is provided, show that in priority; else show our internalError
  const finalError = error || internalError

  return (
      <div className="relative">
        <div className="relative flex items-center">
          {/* Invisible select to capture country changes */}
          <select
              value={selectedCountry}
              onChange={handleCountrySelect}
              className="absolute left-0 z-20 w-20 h-full cursor-pointer opacity-0"
              aria-label="Country code selector"
          >
            {Object.entries(extendedCountryData).map(([code, data]) => (
                <option key={code} value={code}>
                  {data.name}
                </option>
            ))}
          </select>

          {/* Flag or globe icon */}
          <div className="absolute left-0 flex items-center px-3 py-2 space-x-2 text-gray-700 pointer-events-none group">
            {selectedCountry === 'INT' ? (
                <svg
                    className="w-5 h-5 text-gray-500 transition-transform group-hover:scale-105"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9
                   9 0 00-9-9m9 9H3m9 9a9 9 0
                   01-9-9m9 9c1.657 0 3-4.03
                   3-9s-1.343-9-3-9m0 18
                   c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
            ) : (
                <Image
                    src={`https://flagcdn.com/w40/${selectedCountry.toLowerCase()}.png`}
                    alt={extendedCountryData[selectedCountry].name}
                    width={20}
                    height={15}
                    className="rounded-sm transition-transform group-hover:scale-105"
                />
            )}
          </div>

          {/* Phone input */}
          <input
              ref={inputRef}
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className={`
            w-full pl-12 pr-3 py-2 rounded-lg border
            ${finalError ? 'border-red-300' : 'border-gray-200'}
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
            transition-colors duration-150 ease-in-out
          `}
              placeholder={extendedCountryData[selectedCountry].example}
          />
        </div>

        {/* Show external error if any; else show our internal validation error */}
        {finalError && (
            <p className="mt-1 text-sm text-red-600">{finalError}</p>
        )}
      </div>
  )
}
