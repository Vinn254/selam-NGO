import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata = {
  title: 'Our Programs | Selam CBO Kenya - Education, Healthcare & Community Development Programs',
  description: 'Explore Selam CBO Kenya\'s comprehensive programs including education, vocational training, mentorship, healthcare, and economic empowerment for youth, women, and children in Kisumu, Kenya.',
  keywords: ['Selam CBO programs', 'education programs Kenya', 'vocational training Kisumu', 'youth empowerment programs', 'women empowerment Kenya', 'community development programs', 'healthcare services Kenya', 'economic empowerment Kenya'],
  openGraph: {
    title: 'Our Programs | Selam CBO Kenya - Empowering Communities Through Education and Development',
    description: 'Discover how Selam CBO Kenya\'s vocational training, mentorship, and community development programs transform lives of youth, women, and children in Kisumu.',
    images: ['/og-programs.jpg'],
  },
}

const programs = [
  {
    id: 1,
    title: 'MAMA AND BABY CARE SUPPORT',
    description: 'The Mama and Baby Care Support Program focuses on supporting young and marginalized mothers within the community. The aim of the program is to improve maternal and child wellbeing by providing essential baby supplies and educational support.',
    initiatives: [
      'Proper child care',
      'Nutrition and feeding',
      'Maternal health',
      'Baby hygiene and development',
    ],
    schedule: 'Every Monday',
    impact: 'Consistent support and follow-up for registered mothers and babies',
  },
  {
    id: 2,
    title: 'EMPOWERHER SCHOOL INITIATIVE',
    description: 'The EmpowerHer School Initiative is designed to empower adolescent girls in Grade 6 and Grade 7, particularly in marginalized village schools.',
    initiatives: [
      'Menstrual health education',
      'Personal development',
      'Self-esteem and confidence building',
      'Guidance on adolescence and health',
    ],
    schedule: 'First Friday of every month, Last Friday of every month',
    impact: 'Improving menstrual hygiene awareness and school attendance for young girls',
  },
  {
    id: 3,
    title: 'MARGINALIZED AID PROGRAM',
    description: 'The Marginalized Aid Program aims to support vulnerable individuals in the community, including abandoned elderly persons, extremely poor families, children lacking clothes or school uniforms, and individuals facing difficult living conditions.',
    initiatives: [
      'Support for abandoned elderly persons',
      'Assistance for extremely poor families',
      'Clothes and school uniforms for children',
      'Basic shopping and essential support to improve living conditions',
      'Restoration of hope through regular contact',
    ],
    schedule: 'Every Wednesday',
    impact: 'Strengthening support for the community\'s most vulnerable members',
  },
  {
    id: 4,
    title: 'KIDS FUN TIME PROGRAM',
    description: 'The Kids Fun Time Program focuses on nurturing children through fun, learning, and talent development activities. The Saturday program creates a safe and engaging environment where children can participate in various activities.',
    initiatives: [
      'Dance and talent activities',
      'Educational games',
      'Motivational and entertaining movies',
      'Occasional learning sessions',
      'Socialization and confidence building',
    ],
    schedule: 'Every Saturday',
    impact: 'Nurturing and mentoring children through positive activities',
  },
]

const galleryImages = [
  '/photo1.jpeg',
  '/photo2.jpeg',
  '/photo3.jpeg',
  '/photo4.jpeg',
  '/photo5.jpeg',
  '/photo6.jpeg',
  '/photo7.jpeg',
  '/photo8.jpeg',
  '/photo9.jpeg',
  '/photo10.jpeg',
  '/photo11.jpeg',
]

const patternSvg = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"

