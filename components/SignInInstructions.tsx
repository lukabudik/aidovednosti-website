import React from 'react'
import ScrollLink from './ScrollLink'

interface Step {
  text: string
}

interface Contact {
  text: string
  phone: string
  name: string
}

interface SignInInstructionsProps {
  heading: {
    title: string
    subtitle: string
  }
  steps: Step[]
  contact: Contact
  video: {
    embedUrl: string
    title: string
  }
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

const SignInInstructions = ({
  heading,
  steps,
  contact,
  video,
  cta
}: SignInInstructionsProps) => {

  return (
    <section className="bg-zinc-50 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center pb-8 md:pb-12">
          <h2 className="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-900 mb-4">{heading.title}</h2>
          <p className="text-lg text-zinc-500">{heading.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          {/* Left column - Instructions */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-zinc-200">
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-zinc-800 text-white rounded-full mr-3 text-sm font-semibold">{index + 1}</span>
                  <p className="text-zinc-600">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Right column - Embedded video */}
          <div className="bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden h-full">
            <iframe 
              className="w-full h-full"
              src={video.embedUrl}
              title={video.title}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-zinc-500 mb-4">{contact.text}</p>
          <p className="text-zinc-900 font-semibold mb-1">{contact.name}</p>
          <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-zinc-900 font-semibold hover:underline">
            {contact.phone}
          </a>
        </div>

        <div className="flex justify-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative group">
              <div className="relative">
                {cta.primary.discount && (
                  <span className="absolute -top-3 -right-3 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full transform rotate-12 shadow-lg group-hover:rotate-6 transition-all duration-300 z-20 border-2 border-white">{cta.primary.discount}</span>
                )}
                <a 
                  href={cta.primary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn text-white bg-blue-700 hover:bg-blue-800 w-full shadow-lg text-lg py-3 px-6 transition-all duration-300 ease-in-out transform group-hover:translate-y-[-2px] group-hover:shadow-xl relative overflow-hidden cursor-pointer">
                  <span className="relative z-10">{cta.primary.text}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                </a>
              </div>
            </div>
            <div className="relative group">
              <ScrollLink 
                to={cta.secondary.href.substring(1)}
                className="btn text-gray-800 bg-white group-hover:text-black w-full shadow-lg text-lg py-3 px-6 transition-all duration-300 ease-in-out transform group-hover:translate-y-[-2px] group-hover:shadow-xl relative overflow-hidden cursor-pointer">
                <span className="relative z-10">{cta.secondary.text}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
              </ScrollLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignInInstructions
