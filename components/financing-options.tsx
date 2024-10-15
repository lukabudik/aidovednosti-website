'use client'

import React from 'react'

const FinancingOptions = () => {
  return (
    <section className="bg-zinc-50 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
          <h2 className="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Možnosti financování</h2>
          <p className="text-lg text-zinc-500">Vyberte si variantu, která vám nejlépe vyhovuje</p>
        </div>
        <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-2 lg:gap-6 items-start lg:max-w-none">
          {/* Option 1 - Cheaper Option */}
          <div className="relative flex flex-col h-full p-6 bg-white rounded-lg border border-zinc-200 shadow-sm">
            <div className="absolute -top-3 -right-3 bg-zinc-900 text-white text-xs font-bold py-1 px-3 rounded-full">
              NEJLEPŠÍ VOLBA
            </div>
            <div className="mb-4">
              <div className="text-xl font-bold mb-1 text-zinc-900">S příspěvkem MPSV</div>
              <div className="inline-flex items-baseline mb-2">
                <span className="text-zinc-900 font-bold text-4xl">3 600 Kč</span>
                <span className="text-zinc-500 font-medium ml-2">vč. DPH</span>
              </div>
              <div className="text-emerald-500 font-semibold">Ušetříte 16 400 Kč!</div>
            </div>
            <div className="text-zinc-500 mb-3">
              S příspěvkem Ministerstva práce a sociálních věcí, který Vám pokryje 82 % částky za kurzovné.
            </div>
            <ul className="text-zinc-500 space-y-3 grow">
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>V rámci projektu "Jsem v kurzu"</span>
              </li>
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Proškolení za zvýhodněných podmínek</span>
              </li>
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Nutné přihlášení 1 měsíc před kurzem</span>
              </li>
            </ul>
            <div className="mt-8">
              <a className="btn text-white bg-zinc-900 hover:bg-zinc-800 w-full shadow" href="https://www.aiinstitute.cz/ai-dovednosti-registrace">Koupit s podporou</a>
            </div>
          </div>
          {/* Option 2 - Standard Price */}
          <div className="relative flex flex-col h-full p-6 bg-white rounded-lg border border-zinc-200 shadow-sm">
            <div className="mb-4">
              <div className="text-lg font-semibold mb-1 text-zinc-900">Standardní cena</div>
              <div className="inline-flex items-baseline mb-2">
                <span className="text-zinc-900 font-bold text-3xl">20 000 Kč</span>
                <span className="text-zinc-500 font-medium ml-2">vč. DPH</span>
              </div>
            </div>
            <div className="text-zinc-500 mb-3">
              Standardní cena 2denního školení bez státní podpory.
            </div>
            <ul className="text-zinc-500 space-y-3 grow">
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-zinc-300 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span className="line-through">Bez státní podpory</span>
              </li>
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-zinc-300 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span className="line-through">Bez zvýhodněných podmínek</span>
              </li>
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Flexibilní registrace</span>
              </li>
            </ul>
            <div className="mt-8">
              <a className="btn text-zinc-600 bg-white hover:text-zinc-900 w-full border border-zinc-200 shadow" href="https://www.aiinstitute.cz/ai-dovednosti-registrace">Koupit bez podpory</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinancingOptions
