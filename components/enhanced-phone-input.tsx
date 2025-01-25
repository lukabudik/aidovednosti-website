'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
interface CountryCode {
  code: string
  name: string
  dialCode: string
}

const countryData = {
  CZ: { name: 'Česká republika', dialCode: '+420' },
  SK: { name: 'Slovensko', dialCode: '+421' },
  DE: { name: 'Německo', dialCode: '+49' },
  AT: { name: 'Rakousko', dialCode: '+43' },
  PL: { name: 'Polsko', dialCode: '+48' },
  HU: { name: 'Maďarsko', dialCode: '+36' }
}

const popularCountries: CountryCode[] = [
  { code: 'CZ', ...countryData.CZ },
  { code: 'SK', ...countryData.SK },
  { code: 'DE', ...countryData.DE },
  { code: 'AT', ...countryData.AT },
  { code: 'INT', name: 'International', dialCode: '' }
]

const allCountries: CountryCode[] = Object.entries(countryData)
  .map(([code, data]) => ({
    code,
    ...data
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

interface EnhancedPhoneInputProps {
  value?: string
  onChange: (value: string) => void
  error?: string
}

export default function EnhancedPhoneInput({ value, onChange, error }: EnhancedPhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(popularCountries[0])
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    // Extract phone number without country code
    if (value) {
      const match = value.match(/^\+\d{3}\s(.*)$/)
      if (match) {
        setPhoneNumber(match[1])
      }
    } else {
      setPhoneNumber('')
    }
  }, [value])

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country)
    setIsOpen(false)
    // Preserve the phone number part when changing country
    onChange(`${country.dialCode} ${phoneNumber}`)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    
    // Check if input starts with a plus
    if (input.startsWith('+')) {
      // User is typing a country code
      const match = input.match(/^\+(\d{1,4})\s*(.*)$/)
      if (match) {
        const [_, dialCode, rest] = match
        const country = popularCountries.find(c => c.dialCode === `+${dialCode}`) 
          || { code: 'INT', name: 'International', dialCode: `+${dialCode}` }
        
        setSelectedCountry(country)
        setPhoneNumber(rest)
        onChange(input)
      } else {
        onChange(input)
      }
    } else {
      // Format the rest of the number
      const cleaned = input.replace(/[^\d]/g, '') // Remove all non-digits including spaces
      let formatted = cleaned
      
      // Apply Czech number formatting (xxx xxx xxx)
      if (selectedCountry.code === 'CZ') {
        const match = cleaned.match(/^(\d{3})?(\d{3})?(\d{3})?$/)
        if (match) {
          formatted = match.slice(1).filter(Boolean).join(' ')
        }
      } else {
        // For other countries, group by 3 digits
        formatted = cleaned.replace(/(\d{3})(?=\d)/g, '$1 ').trim()
      }
      
      setPhoneNumber(formatted)
      onChange(selectedCountry.dialCode ? `${selectedCountry.dialCode} ${formatted}` : formatted)
    }
  }

  return (
    <div className="relative">
      <div className="relative">
        <div className="relative flex items-center">
          <select
            value={selectedCountry.code}
            onChange={(e) => {
              const country = [...popularCountries, ...allCountries].find(c => c.code === e.target.value) || popularCountries[0]
              handleCountrySelect(country)
            }}
            className="absolute left-0 z-20 opacity-0 w-24 h-full cursor-pointer"
          >
            <optgroup label="Popular">
              {popularCountries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="All Countries">
              {allCountries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </optgroup>
          </select>
          
          <div className="absolute left-0 flex items-center px-3 py-2 space-x-2 text-gray-700 pointer-events-none">
            {selectedCountry.code !== 'INT' && (
              <Image
                src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
                alt={selectedCountry.name}
                width={20}
                height={15}
                className="rounded-sm"
              />
            )}
            <span className="text-sm text-gray-600">{selectedCountry.dialCode || '+'}</span>
          </div>
          
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            className={`pl-24 pr-4 py-2.5 block w-full rounded-lg border ${
              error ? 'border-red-300' : 'border-gray-200'
            } bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-offset-0 transition-all duration-200 text-sm`}
            placeholder={selectedCountry.code === 'CZ' ? '777 123 456' : '123 456 789'}
          />
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
