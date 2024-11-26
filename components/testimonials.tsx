'use client'
import Testimonial from '@/components/testimonial'
import { StaticImageData } from 'next/image'
import TestimonialImg01 from '@/public/images/testimonial-01.jpg'
import TestimonialImg02 from '@/public/images/testimonial-02.jpg'
import TestimonialImg03 from '@/public/images/testimonial-03.jpg'
import TestimonialImg04 from '@/public/images/testimonial-04.jpg'

interface TestimonialItem {
  image: StaticImageData
  name: string
  user: string
  link: string
  content: string
}

interface TestimonialsProps {
  heading: {
    title: string
    subtitle?: string
  }
  testimonials: TestimonialItem[]
}

export default function Testimonials({ heading, testimonials }: TestimonialsProps) {

  return (
    <section className="bg-zinc-800">
      <div className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center pb-8 md:pb-12">
            <h2 className="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-200">{heading.title}</h2>
            {heading.subtitle && (
              <p className="text-lg text-zinc-400 mt-2">{heading.subtitle}</p>
            )}
          </div>
        </div>
        <div className="max-w-[94rem] mx-auto space-y-6">
          {/* Single Row */}
          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_28%,_black_calc(100%-28%),transparent_100%)] group">
            <div className="flex items-start justify-center md:justify-start [&>div]:mx-3 animate-infinite-scroll group-hover:[animation-play-state:paused]">
              {/* Items */}
              {testimonials.map((testimonial, index) => (
                <Testimonial key={index} testimonial={testimonial}>
                  {testimonial.content}
                </Testimonial>
              ))}
            </div>
            {/* Duplicated element for infinite scroll */}
            <div className="flex items-start justify-center md:justify-start [&>div]:mx-3 animate-infinite-scroll group-hover:[animation-play-state:paused]" aria-hidden="true">
              {/* Items */}
              {testimonials.map((testimonial, index) => (
                <Testimonial key={index} testimonial={testimonial}>
                  {testimonial.content}
                </Testimonial>
              ))}
            </div>
          </div>
        </div >
      </div >
    </section >
  )
}
