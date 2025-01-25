'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface CountryInfo {
  name: string
  dialCode: string
}

const countryData: Record<string, CountryInfo> = {
  CZ: { name: 'Česká republika', dialCode: '+420' },
  SK: { name: 'Slovensko', dialCode: '+421' },
  DE: { name: 'Německo', dialCode: '+49' },
  AT: { name: 'Rakousko', dialCode: '+43' },
  PL: { name: 'Polsko', dialCode: '+48' },
  HU: { name: 'Maďarsko', dialCode: '+36' },
  INT: { name: 'International', dialCode: '+' },
}

// Define typical maximum digits for each local number (adjust as you wish)
const maxLocalDigitsMap: Record<string, number> = {
  CZ: 9,  // Typical Czech format: 9 digits
  SK: 9,  // Typical Slovak format: 9 digits
  DE: 11, // Germany can vary, but we pick 11 for demonstration
  AT: 10, // Austria example
  PL: 9,
  HU: 9,
  INT: 15 // Arbitrary limit for International
}

interface EnhancedPhoneInputProps {
  value?: string
  onChange: (value: string) => void
  error?: string
}

/**
 * Try to detect if `raw` starts with a known dial code.
 * Returns { countryCode, localPart } if recognized, or 'INT' if not.
 *
 * E.g.:
 *  "+420 123" => { countryCode: "CZ", localPart: "123" }
 *  "+4" => { countryCode: "INT", localPart: "+4" } (not fully matched => fallback)
 */
function detectCountryFromNumber(raw: string) {
  const trimmed = raw.trimStart()

  for (const [code, { dialCode }] of Object.entries(countryData)) {
    if (
        trimmed.startsWith(dialCode) ||
        trimmed.startsWith(dialCode + ' ')
    ) {
      const rest = trimmed.slice(dialCode.length).trimStart()
      return { countryCode: code, localPart: rest }
    }
  }

  return { countryCode: 'INT', localPart: trimmed }
}

/**
 * Limit the local portion to the maximum allowed digits for a given country.
 */
function limitLocalDigits(localNumber: string, countryCode: string): string {
  const maxDigits = maxLocalDigitsMap[countryCode] ?? 15
  // Keep only up to `maxDigits` digits
  const digits = localNumber.replace(/\D/g, '').slice(0, maxDigits)
  // Return them unspaced; we'll format them next
  return digits
}

/**
 * Format local digits into typical grouping patterns.
 * - For CZ/SK: 3-3-3 grouping
 * - For others: chunk into groups of 3
 */
function formatLocalNumber(localNumberDigits: string, countryCode: string): string {
  if (countryCode === 'CZ' || countryCode === 'SK') {
    // e.g., 3-3-3 => "123 456 789"
    const match = localNumberDigits.match(/^(\d{1,3})(\d{1,3})?(\d{1,3})?$/)
    if (!match) return localNumberDigits
    const parts = [match[1], match[2], match[3]].filter(Boolean)
    return parts.join(' ')
  }

  // Default: chunk into groups of 3
  const chunks = localNumberDigits.match(/.{1,3}/g) || []
  return chunks.join(' ')
}

/**
 * Combine dial code and the local portion (with a space if local portion is not empty).
 */
function combineNumber(dialCode: string, localFormatted: string) {
  const trimmedLocal = localFormatted.trim()
  return trimmedLocal ? `${dialCode} ${trimmedLocal}` : dialCode
}

