import React from 'react'
import { IconType } from 'react-icons'

interface Bonus {
  title: string
  description: string
  icon: IconType
}

interface BonusesProps {
  heading: {
    title: string
    subtitle: string
  }
  bonuses: Bonus[]
}

export default function Bonuses({ heading, bonuses }: BonusesProps) {

  return (
      <section className="bg-white">
        <div className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="relative max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h2 className="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-900 mb-4">{heading.title}</h2>
              <p className="text-xl text-zinc-500">{heading.subtitle}</p>
            </div>
            <div className="max-w-sm mx-auto sm:max-w-none grid sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
              {bonuses.map((bonus, index) => (
                  <article key={index} className="flex flex-col border-2 border-transparent
 [background:linear-gradient(white,white)_padding-box,linear-gradient(120deg,theme(colors.zinc.200),theme(colors.zinc.100),theme(colors.zinc.200))_border-box] 
 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-blue-500">
                    <div className="grow flex flex-col p-6 pt-8">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <bonus.icon className="w-8 h-8 text-blue-600"/>
                        </div>
                        <h3 className="font-inter-tight font-bold text-lg text-zinc-900">{bonus.title}</h3>
                      </div>
                      <p className="grow text-base text-zinc-600 leading-relaxed">{bonus.description}</p>
                    </div>
                  </article>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}
