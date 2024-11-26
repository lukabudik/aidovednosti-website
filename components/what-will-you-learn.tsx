'use client'

import { useState } from 'react'
import Image from 'next/image'
import FeatureIllustration from '@/public/images/feature-illustration.png'
import FeatureImage01 from '@/public/images/feature-01.png'

interface Tab {
  id: number
  title: string
  description: string
  content: {
    title: string
    list: string[]
  }
}

interface WhatWillYouLearnProps {
  heading: {
    title: string
    subtitle: string
  }
  tabs: Tab[]
}

export default function WhatWillYouLearn({ heading, tabs }: WhatWillYouLearnProps) {
  const [tab, setTab] = useState<number>(1)

  return (
    <section className="bg-zinc-50">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6">
        <div className="max-w-3xl mx-auto text-center pb-8">
          <h2 className="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-900 mb-4">{heading.title}</h2>
          <p className="text-lg text-zinc-500">{heading.subtitle}</p>
        </div>
        <div>
            {/* Tabs buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  className={`text-left px-4 py-5 border border-transparent rounded cursor-pointer transition-all duration-300 transform hover:scale-105 ${tab !== item.id ? 'bg-zinc-100 hover:bg-zinc-50' : '[background:linear-gradient(theme(colors.white),theme(colors.white))_padding-box,linear-gradient(120deg,theme(colors.zinc.300),theme(colors.zinc.100),theme(colors.zinc.300))_border-box] shadow-sm rotate-1'}`}
                  onClick={() => setTab(item.id)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-inter-tight font-semibold text-zinc-900">{item.title}</div>
                    <div className="flex items-center">
                      {tab !== item.id && (
                        <span className="text-xs text-zinc-400 mr-2">Klikni a zjisti víc</span>
                      )}
                      <svg className={`fill-zinc-400 shrink-0 transition-transform duration-300 ${tab === item.id ? 'rotate-0' : '-rotate-45'}`} xmlns="http://www.w3.org/2000/svg" width="10" height="10">
                        <path d="M8.667.186H2.675a.999.999 0 0 0 0 1.998h3.581L.971 7.469a.999.999 0 1 0 1.412 1.412l5.285-5.285v3.58a.999.999 0 1 0 1.998 0V1.186a.999.999 0 0 0-.999-.999Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm text-zinc-500">{item.description}</div>
                </button>
              ))}
            </div>
            {/* Tabs items */}
            <div className="relative lg:max-w-none mt-12">
              <div className="relative flex flex-col">
                {tabs.map((item) => (
                  <div
                    key={item.id}
                    className={`w-full ${tab === item.id ? '' : 'hidden'}`}
                  >
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
                        <h3 className="font-inter-tight text-2xl font-bold text-zinc-900 mb-4">{item.content.title}</h3>
                        <ul className="list-disc list-inside text-zinc-500">
                          {item.content.list.map((listItem, index) => (
                            <li key={index}>{listItem}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="md:w-1/2 relative">
                        <Image className="rounded-t-lg border border-transparent [background:linear-gradient(theme(colors.white),theme(colors.white))_padding-box,linear-gradient(120deg,theme(colors.zinc.300),theme(colors.zinc.100),theme(colors.zinc.300))_border-box] box-content shadow-2xl" src={FeatureImage01} width={600} height={360} alt={`Feature ${item.id}`} />
                        <Image className="absolute top-0 left-full -translate-x-[70%] -mr-20 max-md:w-[45%] max-md:hidden" src={FeatureIllustration} width={273} height={288} alt="Illustration" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}
