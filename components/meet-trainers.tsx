import Image from 'next/image'

interface Trainer {
  name: string;
  bio: string;
  image: string;
}

const trainers: Trainer[] = [
  {
    name: "Daniel Kosec",
    bio: "\n" +
        "Specialista na AI produktivitu Je podnikatel, který založil velmi ziskové firmy v kryptu, biohackingu, nemovitostech i AI. I AI Institutu. Je specialistou na zvyšování produktivity díky biohackingu i AI.",
    image: "/images/dan.jpg"
  },
  {
    name: "Ondřej Hlaváč",
    bio: "Borec který vás i vaši firmu naučí AI. Je spoluzakladatel AI Institute a odškolil a zauditoval ve 2023 desítky firem a stovky jednotlivců online i offline.",
    image: "/images/ondra.jpeg"
  },
  {
    name: "Luka Budík",
    bio: "Specialista na vývoj AI a automatizace. Je spoluzakladatel AI Institute a hlavní vývojář nejlepšího AI nástroje pro právníky v ČR Advomate.",
    image: "/images/luka.jpg"
  },
];

export default function MeetTrainers() {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-900 mb-8 text-center">Poznejte své školitele</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div key={index} className="flex flex-col h-full p-6 bg-white rounded-lg border border-transparent [background:linear-gradient(theme(colors.white),theme(colors.white))_padding-box,linear-gradient(120deg,theme(colors.zinc.300),theme(colors.zinc.100),theme(colors.zinc.300))_border-box]">
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-inter-tight text-xl font-semibold text-zinc-900 mb-2">{trainer.name}</h3>
              <p className="text-sm text-zinc-500 grow">{trainer.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
