'use client'

import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/public/images/Logo.webp'
import { useState } from 'react'

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  return (
    <header className="absolute top-2 md:top-6 w-full z-30">
      <div className="px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between h-14 border border-transparent [background:linear-gradient(theme(colors.white),theme(colors.white))_padding-box,linear-gradient(120deg,theme(colors.zinc.300),theme(colors.zinc.100),theme(colors.zinc.300))_border-box] rounded-lg px-3">

            {/* Site branding */}
            <div className="shrink-0 mr-4">
              {/* Logo */}
              <Link className="flex items-center justify-center bg-white w-8 h-8 rounded shadow-sm shadow-zinc-950/20" href="/">
                <Image src={Logo} width={24} height={24} alt="Logo" />
              </Link>
            </div>

            {/* Desktop navigation */}
            <nav className="flex grow">
              <ul className="flex grow justify-end flex-wrap items-center">
                {/* Pro koho dropdown */}
                <li className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-sm font-medium text-zinc-500 hover:text-zinc-900 px-3 lg:px-5 py-2 flex items-center transition"
                  >
                    Pro koho
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                      <Link
                        href="/pro/realitaky"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Realiťáky
                      </Link>
                      <Link
                        href="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Veřejnost
                      </Link>
                      <Link
                        href="/pro/podnikatele"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Podnikatele
                      </Link>
                    </div>
                  )}
                </li>

              </ul>
            </nav>

          </div>
        </div>
      </div>
    </header>
  )
}
