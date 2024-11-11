import React from 'react'

const SignInInstructions = () => {
  const steps = [
    'Použijte počítač nebo notebook (ne tablet ani mobilní telefon).',
    'Ujistěte se, že máte povoleny cookies.',
    'Použijte webový prohlížeč Google Chrome.',
    'Navštivte stránky aidovednosti.cz a klikněte na sekci "S dotací".',
    'Přihlaste se prostřednictvím bankovní identity nebo identity občana.',
    'Pokud vás stránka nepřesměruje na náš kurz, vyhledejte "AI Institute s.r.o."',
    'V dotazníku zdůrazněte, jak vám účast na AI workshopu pomůže v profesním růstu.',
    'Pracoviště pro schválení dejte u všech Praha město nebo Brno město.',
    'A je to! Přibližně týden před kurzem obdržíte fakturu a informace o kurzu.'
  ]

  return (
    <section className="bg-zinc-50 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center pb-8 md:pb-12">
          <h2 className="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Jak se přihlásit na workshop?</h2>
          <p className="text-lg text-zinc-500">Následujte tyto jednoduché kroky pro úspěšnou registraci</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          {/* Left column - Instructions */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-zinc-200">
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-zinc-800 text-white rounded-full mr-3 text-sm font-semibold">{index + 1}</span>
                  <p className="text-zinc-600">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Right column - Embedded video */}
          <div className="bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden h-full">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="Video návod"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-zinc-500 mb-4">Máte-li jakékoliv dotazy, neváhejte nás kontaktovat</p>
          <a href="tel:+420778009016" className="text-zinc-900 font-semibold hover:underline">+420 778 009 016</a>
        </div>

        <div className="flex justify-center mt-12">
          <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <a className="btn text-white bg-black hover:bg-gray-800 w-full shadow-lg text-lg py-3 px-6"
                 href="#pricing-dates">Koupit s podporou
                <span
                    className="absolute -top-3 -right-3 bg-black text-white text-xs font-bold px-2 py-1 rounded-full transform rotate-12 shadow-md">-82%</span>
              </a>
            </div>
            <div className="relative">
              <a className="btn text-gray-800 bg-white hover:text-black w-full shadow-lg text-lg py-3 px-6"
                 href="#pricing-dates">
                Koupit bez podpory
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignInInstructions
