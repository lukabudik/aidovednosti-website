import IsItForMe from "@/components/is-it-for-me"
import { PiCertificate, PiCamera, PiIceCream } from "react-icons/pi"
import { FiCoffee } from 'react-icons/fi'
import TestimonialImg01 from '@/public/images/testimonial-01.jpg'
import TestimonialImg02 from '@/public/images/testimonial-02.jpg'
import TestimonialImg03 from '@/public/images/testimonial-03.jpg'
import TestimonialImg04 from '@/public/images/testimonial-04.jpg'

export const metadata = {
  title: 'AI pro realitní makléře - Ovládněte umělou inteligenci',
  description: 'Specializovaný kurz AI pro realitní makléře, obchodníky a investory. Naučte se využívat umělou inteligenci pro zvýšení produktivity a efektivity vaší práce.',
}

import Hero from '@/components/hero'
import WhatWillYouLearn from '@/components/what-will-you-learn'
import Features02 from '@/components/features-02'
import Features03 from '@/components/features-03'
import Testimonials from '@/components/testimonials'
import Cta from '@/components/cta'
import PricingDates from "@/components/pricing-dates"
import MeetTrainers from "@/components/meet-trainers"
import Bonuses from "@/components/bonuses"
import SignInInstructions from "@/components/SignInInstructions"
import FinancingOptions from "@/components/financing-options"
import CourseProgramme from "@/components/course-programme"
import PartnerLogos from "@/components/PartnerLogos"

