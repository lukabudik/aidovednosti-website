'use client'

import React from 'react'

interface FinancingOption {
  title: string
  price: {
    amount: string
    currency: string
    includesVat?: boolean
  }
  savings?: {
    amount: string
    label: string
  }
  description: string
  features: {
    text: string
    enabled: boolean
  }[]
  cta: {
    text: string
    href: string
  }
  badge?: string
}

interface FinancingOptionsProps {
  heading: {
    title: string
    subtitle: string
  }
  options: FinancingOption[]
}

const FinancingOptions = ({ heading, options }: FinancingOptionsProps) => {
  return (
    <section className="bg-zinc-50 py-6 md:py-8" id={"koupit"}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center pb-6 md:pb-8">
          <h2 className="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-900 mb-4">{heading.title}</h2>
          <p className="text-lg text-zinc-500">{heading.subtitle}</p>
        </div>
        <div className="max-w-sm mx-auto grid gap-6 lg:grid-cols-2 lg:gap-12 items-start lg:max-w-none">
          {options.map((option, index) => (
            <div key={index} className="relative flex flex-col h-full p-4 bg-white rounded-lg border border-zinc-200 shadow-sm">
              {option.badge && (
                <div className="absolute -top-3 -right-3 bg-zinc-900 text-white text-xs font-bold py-1 px-3 rounded-full">
                  {option.badge}
                </div>
              )}
              <div className="mb-4">
                <div className="text-xl font-bold mb-1 text-zinc-900">{option.title}</div>
                <div className="inline-flex items-baseline mb-2">
                  <span className="text-zinc-900 font-bold text-4xl">{option.price.amount}</span>
                  <span className="text-zinc-500 font-medium ml-2">
                    {option.price.currency}
                    {option.price.includesVat && ' vč. DPH'}
                  </span>
                </div>
                {option.savings && (
                  <div className="text-emerald-500 font-semibold">
                    {option.savings.label} {option.savings.amount}
                  </div>
                )}
              </div>
              <div className="text-zinc-500 mb-3">
                {option.description}
              </div>
              <ul className="text-zinc-500 space-y-3 grow">
                {option.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg 
                      className={`w-3 h-3 ${feature.enabled ? 'fill-emerald-500' : 'fill-zinc-300'} mr-3 shrink-0`} 
                      viewBox="0 0 12 12" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span className={feature.enabled ? '' : 'line-through'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a 
                  className={`btn w-full shadow ${
                    index === 0 
                      ? 'text-white bg-blue-700 hover:bg-blue-800 transform hover:translate-y-[-2px] transition-all duration-300' 
                      : 'text-zinc-600 bg-white hover:text-zinc-900 border border-zinc-200'
                  }`} 
                  href={option.cta.href}
                >
                  {option.cta.text}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FinancingOptions
