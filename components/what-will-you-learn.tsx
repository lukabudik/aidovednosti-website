'use client'

import { useState } from 'react'
import Image from 'next/image'
import FeatureIllustration from '@/public/images/feature-illustration.png'
import FeatureImage01 from '@/public/images/feature-01.png'

export default function WhatWillYouLearn() {
  const [tab, setTab] = useState<number>(1)

  const tabs = [
    {
      id: 1,
      title: 'Základy',
      description: 'Vše, co potřebuješ vědět o tom jak a proč AI funguje.',
      content: {
        title: 'Základy',
        list: [
          'Teorie jazykových modelů',
          'Jak správně promptovat (zadávat příkazy)',
          'Jak komplexně pracovat s ChatGPT',
          'Jak si s vytvořit vlastní asistenty, kteří za tebe udělají rutinní úkoly',
          'Jak pomocí AI analyzovat data',
          'Jak ověřovat informace a vyhledávat na internetu'
        ]
      }
    },
    {
      id: 2,
      title: 'Grafika',
      description: 'Vytvářej krásné vizuály během pár minut a ušetři za grafika.',
      content: {
        title: 'Grafika',
        list: [
          'Jak vizualizovat svoje nápady',
          'Tvorba úžasných ilustrací a realistických fotek pomocí Midjourney',
          'Jak vytvářet kompletní promo materiály, včetně textu',
          'Už neřeš branding - nech si ho celý vygenerovat',
          'Jak si pomocí AI vytvořit profesionální fotky na LinkedIn'
        ]
      }
    },
    {
      id: 3,
      title: 'Video',
      description: 'Vlastní dvojník, nebo krásné záběry do reklamy? Obratem!',
      content: {
        title: 'Video',
        list: [
          'Vytvoř si vlastního AI dvojníka, který ti pomůže s marketingem po celém světě',
          'Jak si pomocí AI nadabovat jakékoliv video',
          'Krásné záběry do reklamy během pár vteřin',
          'Nech si od AI sestříhat celé video'
        ]
      }
    },
    {
      id: 4,
      title: 'Produktivita',
      description: 'Tyto nástroje se stanou tvým každodenním pomocníkem.',
      content: {
        title: 'Produktivita',
        list: [
          'Získej vlastní asistentku, která ti sepíše zápisy ze schůzek',
          'Jak získat kvalifikované leady',
          'Jak si díky AI odpřipommínkovat smlouvy v kvalitě právníka',
          'Vytvoř si vlastního chatbota, který zodpoví dotazy tvým zákazníkům',
        ]
      }
    }
  ]

  return (
    <section className="relative bg-zinc-50">
      <div className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h2 className="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Naučíme tě toho opravdu hodně</h2>
            <p className="text-lg text-zinc-500">AI reads and understands your designs, and with nothing more than a single line of feedback, perform complex actions autonomously.</p>
          </div>
          <div>
            {/* Tabs buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  className={`text-left px-4 py-5 border border-transparent rounded ${tab !== item.id ? 'bg-zinc-100 opacity-60 hover:opacity-100 transition' : '[background:linear-gradient(theme(colors.white),theme(colors.white))_padding-box,linear-gradient(120deg,theme(colors.zinc.300),theme(colors.zinc.100),theme(colors.zinc.300))_border-box] shadow-sm rotate-1'}`}
                  onClick={() => setTab(item.id)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-inter-tight font-semibold text-zinc-900">{item.title}</div>
                    {tab === item.id && (
                      <svg className="fill-zinc-400 shrink-0 ml-2" xmlns="http://www.w3.org/2000/svg" width="10" height="10">
                        <path d="M8.667.186H2.675a.999.999 0 0 0 0 1.998h3.581L.971 7.469a.999.999 0 1 0 1.412 1.412l5.285-5.285v3.58a.999.999 0 1 0 1.998 0V1.186a.999.999 0 0 0-.999-.999Z" />
                      </svg>
                    )}
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
      </div>
    </section>
  )
}
