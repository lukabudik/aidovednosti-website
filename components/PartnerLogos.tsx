"use client"
import Image from 'next/image'
import { useState } from 'react'

interface Partner {
  name: string;
  logo: string;
}

const partners: Partner[] = [
  { name: 'Svaz Měst a Obcí ČR', logo: '/images/partners/smo.webp' },
  { name: 'KKCG', logo: '/images/partners/kkcg.webp' },
  { name: 'Remax', logo: '/images/partners/remax.webp' },
  { name: 'AHRČR', logo: '/images/partners/ahr.webp' },
]

const PartnerLogos = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="bg-zinc-50 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
          <h2 className="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Kdo s námi spolupracuje</h2>
          <p className="text-lg text-zinc-500">Své vzdělání v oblasti AI nám svěřují přední společnosti</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="relative w-32 h-32 transition-transform duration-300 ease-in-out transform hover:scale-110"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                layout="fill"
                objectFit="contain"
                className={`transition-opacity duration-300 ease-in-out ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-50 grayscale'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnerLogos
