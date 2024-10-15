import Counter from '@/components/counter'

interface StatProps {
  number: number
  prefix?: string
  suffix: string
  text: string
}

export default function Stats() {

  const stats: StatProps[] = [
    {
      number: 5,
      suffix: 'h+',
      text: 'Ušetřených týdně díky práci s ChatGPT a AI nástroji.',
    },
    {
      number: 16,
      suffix: 'h',
      text: 'Během kterých zjistíš, co vše dnes AI umí a čím ti může pomoci.',
    },
    {
      number: 20,
      suffix: '',
      text: 'Nástrojů, které ti nejen ukážeme, ale naučíme tě s nimi pracovat.',
    },
    {
      number: 20,
      prefix: 'až ',
      suffix: '%',
      text: 'Nárůst tvojí hodnoty na trhu práce díky získaným dovednostem a certifikátu.',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="max-w-sm mx-auto grid gap-12 sm:grid-cols-2 md:grid-cols-4 md:-mx-5 md:gap-0 items-start md:max-w-none">

        {stats.map((stat, index) => (
          <div key={index} className="relative text-center md:px-5">
            <h4 className="font-inter-tight text-2xl md:text-3xl font-bold tabular-nums mb-2">
                {stat.prefix && <span className="">{stat.prefix}</span>}
              <Counter number={stat.number} />
              {stat.suffix}
            </h4>
            <p className="text-sm text-zinc-500">{stat.text}</p>
          </div>
        ))}

      </div>
    </div>
  )
}