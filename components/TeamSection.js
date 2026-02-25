'use client'

import Image from 'next/image'

// Team members data
const teamMembers = [
  {
    name: 'Robert Owino',
    role: 'Chief Executive Officer (CEO)',
    image: '/PIC1.jpeg',
    description: 'Leading Selam CBO with vision and dedication to community empowerment.',
  },
  {
    name: 'Vincent Mboya',
    role: 'Director',
    image: '/PIC2.jpeg',
    description: 'Driving strategic initiatives and fostering partnerships for sustainable growth.',
  },
  {
    name: 'Rosemary Awuor',
    role: 'Treasurer',
    image: '/PIC3.jpeg',
    description: 'Ensuring transparent financial management and resource allocation.',
  },
]

export default function TeamSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The dedicated individuals driving Selam CBO's mission forward
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-container">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <div className="relative h-80 sm:h-96 w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white/90 text-sm">{member.description}</p>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-emerald-600 font-semibold text-sm">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
