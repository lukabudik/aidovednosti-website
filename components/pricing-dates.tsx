'use client'

import React, { useState, useEffect } from 'react'
import Link from "next/link"
import { motion, AnimatePresence } from 'framer-motion'
import { useModal } from '@/contexts/ModalContext'

export interface CourseDate {
  date: Date
  type: string
  location: string
  cityLocative: string
  focus?: string
  deadline: Date | null
}

interface PricingDatesProps {
  dates: {
    date: string
    type: string
    location: string
    cityLocative: string
    focus?: string
    deadline: string | null
  }[]
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
  upcomingDates,
  dates: initialDates,
}: PricingDatesProps) => {
  const [dates, setDates] = useState<CourseDate[]>([])
  const [selectedFocus, setSelectedFocus] = useState<string>('all')
  const [focusOptions, setFocusOptions] = useState<string[]>([])

  const [closestCourse, setClosestCourse] = useState<CourseDate | null>(null)
  const [daysLeft, setDaysLeft] = useState<number>(0)
  const [filteredCourses, setFilteredCourses] = useState<CourseDate[]>([])
  const modal = useModal()

  useEffect(() => {
    // Parse dates from props
    const parsedDates = initialDates.map(course => ({
      ...course,
      date: new Date(`${course.date}T10:00:00`),
      deadline: course.deadline ? new Date(`${course.deadline}T23:59:59`) : null
    })) as CourseDate[];
    
    console.log('Parsed dates:', parsedDates);
    setDates(parsedDates);
    
    // Get unique focus options
    const uniqueFocus = Array.from(new Set(parsedDates.map(course => course.focus).filter((focus): focus is string => focus !== undefined)));
    console.log('Unique focus options:', uniqueFocus);
    if (uniqueFocus.length > 0) {
      setFocusOptions(['all', ...uniqueFocus]);
    }
    
    // Initial filtering
    updateFilteredCourses(parsedDates, 'all');
  }, [initialDates]);

  const updateFilteredCourses = (courses: CourseDate[], focus: string) => {
    console.log('Updating filtered courses with:', { courses, focus });
    
    const now = new Date();
    const filtered = courses
      .filter(course => {
        const isAfterNow = course.date > now;
        const isBeforeDeadline = course.deadline ? course.deadline > now : true;
        const matchesFocus = focus === 'all' || course.focus === focus;
        
        console.log('Course filtering:', {
          course,
          isAfterNow,
          isBeforeDeadline,
          matchesFocus
        });
        
        return isAfterNow && isBeforeDeadline && matchesFocus;
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 6);
    
    console.log('Filtered courses:', filtered);
    setFilteredCourses(filtered);

    if (filtered.length > 0) {
      const closest = filtered[0]; // Take the first course after sorting
      setClosestCourse(closest);
      
      const timeDiff = closest.deadline 
        ? closest.deadline.getTime() - now.getTime() 
        : 0;
      setDaysLeft(Math.ceil(timeDiff / (1000 * 3600 * 24)));
      
      console.log('Closest course:', closest);
      console.log('Days left:', Math.ceil(timeDiff / (1000 * 3600 * 24)));
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
                <button 
                  onClick={() => modal.openModal(dates)}
                  className="bg-black text-white text-lg font-semibold py-2 px-4 rounded-lg hover:bg-zinc-800 transition-colors duration-200"
                >
                  {pricing.earlyBirdDiscount.amount} {pricing.earlyBirdDiscount.text}
                </button>
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
                  {focusOptions.length > 2 && ( // Show only if there's more than one focus option (excluding 'all')
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
                  )}
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
                            {item.focus && (
                              <p className="text-sm text-zinc-600">{upcomingDates.focusLabel} {item.focus}</p>
                            )}
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
