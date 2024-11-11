import React from 'react'
import { PiCertificate, PiCamera, PiIceCream } from "react-icons/pi";

export default function Bonuses() {
  const bonuses = [
    {
      title: '8h záznamů ze školení',
      description : 'Získáte navíc záznamy ze 4 online školení o ChatGPT, AI Grafice, AI autorským právům a AI produktivitě + 1 měs v naši AI komunitě.',
      icon: PiCamera
    },
    {
      title: 'Osvěžení a podpora',
      description: 'Abyste si mohli vědomosti nabité v tomto workshopu nejen kdykoli osvěžit, ale zároveň se i zeptat.',
      icon: PiIceCream
    },
    {
      title: 'Certifikát od AI Institute',
      description: 'Absolvováním kurzu výrazně zvýšíte svoji hodnotu na trhu práce a získáte prestižní certifikát od AI Institute.',
      icon: PiCertificate
    }
  ]

  return (
    <section>
      <div className=" py-12 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative max-w-3xl mx-auto text-center pb-8 md:pb-12">
            <h2 className="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Bonusy, které získáte po absolvování workshopu</h2>
            <p className="text-lg text-zinc-500">Připravili jsme pro vás exkluzivní bonusy k rozšíření vašich znalostí</p>
          </div>
          <div className="max-w-sm mx-auto sm:max-w-none grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-4 lg:gap-8">
            {bonuses.map((bonus, index) => (
              <article key={index} className="flex flex-col border border-transparent [background:linear-gradient(theme(colors.white),theme(colors.zinc.50))_padding-box,linear-gradient(120deg,theme(colors.zinc.300),theme(colors.zinc.100),theme(colors.zinc.300))_border-box] rounded-lg">
                <div className="grow flex flex-col p-5 pt-6">
                  <div className="flex items-center space-x-3 mb-1">
                    <bonus.icon className="w-6 h-6 text-zinc-400" />
                    <h3 className="font-inter-tight font-semibold text-zinc-900">{bonus.title}</h3>
                  </div>
                  <p className="grow text-sm text-zinc-500">{bonus.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
