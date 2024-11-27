'use client'

import React, { useState, useEffect } from 'react'
import Link from "next/link"
import { CourseDate, parseCourseDates } from '@/utils/csvParser'
import { motion, AnimatePresence } from 'framer-motion'

interface PricingDatesProps {
  heading: {
    title: string;
    subtitle: string;
  };
  pricing: {
    amount: string;
    earlyBirdDiscount: {
      amount: string;
      text: string;
      label: string;
    };
  };
  upcomingDates: {
    title: string;
    filterLabel: string;
    allCoursesLabel: string;
    nextCourseLabel: string;
    daysLeftText: string;
    courseDateLabel: string;
    registrationDeadlineLabel: string;
    cityLabel: string;
    focusLabel: string;
  };
}

const PricingDates = ({
  heading,
  pricing,
  upcomingDates
}: PricingDatesProps) => {
  const [dates, setDates] = useState<CourseDate[]>([])
  const [selectedFocus, setSelectedFocus] = useState<string>('all')
  const [focusOptions, setFocusOptions] = useState<string[]>([])

  const [closestCourse, setClosestCourse] = useState<CourseDate | null>(null)
  const [daysLeft, setDaysLeft] = useState<number>(0)
  const [filteredCourses, setFilteredCourses] = useState<CourseDate[]>([])

  useEffect(() => {
    const loadData = async () => {
      const courseDates = await parseCourseDates()
      setDates(courseDates)
      
      // Get unique focus options
      const uniqueFocus = Array.from(new Set(courseDates.map(course => course.focus)))
      setFocusOptions(['all', ...uniqueFocus])
      
      // Initial filtering
      updateFilteredCourses(courseDates, 'all')
    }
    
    loadData()
  }, [])

  const updateFilteredCourses = (courses: CourseDate[], focus: string) => {
    const now = new Date()
    const filtered = courses
      .filter(course => 
        course.date > now && 
        (course.deadline ? course.deadline > now : true) &&
        (focus === 'all' || course.focus === focus)
      )
      .slice(0, 4) // Only show the closest 4 courses
    
    setFilteredCourses(filtered)

    if (filtered.length > 0) {
      // Find course with closest deadline
      const closest = filtered.reduce((prev, curr) =>
        (curr.deadline && prev.deadline && curr.deadline.getTime() < prev.deadline.getTime() ? curr : prev)
      )
      setClosestCourse(closest)
      const timeDiff = closest.deadline ? closest.deadline.getTime() - now.getTime() : 0
      setDaysLeft(Math.ceil(timeDiff / (1000 * 3600 * 24)))
    }
  }

  useEffect(() => {
    updateFilteredCourses(dates, selectedFocus)
  }, [dates, selectedFocus])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
      <section id="pricing-dates" className="bg-zinc-50 py-8 md:py-10 scroll-mt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center pb-6">
            <h2 className="font-inter-tight text-2xl md:text-3xl font-bold text-zinc-900 mb-2">{heading.title}</h2>
            <p className="text-base text-zinc-500">{heading.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left column - Pricing and Closest Course */}
            <div className="text-center md:text-left">
              <h2 className="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-900 mb-4">{pricing.amount}</h2>
              <div className="relative inline-block mb-6">
                <div className="bg-black text-white text-lg font-semibold py-2 px-4 rounded-lg">
                  {pricing.earlyBirdDiscount.amount} {pricing.earlyBirdDiscount.text}
                </div>
                <div
                    className="absolute -top-2 -right-2 transform translate-x-1/4 -translate-y-1/4 bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                  {pricing.earlyBirdDiscount.label}
                </div>
              </div>
              {closestCourse && (
                  <div className="border-l-4 p-4 mb-6" role="alert">
                    <p className="font-bold">{upcomingDates.nextCourseLabel}</p>
                    <p>{upcomingDates.daysLeftText.replace('{city}', closestCourse.cityLocative).replace('{days}', daysLeft.toString())}</p>
                    <p className="text-sm mt-2">{upcomingDates.courseDateLabel} {formatDate(closestCourse.date)}</p>
                  </div>
              )}
            </div>

            {/* Right column - Filter and Dates */}
            <div className="space-y-6">
              <div className="border border-transparent [background:linear-gradient(theme(colors.white),theme(colors.zinc.50))_padding-box,linear-gradient(120deg,theme(colors.zinc.300),theme(colors.zinc.100),theme(colors.zinc.300))_border-box] rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-inter-tight text-xl font-semibold text-zinc-900">{upcomingDates.title}</h3>
                  <div className="flex items-center space-x-2">
                    <select
                      id="focus-filter"
                      value={selectedFocus}
                      onChange={(e) => setSelectedFocus(e.target.value)}
                      className="text-sm border border-zinc-200 rounded-md py-1 px-2 focus:border-zinc-500 focus:outline-none focus:ring-zinc-500"
                    >
                      {focusOptions.map((focus) => (
                        <option key={focus} value={focus}>
                          {focus === 'all' ? upcomingDates.allCoursesLabel : focus}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              <motion.div
                className="overflow-hidden"
                initial={false}
                animate={{ height: "auto" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.ul 
                    key={selectedFocus}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {filteredCourses.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ 
                          duration: 0.3,
                          delay: index * 0.05,
                          ease: "easeOut"
                        }}
                        layout
                        className="border-b border-zinc-200 pb-4 last:border-b-0 last:pb-0"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-zinc-900">{formatDate(item.date)}</p>
                            <p className="text-sm text-zinc-600">{upcomingDates.cityLabel} {item.location}</p>
                            <p className="text-sm text-zinc-600">{upcomingDates.focusLabel} {item.focus}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-zinc-600">{upcomingDates.registrationDeadlineLabel}</p>
                            <p className="font-semibold text-zinc-900">{item.deadline ? formatDate(item.deadline) : 'N/A'}</p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
          </div>
        </div>
      </section>
    )
}

export default PricingDates;
