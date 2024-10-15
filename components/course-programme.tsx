"use client"
import React, { useState } from 'react'
import { FiChevronDown, FiCoffee } from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion'

interface ProgrammeBlock {
  time: string
  title: string
  content: string[]
  icon?: React.ElementType
}

interface ProgrammeDay {
  day: string
  blocks: ProgrammeBlock[]
}

const programme: ProgrammeDay[] = [
  {
    day: 'Den 1',
    blocks: [
      {
        time: '9:00',
        title: 'Úvod: „Ukradne mi AI práci?"',
        content: [
          'Přehled vlivu AI na trh práce a efektivitu.',
          'Rozlišení mezi mýty a realitou AI v pracovním procesu',
          'Diskuze o potenciálu AI ve zvyšování produktivity',
          'Jak na správný prompting pro jazykové modely'
        ]
      },
      {
        time: '10:00',
        title: 'Základy práce s ChatGPT',
        content: [
          'Naučení se základům práce s ChatGPT od A-Z',
          'Případové studie využití ChatGPT a průlet nástrojem',
          'Jak naučit ChatGPT, aby psal jako já',
          'Multimodalita a její využití',
          'Jak donutit ChatGPT, aby si nevymýšlel',
          'Jak analyzovat dokumenty, měnit formáty a tvořit data aneb pokročilá analýza v ChatGPT',
          'Jak pracovat s vyhledáváním na internetu a vytěžit z toho maximum?'
        ]
      },
      {
        time: '12:00',
        title: 'ZNALOSTNÍ KVÍZ S ODMĚNOU + pauza',
        icon: FiCoffee,
        content: []
      },
      {
        time: '13:00',
        title: 'Úvod do generování obrázků pomocí AI',
        content: [
          'V čem je Dalle nejlepší a na co ho použít?',
          'Jak vytvořit Logo a další vizuální prvky pomocí Dalle 3',
          'Využití generovaných obrázků pro marketing a prezentace'
        ]
      },
      {
        time: '15:00',
        title: 'GPT a asistenti',
        content: [
          'Co jsou to GPTs a jak se v nich vyznat',
          'Přehled TOP 7 nejlepších GPT uvnitř ChatGPT',
          'Jak vytvořit vlastního asistenta pro jakoukoliv činnost?'
        ]
      },
      {
        time: '16:30',
        title: 'Q&A a vyhodnocení prvního dne',
        content: []
      }
    ]
  },
  {
    day: 'Den 2',
    blocks: [
      {
        time: '9:00 - 11:45',
        title: 'Pokročilé AI nástroje a vizuální tvorba',
        content: [
          'Rozšiřování možností s AI:',
          '- Výběr a využití AI nástrojů pro zvýšení produktivity',
          '- Nejnovější trendy v AI a jejich aplikace',
          'Midjourney:',
          '- Tvorba profesionálního vizuálního obsahu',
          '- Efektivní promptování pro nejlepší výsledky',
          'Adobe FireFly:',
          '- Realistické generování a úprava obrázků',
          '- Pokročilé techniky editace grafiky',
          'IdeoGram:',
          '- Rychlá tvorba vizuálního obsahu s textem',
          '- Efektivní vizuální marketing'
        ]
      },
      {
        time: '11:45',
        title: 'SOUBOJ TÝMŮ S ODMĚNOU + pauza',
        icon: FiCoffee,
        content: []
      },
      {
        time: '13:00 - 14:00',
        title: 'Audio a video tvorba s AI',
        content: [
          'Elevenlabs:',
          '- Realistický převod textu na mluvené slovo',
          '- Tvorba voiceoverů pro podcasty a marketing',
          'HeyGen:',
          '- Vytváření videoobsahu s AI avatarem',
          '- Efektivní produkce video materiálů pro sociální média'
        ]
      },
      {
        time: '14:00',
        title: 'Úkol a interaktivní zadání + 5 minut rychlo pauza',
        icon: FiCoffee,
        content: []
      },
      {
        time: '14:45 - 16:45',
        title: 'Produktivita a praktické aplikace AI',
        content: [
          'Fireflies:',
          '- Automatické zpracování a analýza schůzek',
          '- Efektivní správa poznámek a úkolů',
          'Rows AI:',
          '- Intuitivní práce s daty pomocí AI',
          '- Rychlá analýza a vizualizace dat',
          'Looka & Aragon:',
          '- AI-asistovaná tvorba brandingu a profesionálních fotek',
          'AI studium:',
          '- Efektivní nástroje pro rychlé učení a ověřování informací'
        ]
      },
      {
        time: '16:45',
        title: 'Zakončení kurzu a vyhodnocení úkolů',
        content: []
      }
    ]
  }
]