export default function EnhancedPhoneInput({
                                             value,
                                             onChange,
                                             error
                                           }: EnhancedPhoneInputProps) {
  // Default to Czech if no initial value is provided
  const [phoneNumber, setPhoneNumber] = useState<string>(
      value && value.trim() !== '' ? value : countryData['CZ'].dialCode + ' '
  )
  // Start with Czech by default
  const [selectedCountry, setSelectedCountry] = useState<string>('CZ')

  const inputRef = useRef<HTMLInputElement>(null)

  // Re-parse if a controlled `value` changes externally
  useEffect(() => {
    if (value === undefined) return
    const externalValue = value.trim()

    if (!externalValue) {
      // If external value is empty, let the user start from scratch
      setPhoneNumber('')
      setSelectedCountry('INT')
      return
    }

    // Detect from external value
    const { countryCode, localPart } = detectCountryFromNumber(externalValue)
    const limitedLocal = limitLocalDigits(localPart, countryCode)

    if (countryCode !== 'INT') {
      const formattedLocal = formatLocalNumber(limitedLocal, countryCode)
      const combined = combineNumber(countryData[countryCode].dialCode, formattedLocal)
      setPhoneNumber(combined)
      setSelectedCountry(countryCode)
    } else {
      // Keep as-is if not recognized
      setPhoneNumber(externalValue)
      setSelectedCountry('INT')
    }
  }, [value])

  /**
   * Handle user typing in the text field.
   */
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value

    // If user cleared it entirely
    if (!rawValue.trim()) {
      setPhoneNumber('')
      setSelectedCountry('INT')
      onChange('')
      return
    }

    // Detect code
    const { countryCode, localPart } = detectCountryFromNumber(rawValue)
    // Limit the local digits for that country
    const limitedLocal = limitLocalDigits(localPart, countryCode)

    if (countryCode !== 'INT') {
      // For recognized code, chunk it
      const formattedLocal = formatLocalNumber(limitedLocal, countryCode)
      const newPhone = combineNumber(countryData[countryCode].dialCode, formattedLocal)
      setPhoneNumber(newPhone)
      setSelectedCountry(countryCode)
      onChange(newPhone)
    } else {
      // If not recognized, store raw
      // but still limit digits from the '+' onward
      const newPhone = rawValue.slice(0, 1) === '+'
          ? '+' + limitLocalDigits(rawValue.slice(1), 'INT')
          : rawValue
      setPhoneNumber(newPhone)
      setSelectedCountry('INT')
      onChange(newPhone)
    }
  }

  /**
   * When the user picks a new country from the dropdown.
   */
  const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value

    // For the current phoneNumber, parse out the old code & local
    const { countryCode: oldCode, localPart } = detectCountryFromNumber(phoneNumber)

    // Limit local digits to the new country's maximum
    const limitedLocal = limitLocalDigits(localPart, newCode)
    // Format if not INT
    const newLocal = newCode === 'INT'
        ? limitedLocal
        : formatLocalNumber(limitedLocal, newCode)

    const newPhone = combineNumber(countryData[newCode].dialCode, newLocal)
    setPhoneNumber(newPhone)
    setSelectedCountry(newCode)
    onChange(newPhone)

    // Small highlight effect
    if (inputRef.current) {
      inputRef.current.classList.add('bg-blue-50')
      setTimeout(() => {
        inputRef.current?.classList.remove('bg-blue-50')
      }, 300)
    }
  }

  return (
      <div className="relative">
        <div className="relative flex items-center">
          {/* Dropdown is invisible but sits on top to capture clicks */}
          <select
              value={selectedCountry}
              onChange={handleCountrySelect}
              className="absolute left-0 z-20 w-20 h-full cursor-pointer opacity-0"
              aria-label="Country code selector"
          >
            {Object.entries(countryData).map(([code, data]) => (
                <option key={code} value={code}>
                  {data.name}
                </option>
            ))}
          </select>

          {/* Visible country flag (or globe) */}
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
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0
                   00-9-9m9 9H3m9 9a9 9 0 01-9-9
                   m9 9c1.657 0 3-4.03 3-9s-1.343
                   -9-3-9m0 18c-1.657 0-3-4.03-3-9
                   s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
            ) : (
                <Image
                    src={`https://flagcdn.com/w40/${selectedCountry.toLowerCase()}.png`}
                    alt={countryData[selectedCountry].name}
                    width={20}
                    height={15}
                    className="rounded-sm transition-transform group-hover:scale-105"
                />
            )}
          </div>

          {/* The phone input field itself */}
          <input
              ref={inputRef}
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className={`
            w-full pl-12 pr-3 py-2 rounded-lg border 
            ${error ? 'border-red-300' : 'border-gray-200'}
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
            transition-colors duration-150 ease-in-out
          `}
              placeholder="+420 123 456 789"
          />
        </div>

        {/* Display external error if any */}
        {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
  )
}
