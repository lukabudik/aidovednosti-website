'use client'
import Testimonial from '@/components/testimonial'
import TestimonialImg01 from '@/public/images/testimonial-01.jpg'
import TestimonialImg02 from '@/public/images/testimonial-02.jpg'
import TestimonialImg03 from '@/public/images/testimonial-03.jpg'
import TestimonialImg04 from '@/public/images/testimonial-04.jpg'
import TestimonialImg05 from '@/public/images/testimonial-05.jpg'
import TestimonialImg06 from '@/public/images/testimonial-06.jpg'
import TestimonialImg07 from '@/public/images/testimonial-07.jpg'
import TestimonialImg08 from '@/public/images/testimonial-08.jpg'

export default function Testimonials() {

  const testimonials = [
    {
      image: TestimonialImg01,
      name: 'Jan Novák',
      user: 'Realitní makléř',
      link: '#0',
      content: 'Díky AI workshopu jsem schopen zpracovat dvojnásobek nabídek nemovitostí za polovinu času. Skvělá investice do vzdělání!',
    },
    {
      image: TestimonialImg02,
      name: 'Marie Svobodová',
      user: 'Marketing Manager',
      link: '#0',
      content: 'Konečně rozumím AI a dokážu ji efektivně využívat. Ušetřím spoustu času na rutinních úkolech a můžu se věnovat strategii.',
    },
    {
      image: TestimonialImg03,
      name: 'Petr Dvořák',
      user: 'Podnikatel',
      link: '#0',
      content: 'Workshop mi otevřel oči. Teď využívám AI pro automatizaci procesů a tvorbu obsahu. Moje produktivita se zdvojnásobila.',
    },
    {
      image: TestimonialImg04,
      name: 'Lucie Černá',
      user: 'Grafička',
      link: '#0',
      content: 'Díky AI nástrojům, které jsem se naučila na workshopu, zvládám vytvořit profesionální grafiku v rekordním čase.',
    },
  ]

  return (
    <section className="bg-zinc-800">
      <div className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center pb-8 md:pb-12">
            <h2 className="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-200">Nevěřte nám. Věřte jim!</h2>
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