export default function CourseProgramme() {
  const [openBlocks, setOpenBlocks] = useState<{ [key: string]: boolean }>({})

  const toggleBlock = (day: string, blockIndex: number) => {
    setOpenBlocks(prev => ({
      ...prev,
      [`${day}-${blockIndex}`]: !prev[`${day}-${blockIndex}`]
    }))
  }

  return (
      <section className="bg-zinc-50 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Program kurzu</h2>
            <p className="text-lg text-zinc-500">Podrobný přehled toho, co se naučíte během našeho dvoudenního
              intenzivního kurzu.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {programme.map((day, dayIndex) => (
                <div key={dayIndex} className="mb-8">
                  <h3 className="font-inter-tight text-2xl font-semibold text-zinc-900 mb-6 bg-zinc-100 p-4 rounded-lg">{day.day}</h3>
                  <div className="space-y-4">
                    {day.blocks.map((block, blockIndex) => (
                        <motion.div
                            key={blockIndex}
                            className="border border-transparent [background:linear-gradient(theme(colors.white),theme(colors.white))_padding-box,linear-gradient(120deg,theme(colors.zinc.300),theme(colors.zinc.100),theme(colors.zinc.300))_border-box] rounded-lg overflow-hidden"
                            initial={false}
                            animate={{backgroundColor: openBlocks[`${day.day}-${blockIndex}`] ? "#ffffff" : "#f9fafb"}}
                            transition={{duration: 0.3}}
                        >
                          <div
                              className={`w-full text-left px-6 py-4 flex justify-between items-center ${block.content.length > 0 ? 'cursor-pointer' : ''}`}
                              onClick={() => block.content.length > 0 && toggleBlock(day.day, blockIndex)}
                          >
                            <div className="flex items-center space-x-4">
                              <span className="text-zinc-500 font-mono">{block.time}</span>
                              <span className="font-inter-tight font-semibold text-zinc-900">{block.title}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {block.icon && <block.icon className="text-zinc-400"/>}
                              {block.content.length > 0 && (
                                  <motion.div
                                      animate={{rotate: openBlocks[`${day.day}-${blockIndex}`] ? 180 : 0}}
                                      transition={{duration: 0.3}}
                                  >
                                    <FiChevronDown className="text-zinc-400"/>
                                  </motion.div>
                              )}
                            </div>
                          </div>
                          <AnimatePresence initial={false}>
                            {openBlocks[`${day.day}-${blockIndex}`] && block.content.length > 0 && (
                                <motion.div
                                    initial="collapsed"
                                    animate="open"
                                    exit="collapsed"
                                    variants={{
                                      open: {opacity: 1, height: "auto"},
                                      collapsed: {opacity: 0, height: 0}
                                    }}
                                    transition={{duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98]}}
                                >
                                  <div className="px-6 pb-4">
                                    <ul className="list-none text-zinc-600 space-y-4">
                                      {block.content.reduce((acc: JSX.Element[], item: string, itemIndex: number) => {
                                        if (!item.startsWith('-')) {
                                          acc.push(
                                              <li key={itemIndex} className="font-semibold">
                                                {item}
                                                {itemIndex < block.content.length - 1 && block.content[itemIndex + 1].startsWith('-') && (
                                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                                      {block.content.slice(itemIndex + 1).reduce((subAcc: JSX.Element[], subItem: string, subIndex: number) => {
                                                        if (subItem.startsWith('-')) {
                                                          subAcc.push(
                                                              <li key={subIndex}
                                                                  className="text-sm ml-4">{subItem.slice(2)}</li>
                                                          );
                                                        } else {
                                                          return subAcc; // Break the loop when we hit a non-list item
                                                        }
                                                        return subAcc;
                                                      }, [])}
                                                    </ul>
                                                )}
                                              </li>
                                          );
                                        }
                                        return acc;
                                      }, [] as JSX.Element[])}
                                    </ul>
                                  </div>
                                </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                    ))}
                  </div>
                </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <a className="btn text-white bg-black hover:bg-gray-800 w-full shadow-lg text-lg py-3 px-6"
                 href="https://www.aiinstitute.cz/ai-dovednosti-registrace">Koupit s podporou
                <span
                    className="absolute -top-3 -right-3 bg-black text-white text-xs font-bold px-2 py-1 rounded-full transform rotate-12 shadow-md">-82%</span>
              </a>
            </div>
            <div className="relative">
              <a className="btn text-gray-800 bg-white hover:text-black w-full shadow-lg text-lg py-3 px-6"
                 href="https://www.aiinstitute.cz/ai-dovednosti-registrace">
                Koupit bez podpory
              </a>
            </div>
          </div>
        </div>
      </section>
  )
}
