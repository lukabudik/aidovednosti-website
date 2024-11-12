import Link from 'next/link'
import Stats from '@/components/stats'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative before:absolute before:inset-0 before:h-80 before:pointer-events-none before:bg-gradient-to-b before:from-zinc-100 before:-z-10">
      <div className="pt-24 pb-6 md:pt-32 md:pb-8">
        {/* Section content */}
        <div className="px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">
              {/* Left column - Text content */}
              <div className="text-left md:pr-8">
                <h1 className="font-inter-tight text-4xl md:text-5xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-500 via-zinc-900 to-zinc-900 pb-4">
                  Zvládni <em className="italic relative inline-flex justify-center items-center text-zinc-900"> 2x tolik
                  práce
                  <svg className="absolute fill-zinc-300 w-[calc(100%+1rem)] -z-10" xmlns="http://www.w3.org/2000/svg"
                       width="223" height="62" viewBox="0 0 223 62" aria-hidden="true" preserveAspectRatio="none">
                    <path
                        d="M45.654 53.62c17.666 3.154 35.622 4.512 53.558 4.837 17.94.288 35.91-.468 53.702-2.54 8.89-1.062 17.742-2.442 26.455-4.352 8.684-1.945 17.338-4.3 25.303-7.905 3.94-1.81 7.79-3.962 10.634-6.777 1.38-1.41 2.424-2.994 2.758-4.561.358-1.563-.078-3.143-1.046-4.677-.986-1.524-2.43-2.96-4.114-4.175a37.926 37.926 0 0 0-5.422-3.32c-3.84-1.977-7.958-3.563-12.156-4.933-8.42-2.707-17.148-4.653-25.95-6.145-8.802-1.52-17.702-2.56-26.622-3.333-17.852-1.49-35.826-1.776-53.739-.978-8.953.433-17.898 1.125-26.79 2.22-8.887 1.095-17.738 2.541-26.428 4.616-4.342 1.037-8.648 2.226-12.853 3.676-4.197 1.455-8.314 3.16-12.104 5.363-1.862 1.13-3.706 2.333-5.218 3.829-1.52 1.47-2.79 3.193-3.285 5.113-.528 1.912-.127 3.965.951 5.743 1.07 1.785 2.632 3.335 4.348 4.68 2.135 1.652 3.2 2.672 2.986 3.083-.18.362-1.674.114-4.08-1.638-1.863-1.387-3.63-3.014-4.95-5.09C.94 35.316.424 34.148.171 32.89c-.275-1.253-.198-2.579.069-3.822.588-2.515 2.098-4.582 3.76-6.276 1.673-1.724 3.612-3.053 5.57-4.303 3.96-2.426 8.177-4.278 12.457-5.868 4.287-1.584 8.654-2.89 13.054-4.036 8.801-2.292 17.74-3.925 26.716-5.19C70.777 2.131 79.805 1.286 88.846.723c18.087-1.065 36.236-.974 54.325.397 9.041.717 18.07 1.714 27.042 3.225 8.972 1.485 17.895 3.444 26.649 6.253 4.37 1.426 8.697 3.083 12.878 5.243a42.11 42.11 0 0 1 6.094 3.762c1.954 1.44 3.823 3.2 5.283 5.485a12.515 12.515 0 0 1 1.63 3.88c.164.706.184 1.463.253 2.193-.063.73-.094 1.485-.247 2.195-.652 2.886-2.325 5.141-4.09 6.934-3.635 3.533-7.853 5.751-12.083 7.688-8.519 3.778-17.394 6.09-26.296 7.998-8.917 1.86-17.913 3.152-26.928 4.104-18.039 1.851-36.17 2.295-54.239 1.622-18.062-.713-36.112-2.535-53.824-6.23-5.941-1.31-5.217-2.91.361-1.852"/>
                  </svg>
                </em> za stejné množství času.
                </h1>
                <p className="text-lg md:text-xl text-zinc-500 mb-8 max-w-2xl">
                  Ušetřený čas pak věnuj sobě a své rodině, zvyš své příjmy a zvyš svoji hodnotu na trhu práce.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="relative group">
                    <div className="relative">
                      <span className="absolute -top-3 -right-3 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full transform rotate-12 shadow-lg group-hover:rotate-6 transition-all duration-300 z-20 border-2 border-white">-82%</span>
                      <a className="btn text-white bg-black group-hover:bg-gray-800 w-full shadow-lg text-lg py-3 px-6 transition-all duration-300 ease-in-out transform group-hover:translate-y-[-2px] group-hover:shadow-xl relative overflow-hidden"
                         href="#pricing-dates">
                        <span className="relative z-10">Koupit s podporou</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                      </a>
                    </div>
                  </div>
                  <div className="relative group">
                    <a className="btn text-gray-800 bg-white group-hover:text-black w-full shadow-lg text-lg py-3 px-6 transition-all duration-300 ease-in-out transform group-hover:translate-y-[-2px] group-hover:shadow-xl relative overflow-hidden"
                       href="#pricing-dates">
                      <span className="relative z-10">Koupit bez podpory</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Right column - Video */}
              <div className="relative mb-8 md:mb-0 before:absolute before:-top-12 before:w-96 before:h-96 before:bg-zinc-900 before:opacity-[.15] before:rounded-full before:blur-3xl before:-z-10">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className="rounded-lg shadow-2xl w-full h-full"
                    src="https://www.youtube.com/embed/lrkoFhfeMcY"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner logos */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
          <div className="text-center mb-4">
            <p className="text-sm text-zinc-400">Své vzdělání v oblasti AI nám svěřují přední společnosti</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {[
              { name: 'Svaz Měst a Obcí ČR', logo: '/images/partners/smo.webp', url: 'https://www.smocr.cz/' },
              { name: 'KKCG', logo: '/images/partners/kkcg.webp', url: 'https://www.kkcg.com/' },
              { name: 'Remax', logo: '/images/partners/remax.webp', url: 'https://www.remax-czech.cz/' },
              { name: 'AHRČR', logo: '/images/partners/ahr.webp', url: 'https://www.ahrcr.cz/' },
            ].map((partner, index) => (
              <a 
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-20 h-20 transition-transform duration-300 ease-in-out transform hover:scale-110"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