export default function WhatWeDoPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen page-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-[#059669]">
          <div className="absolute inset-0 opacity-50" style={{ backgroundImage: `url("${patternSvg}")` }}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
                What We Do
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Comprehensive programs designed to create lasting impact and empower communities across Kenya
              </p>
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {programs.map((program, index) => (
                <article key={program.id} className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6 h-full flex flex-col">
                    <h2 className="text-2xl font-display font-bold text-slate-900 mb-3">
                      {program.title}
                    </h2>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                      {program.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      {program.initiatives.map((initiative, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></span>
                          <span>{initiative}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto pt-4">
                      <div className="rounded-xl bg-emerald-50 p-4 mb-4">
                        <div className="text-xs uppercase text-emerald-600 mb-1 font-medium">Schedule</div>
                        <div className="font-semibold text-emerald-800">{program.schedule}</div>
                      </div>
                      <div className="rounded-xl bg-cyan-50 p-4">
                        <div className="text-xs uppercase text-cyan-600 mb-1 font-medium">Impact</div>
                        <div className="text-sm text-cyan-800">{program.impact}</div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Program Photo Gallery */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
                Program Gallery
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Visual highlights from our recent program activities and community impact
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {galleryImages.map((src, idx) => (
                <div key={src} className="overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white">
                  <img
                    src={src}
                    alt={`Program photo ${idx + 1}`}
                    width={400}
                    height={300}
                    className="h-40 w-full object-cover block hover:opacity-90 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Overall Program Impact */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
                Overall Program Impact
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                These programs are designed to create sustainable community impact through continuous outreach, mentorship, and support.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Support vulnerable mothers and children',
                'Improve menstrual health awareness among school girls',
                'Assist marginalized members of society',
                'Nurture and mentor children through positive activities',
                'Build a stronger, healthier, and more empowered community',
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <p className="text-gray-700 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
                Capacity-building Efforts
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                The organisation shall undertake:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="modern-card modern-card-green-light text-white p-6">
                <div className="modern-card-content">
                  <h3 className="text-xl font-display font-bold mb-2">
                    Fostering unity through welfare and social support programs.
                  </h3>
                </div>
              </div>
              <div className="modern-card modern-card-green-teal text-white p-6">
                <div className="modern-card-content">
                  <h3 className="text-xl font-display font-bold mb-2">
                    Women's and youth empowerment.
                  </h3>
                </div>
              </div>
              <div className="modern-card modern-card-green-emerald text-white p-6">
                <div className="modern-card-content">
                  <h3 className="text-xl font-display font-bold mb-2">
                    Education and skills development
                  </h3>
                </div>
              </div>
              <div className="modern-card modern-card-green-mint text-white p-6">
                <div className="modern-card-content">
                  <h3 className="text-xl font-display font-bold mb-2">
                    Health awareness and support.
                  </h3>
                </div>
              </div>
              <div className="modern-card modern-card-green-light text-white p-6">
                <div className="modern-card-content">
                  <h3 className="text-xl font-display font-bold mb-2">
                    Economic strengthening initiatives.
                  </h3>
                </div>
              </div>
              <div className="modern-card modern-card-green-teal text-white p-6">
                <div className="modern-card-content">
                  <h3 className="text-xl font-display font-bold mb-2">
                    Environmental responsibility.
                  </h3>
                </div>
              </div>
              <div className="modern-card modern-card-green-emerald text-white p-6 md:col-span-2">
                <div className="modern-card-content">
                  <h3 className="text-xl font-display font-bold mb-2">
                    Promotion of sexual and reproductive health.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="py-20 bg-[#059669]">
          <div className="absolute inset-0 opacity-50" style={{ backgroundImage: `url("${patternSvg}")` }}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Our Approach
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                We believe in sustainable, community-driven development
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-container">
              {[
                { title: 'Community-Led', description: 'Local voices guide our programs', color: 'modern-card-green-extra-light' },
                { title: 'Sustainable', description: 'Building long-term solutions', color: 'modern-card-green-bright' },
                { title: 'Inclusive', description: 'Reaching the most vulnerable', color: 'modern-card-green-vibrant' },
                { title: 'Data-Driven', description: 'Measuring impact and learning', color: 'modern-card-green-light' },
              ].map((approach, index) => (
                <div key={index} className={`modern-card ${approach.color} text-white p-6 text-center`}>
                  <div className="modern-card-content">
                    <h3 className="text-xl font-display font-bold mb-2">
                      {approach.title}
                    </h3>
                    <p className="text-white/80">{approach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6">
              Join Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Be part of the change. Together, we can transform lives and build stronger communities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/join-us" className="modern-card modern-card-green-bright text-white px-8 py-4 inline-block">
                <span className="modern-card-content text-center font-semibold">Get Involved</span>
              </a>
              <a href="/partners" className="modern-card modern-card-blue text-white px-8 py-4 inline-block">
                <span className="modern-card-content text-center font-semibold">Become a Partner</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
