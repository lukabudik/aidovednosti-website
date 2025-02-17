"use client"
import React, { useState } from 'react'
import ScrollLink from './ScrollLink'
import { FiChevronDown, FiCoffee } from "react-icons/fi";
import { useModal } from '@/contexts/ModalContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useLevel } from '@/contexts/LevelContext'

interface ProgrammeBlock {
  time: string
  title: string
  content: string[]
  icon?: React.ReactNode | string
}

interface ProgrammeDay {
  day: string
  blocks: ProgrammeBlock[]
}

interface CourseProgrammeProps {
  heading: {
    title: string
    subtitle: string
  }
  beginnerProgramme: ProgrammeDay[]
  advancedProgramme: ProgrammeDay[]
  cta: {
    primary: {
      text: string
      href: string
      discount?: string
    }
    secondary: {
      text: string
      href: string
    }
  }
}

export default function CourseProgramme({ 
  heading, 
  beginnerProgramme,
  advancedProgramme,
  cta, 
  dates = [] 
}: CourseProgrammeProps & { dates?: Array<{
  date: string
  type: string
  location: string
  cityLocative: string
  level: string
  focus?: string
  deadline?: string
}> }) {
  const [openBlocks, setOpenBlocks] = useState<{ [key: string]: boolean }>({})
  const { level, setLevel } = useLevel()
  const modal = useModal()

  const programme = level === 'beginner' ? beginnerProgramme : advancedProgramme

  const toggleBlock = (day: string, blockIndex: number) => {
    setOpenBlocks(prev => ({
      ...prev,
      [`${day}-${blockIndex}`]: !prev[`${day}-${blockIndex}`]
    }))
  }

  return (
      <section className="py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center pb-6">
            <h2 className="font-inter-tight text-2xl md:text-3xl font-bold text-zinc-900 mb-2">{heading.title}</h2>
            <p className="text-base text-zinc-500">{heading.subtitle}</p>
            <div className="mt-4 inline-flex rounded-lg border border-zinc-200 p-1 bg-white">
              <button
                onClick={() => setLevel('beginner')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  level === 'beginner' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-zinc-500 hover:text-zinc-700'
                }`}
              >
                Začátečník
              </button>
              <button
                onClick={() => setLevel('advanced')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  level === 'advanced' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-zinc-500 hover:text-zinc-700'
                }`}
              >
                Pokročilý
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {programme.map((day: ProgrammeDay, dayIndex: number) => (
                <div key={dayIndex} className="mb-8">
                  <h3 className="font-inter-tight text-xl font-semibold text-zinc-900 mb-4 bg-zinc-100 p-3 rounded-lg">{day.day}</h3>
                  <div className="space-y-4">
                    {day.blocks.map((block: ProgrammeBlock, blockIndex: number) => (
                        <motion.div
                            key={blockIndex}
                            className="border border-transparent [background:linear-gradient(theme(colors.white),theme(colors.white))_padding-box,linear-gradient(120deg,theme(colors.zinc.300),theme(colors.zinc.100),theme(colors.zinc.300))_border-box] rounded-lg overflow-hidden"
                            initial={false}
                            animate={{backgroundColor: openBlocks[`${day.day}-${blockIndex}`] ? "#ffffff" : "#f9fafb"}}
                            transition={{duration: 0.3}}
                        >
                          <div
                              className={`w-full text-left px-4 py-3 flex justify-between items-center ${block.content.length > 0 ? 'cursor-pointer' : ''}`}
                              onClick={() => block.content.length > 0 && toggleBlock(day.day, blockIndex)}
                          >
                            <div className="flex items-center space-x-4">
                              <span className="text-zinc-500 font-mono">{block.time}</span>
                              <span className="font-inter-tight font-semibold text-zinc-900">{block.title}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {block.icon && (
                                <div className="text-zinc-400">
                                  {typeof block.icon === 'string' && block.icon === 'coffee' ? <FiCoffee /> : block.icon}
                                </div>
                              )}
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
                                  <div className="px-4 pb-3">
                                    <ul className="list-none text-zinc-600 space-y-2">
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
        <div className="flex justify-center mt-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative group">
              <div className="relative">
                {cta.primary.discount && (
                  <span className="absolute -top-3 -right-3 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full transform rotate-12 shadow-lg group-hover:rotate-6 transition-all duration-300 z-20 border-2 border-white">{cta.primary.discount}</span>
                )}
                <button 
                  onClick={() => modal.openModal(dates)}
                  className="btn text-white bg-blue-700 hover:bg-blue-800 w-full shadow-lg text-lg py-3 px-6 transition-all duration-300 ease-in-out transform group-hover:translate-y-[-2px] group-hover:shadow-xl relative overflow-hidden cursor-pointer">
                  <span className="relative z-10">{cta.primary.text}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                </button>
              </div>
            </div>
            <div className="relative group">
              <ScrollLink 
                to={cta.secondary.href.substring(1)}
                smooth={true}
                duration={500}
                className="btn text-gray-800 bg-white group-hover:text-black w-full shadow-lg text-lg py-3 px-6 transition-all duration-300 ease-in-out transform group-hover:translate-y-[-2px] group-hover:shadow-xl relative overflow-hidden cursor-pointer">
                <span className="relative z-10">{cta.secondary.text}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
              </ScrollLink>
            </div>
          </div>
        </div>
      </section>
  )
}
