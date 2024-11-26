import Image from 'next/image'

interface Trainer {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface MeetTrainersProps {
  heading: {
    title: string;
    subtitle: string;
  };
  trainers: Trainer[];
}

export default function MeetTrainers({ heading, trainers }: MeetTrainersProps) {
  return (
    <section className=" py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center pb-12">
          <h2 className="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-900 mb-4">{heading.title}</h2>
          <p className="text-lg text-zinc-500">{heading.subtitle}</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-lg shadow-sm transition duration-300 hover:shadow-lg"
            >
              <div className="absolute inset-0 border border-transparent rounded-lg [background:linear-gradient(theme(colors.white),theme(colors.white))_padding-box,linear-gradient(120deg,theme(colors.zinc.300),theme(colors.zinc.100),theme(colors.zinc.300))_border-box]"></div>
              <div className="relative p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative h-16 w-16 shrink-0">
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  </div>
                  <div>
                    <h3 className="font-inter-tight text-lg font-semibold text-zinc-900">{trainer.name}</h3>
                    <p className="text-sm font-medium text-zinc-500">{trainer.role}</p>
                  </div>
                </div>
                <div className="border-t border-zinc-100 pt-4">
                  <p className="text-sm text-zinc-600 leading-relaxed">{trainer.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