export default function Home() {
  return (
    <>
      <Hero 
        title={{
          prefix: "AI pro obchodníky,",
          highlight: "realiťáky",
          suffix: "a realitní investory"
        }}
        description="Nauč se konečně pracovat s AI, zvyš svou hodnotu na trhu práce a zvládni 2x tolik práce za stejné množství času."
        cta={{
          primary: {
            text: "Koupit s podporou",
            href: "#pricing-dates",
            discount: "-82%"
          },
          secondary: {
            text: "Koupit bez podpory",
            href: "#pricing-dates"
          }
        }}
        video={{
          embedUrl: "https://www.youtube.com/embed/lrkoFhfeMcY",
          title: "AI pro realitní makléře"
        }}
        partners={{
          heading: "Své vzdělání v oblasti AI nám svěřují přední společnosti",
          list: [
            { name: 'Century21', logo: '/images/partners/century.webp', url: 'https://www.century21.cz/' },
            { name: 'XTB', logo: '/images/partners/xtb.webp', url: 'https://www.xtb.com/cz' },
            { name: 'Seznam', logo: '/images/partners/seznam.webp', url: 'https://www.seznam.cz/' },
            { name: 'Remax', logo: '/images/partners/remax.webp', url: 'https://www.remax-czech.cz/' },
            { name: 'Svaz Měst a Obcí ČR', logo: '/images/partners/smo.webp', url: 'https://www.smocr.cz/' },
            { name: 'KKCG', logo: '/images/partners/kkcg.webp', url: 'https://www.kkcg.com/' },
            { name: 'AHRČR', logo: '/images/partners/ahr.webp', url: 'https://www.ahrcr.cz/' }
          ]
        }}
      />
      <MeetTrainers 
        heading={{
          title: "Učit vás budou zkušení odborníci s praxí v oboru",
          subtitle: "Naši školitelé jen za poslední rok proškolili přes 2000 lidí online a přes 700 lidí offline"
        }}
        trainers={[
          {
            name: "Daniel Kosec",
            role: "Zakladatel AI Institute",
            bio: "Specialista na AI produktivitu a podnikatel s úspěšnými projekty v oblastech krypta, biohackingu a nemovitostí. Expert na zvyšování produktivity pomocí AI a biohackingu.",
            image: "/images/dan.jpg"
          },
          {
            name: "Ondřej Hlaváč",
            role: "Expert na AI vzdělávání",
            bio: "Spoluzakladatel AI Institute s rozsáhlými zkušenostmi ve vzdělávání. V roce 2023 vedl školení pro desítky firem a stovky jednotlivců v oblasti AI.",
            image: "/images/ondra.jpeg"
          },
          {
            name: "Luka Budík",
            role: "Technický ředitel",
            bio: "Specialista na vývoj AI a automatizaci. Spoluzakladatel AI Institute a hlavní vývojář Advomate - předního AI nástroje pro právníky v ČR.",
            image: "/images/luka.jpg"
          }
        ]}
      />
      <PricingDates
          heading={{
            title: "Termíny a ceny kurzů",
            subtitle: "Vyberte si termín, který vám nejvíce vyhovuje"
          }}
          pricing={{
            amount: "14 900 Kč",
            earlyBirdDiscount: {
              amount: "2 664 Kč",
              text: "s dotací MPSV",
              label: "SLEVA!"
            }
          }}
          upcomingDates={{
            title: "Nadcházející termíny",
            filterLabel: "Filtrovat podle zaměření",
            allCoursesLabel: "Všechna zaměření",
            nextCourseLabel: "Nejbližší kurz:",
            daysLeftText: "Do kurzu v {city} zbývá jen {days} dní na registraci!",
            courseDateLabel: "Datum kurzu:",
            registrationDeadlineLabel: "Deadline registrace:",
            cityLabel: "Město:",
            focusLabel: "Zaměření:"
          }}
      />
      <FinancingOptions
          heading={{
            title: "Možnosti financování",
            subtitle: "Vyberte si variantu, která vám nejlépe vyhovuje"
          }}
          options={[
            {
              title: "S příspěvkem MPSV",
              price: {
                amount: "3 600",
                currency: "Kč",
                includesVat: true
              },
              savings: {
                amount: "16 400 Kč",
                label: "Ušetříte"
              },
              description: "S příspěvkem Ministerstva práce a sociálních věcí, který Vám pokryje 82 % částky za kurzovné.",
              features: [
                { text: 'V rámci projektu "Jsem v kurzu"', enabled: true },
                { text: "Proškolení za zvýhodněných podmínek", enabled: true },
                { text: "Nutné přihlášení 1 měsíc před kurzem", enabled: true }
              ],
              cta: {
                text: "Koupit s podporou",
                href: "https://www.aiinstitute.cz/ai-dovednosti-registrace"
              },
              badge: "NEJLEPŠÍ VOLBA"
            },
            {
              title: "Standardní cena",
              price: {
                amount: "20 000",
                currency: "Kč",
                includesVat: true
              },
              description: "Standardní cena 2denního školení bez státní podpory.",
              features: [
                { text: "Bez státní podpory", enabled: false },
                { text: "Bez zvýhodněných podmínek", enabled: false },
                { text: "Flexibilní registrace", enabled: true }
              ],
              cta: {
                text: "Koupit bez podpory",
                href: "https://www.aiinstitute.cz/ai-dovednosti-registrace"
              }
            }
          ]}
      />
      <CourseProgramme
          heading={{
            title: "Program kurzu",
            subtitle: "Podrobný program dvoudenního kurzu"
          }}
          programme={[
            {
              day: "Den 1",
              blocks: [
                {
                  time: "9:00",
                  title: "Úvod do AI pro realitní makléře",
                  content: [
                    "Základní koncepty AI v realitním byznysu",
                    "- Historie a vývoj umělé inteligence",
                    "- Současné možnosti a limity AI v realitách",
                    "- Praktické využití v každodenní práci makléře"
                  ]
                },
                {
                  time: "10:30",
                  title: "Přestávka na kávu",
                  content: [],
                  icon: <FiCoffee />
                },
                {
                  time: "11:00",
                  title: "Praktické využití AI v realitách",
                  content: [
                    "Základní nástroje a jejich použití",
                    "- ChatGPT pro tvorbu popisů nemovitostí",
                    "- Midjourney pro úpravu fotografií nemovitostí",
                    "- AI nástroje pro analýzu trhu"
                  ]
                }
              ]
            },
            {
              day: "Den 2",
              blocks: [
                {
                  time: "9:00",
                  title: "Pokročilé techniky",
                  content: [
                    "Efektivní prompt engineering pro reality",
                    "- Tvorba poutavých popisů nemovitostí",
                    "- Optimalizace inzerátů",
                    "- Práce s fotografiemi nemovitostí"
                  ]
                },
                {
                  time: "10:30",
                  title: "Přestávka na kávu",
                  content: [],
                  icon: <FiCoffee />
                },
                {
                  time: "11:00",
                  title: "Praktické workshopy",
                  content: [
                    "Reálné případové studie",
                    "- Automatizace rutinních úkolů makléře",
                    "- Tvorba marketingových materiálů",
                    "- Analýza realitního trhu s AI"
                  ]
                }
              ]
            }
          ]}
          cta={{
            primary: {
              text: "Koupit s podporou",
              href: "#pricing-dates",
              discount: "-82%"
            },
            secondary: {
              text: "Koupit bez podpory",
              href: "#pricing-dates"
            }
          }}
      />
      <WhatWillYouLearn
          heading={{
            title: "Naučíme tě toho opravdu hodně",
            subtitle: "AI reads and understands your designs, and with nothing more than a single line of feedback, perform complex actions autonomously."
          }}
          tabs={[
            {
              id: 1,
              title: 'Základy',
              description: 'Vše, co potřebuješ vědět o tom jak a proč AI funguje.',
              content: {
                title: 'Základy',
                list: [
                  'Teorie jazykových modelů',
                  'Jak správně promptovat (zadávat příkazy)',
                  'Jak komplexně pracovat s ChatGPT',
                  'Jak si s vytvořit vlastní asistenty, kteří za tebe udělají rutinní úkoly',
                  'Jak pomocí AI analyzovat data',
                  'Jak ověřovat informace a vyhledávat na internetu'
                ]
              }
            },
            {
              id: 2,
              title: 'Grafika',
              description: 'Vytvářej krásné vizuály během pár minut a ušetři za grafika.',
              content: {
                title: 'Grafika',
                list: [
                  'Jak vizualizovat svoje nápady',
                  'Tvorba úžasných ilustrací a realistických fotek pomocí Midjourney',
                  'Jak vytvářet kompletní promo materiály, včetně textu',
                  'Už neřeš branding - nech si ho celý vygenerovat',
                  'Jak si pomocí AI vytvořit profesionální fotky na LinkedIn'
                ]
              }
            },
            {
              id: 3,
              title: 'Video',
              description: 'Vlastní dvojník, nebo krásné záběry do reklamy? Obratem!',
              content: {
                title: 'Video',
                list: [
                  'Vytvoř si vlastního AI dvojníka, který ti pomůže s marketingem po celém světě',
                  'Jak si pomocí AI nadabovat jakékoliv video',
                  'Krásné záběry do reklamy během pár vteřin',
                  'Nech si od AI sestříhat celé video'
                ]
              }
            },
            {
              id: 4,
              title: 'Produktivita',
              description: 'Tyto nástroje se stanou tvým každodenním pomocníkem.',
              content: {
                title: 'Produktivita',
                list: [
                  'Získej vlastní asistentku, která ti sepíše zápisy ze schůzek',
                  'Jak získat kvalifikované leady',
                  'Jak si díky AI odpřipommínkovat smlouvy v kvalitě právníka',
                  'Vytvoř si vlastního chatbota, který zodpoví dotazy tvým zákazníkům',
                ]
              }
            }
          ]}
      />
      <Bonuses 
        heading={{
          title: "Bonusy ke kurzu",
          subtitle: "Získejte ještě více hodnoty"
        }}
        bonuses={[
          {
            title: 'Certifikát na LinkedIn',
            description: 'Nejen že začnete šetřit hodiny denně, získáte hodnotný certifikát, který zvýší vaši hodnotu na trhu práce.',
            icon: PiCertificate
          },
          {
            title: 'Praktické workshopy',
            description: 'Vypracujete si s námi úkoly, které vám umožní hned další den po skončení workshopu opravdu šetřit čas v práci.',
            icon: PiCamera
          },
          {
            title: 'Neomezená podpora',
            description: 'Můžete se zeptat na cokoli! Automatizace, vývoj nebo jak udělat, aby GPT psalo jako vy.',
            icon: PiIceCream
          }
        ]}
      />
      <Testimonials
          heading={{
            title: "Co o kurzu říkají realitní makléři"
          }}
          testimonials={[
            {
              image: TestimonialImg01,
              name: 'Jan Novák',
              user: 'Realitní makléř, RE/MAX',
              link: '#0',
              content: 'Díky AI workshopu jsem schopen zpracovat dvojnásobek nabídek nemovitostí za polovinu času. Skvělá investice do vzdělání!',
            },
            {
              image: TestimonialImg02,
              name: 'Marie Svobodová',
              user: 'Realitní makléřka, Century21',
              link: '#0',
              content: 'Konečně rozumím AI a dokážu ji efektivně využívat. Ušetřím spoustu času na rutinních úkolech a můžu se věnovat klientům.',
            },
            {
              image: TestimonialImg03,
              name: 'Petr Dvořák',
              user: 'Realitní investor',
              link: '#0',
              content: 'Workshop mi otevřel oči. Teď využívám AI pro analýzu trhu a automatizaci procesů. Moje produktivita se zdvojnásobila.',
            },
            {
              image: TestimonialImg04,
              name: 'Lucie Černá',
              user: 'Realitní makléřka, M&M Reality',
              link: '#0',
              content: 'Díky AI nástrojům zvládám vytvořit profesionální prezentace nemovitostí v rekordním čase. Klienti jsou nadšení!',
            }
          ]}
      />
      <SignInInstructions
        heading={{
          title: "Jak se přihlásit na workshop?",
          subtitle: "Jednoduchý proces registrace"
        }}
        steps={[
          { text: 'Použijte počítač nebo notebook (ne tablet ani mobilní telefon).' },
          { text: 'Ujistěte se, že máte povoleny cookies.' },
          { text: 'Použijte webový prohlížeč Google Chrome.' },
          { text: 'Navštivte stránky aidovednosti.cz a klikněte na sekci "S dotací".' },
          { text: 'Přihlaste se prostřednictvím bankovní identity nebo identity občana (ne prostřednictvím IČO).' },
          { text: 'Pokud vás to hned nepřesměruje na daný kurz, dejte do vyhledávače „ai institute" nebo "inion".' },
          { text: 'V dotazníku zdůrazněte, jak vám účast na AI workshopu pomůže v profesním růstu.' },
          { text: 'Do 3–5 minut byste měli být přihlášeni, schválení přihlášky trvá přibližně 3 týdny.' }
        ]}
        contact={{
          text: "Máte-li jakékoliv dotazy, neváhejte kontaktovat",
          phone: "+420 775 200 593",
          name: "Ondřej Hlaváč"
        }}
        video={{
          embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          title: "Video návod k registraci"
        }}
        cta={{
          primary: {
            text: "Koupit s podporou",
            href: "#pricing-dates",
            discount: "-82%"
          },
          secondary: {
            text: "Koupit bez podpory",
            href: "#pricing-dates"
          }
        }}
      />
    </>
  )
}
