'use client'

import React, { useState, useEffect } from 'react'
import Link from "next/link";

interface CourseDate {
  date: Date;
  deadline: Date;
  city: string;
  cityLocative?: string;
}

const PricingDates = () => {
  const dates: CourseDate[] = [
    { date: new Date('2024-11-15'), deadline: new Date('2024-10-18'), city: 'Praha', cityLocative: 'Praze' },
    { date: new Date('2023-12-01'), deadline: new Date('2023-11-01'), city: 'Brno', cityLocative: 'Brně' },
    { date: new Date('2023-12-15'), deadline: new Date('2023-11-15'), city: 'Ostrava', cityLocative: 'Ostravě' },
    { date: new Date('2024-01-10'), deadline: new Date('2023-12-10'), city: 'Plzeň', cityLocative: 'Plzni' },
    { date: new Date('2024-02-05'), deadline: new Date('2024-01-05'), city: 'Olomouc', cityLocative: 'Olomouci' },
    {date: new Date('2024-12-01'), deadline: new Date('2024-12-11'), city: 'České Budějovice', cityLocative: 'Českých Budějovicích'},
  ]

  const [closestCourse, setClosestCourse] = useState<CourseDate | null>(null)
  const [daysLeft, setDaysLeft] = useState<number>(0)
  const [upcomingCourses, setUpcomingCourses] = useState<CourseDate[]>([])

  useEffect(() => {
    const now = new Date()
    const filteredCourses = dates.filter(course => course.deadline > now)
    setUpcomingCourses(filteredCourses)

    if (filteredCourses.length > 0) {
      const closest = filteredCourses.reduce((prev, curr) => 
        (Math.abs(curr.deadline.getTime() - now.getTime()) < Math.abs(prev.deadline.getTime() - now.getTime()) ? curr : prev)
      )
      setClosestCourse(closest)
      const timeDiff = closest.deadline.getTime() - now.getTime()
      setDaysLeft(Math.ceil(timeDiff / (1000 * 3600 * 24)))
    }
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
      <section className="bg-zinc-50 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left column - Pricing and Closest Course */}
            <div className="text-center md:text-left">
              <h2 className="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Cena 20 000 Kč</h2>
              <div className="relative inline-block mb-6">
                <div className="bg-black text-white text-lg font-semibold py-2 px-4 rounded-lg">
                  3600 Kč pokud se registrujete 1 měsíc předem
                </div>
                <div
                    className="absolute -top-2 -right-2 transform translate-x-1/4 -translate-y-1/4 bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                  SLEVA!
                </div>
              </div>
              {closestCourse && (
                  <div className="border-l-4 p-4 mb-6" role="alert">
                    <p className="font-bold">Nejbližší kurz:</p>
                    <p>Do kurzu v {closestCourse.cityLocative} zbývá jen {daysLeft} dní na registraci!</p>
                    <p className="text-sm mt-2">Datum kurzu: {formatDate(closestCourse.date)}</p>
                  </div>
              )}
            </div>

            {/* Right column - Dates */}
            <div
                className="border border-transparent [background:linear-gradient(theme(colors.white),theme(colors.zinc.50))_padding-box,linear-gradient(120deg,theme(colors.zinc.300),theme(colors.zinc.100),theme(colors.zinc.300))_border-box] rounded-lg p-6">
              <h3 className="font-inter-tight text-xl font-semibold text-zinc-900 mb-4">Nadcházející termíny</h3>
              <ul className="space-y-4">
                {upcomingCourses.map((item, index) => (
                    <li key={index} className="border-b border-zinc-200 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-zinc-900">{formatDate(item.date)}</p>
                          <p className="text-sm text-zinc-600">Město: {item.city}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-zinc-600">Deadline registrace:</p>
                          <p className="font-semibold text-zinc-900">{formatDate(item.deadline)}</p>
                        </div>
                      </div>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">

            <div className="relative">
              <a className="btn text-white bg-black hover:bg-gray-800 w-full shadow-lg text-lg py-3 px-6"
                    href="https://www.aiinstitute.cz/ai-dovednosti-registrace">Koupit s podporou
                <span
                    className="absolute -top-3 -right-3 bg-black text-white text-xs font-bold px-2 py-1 rounded-full transform rotate-12 shadow-md">-82%</span></a>
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

export default PricingDates
