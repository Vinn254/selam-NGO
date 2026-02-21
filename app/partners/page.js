import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata = {
  title: 'Partners',
  description: 'Meet Selam NGO\'s partners and collaborators. Together, we create sustainable impact through strategic partnerships with organizations, donors, and community stakeholders.',
  openGraph: {
    title: 'Our Partners - Selam NGO',
    description: 'Collaborating for greater impact across Kenya.',
    images: ['/og-partners.jpg'],
  },
}

const partnerCategories = [
  {
    title: 'Government Partners',
    description: 'Collaborating with local and national authorities',
    partners: [
      { name: 'Ministry of Health', type: 'Government Agency' },
      { name: 'Ministry of Education', type: 'Government Agency' },
      { name: 'Regional Health Bureaus', type: 'Local Government' },
      { name: 'Woreda Administrations', type: 'Local Government' },
    ],
  },
  {
    title: 'Community Partners',
    description: 'Local organizations and community groups',
    partners: [
      { name: 'Community Health Committees', type: 'Community Group' },
      { name: 'Women\'s Associations', type: 'Community Group' },
      { name: 'Youth Groups', type: 'Community Group' },
      { name: 'Faith-Based Organizations', type: 'Community Group' },
    ],
  },
]

const partnershipBenefits = [
  {
    title: 'Strategic Collaboration',
    description: 'Work together on impactful projects that align with your mission and values',
    color: 'modern-card-green',
  },
  {
    title: 'Measurable Impact',
    description: 'Receive detailed reports and data on the outcomes of your partnership',
    color: 'modern-card-green',
  },
  {
    title: 'Community Connection',
    description: 'Direct engagement with communities and beneficiaries',
    color: 'modern-card-green',
  },
  {
    title: 'Brand Visibility',
    description: 'Recognition across our platforms and community events',
    color: 'modern-card-green',
  },
]

const cardColors = ['modern-card-green', 'modern-card-green', 'modern-card-green', 'modern-card-green', 'modern-card-green', 'modern-card-green', 'modern-card-green']

const patternSvg = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"

export default function PartnersPage() {
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
                Our Partners
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Together, we amplify our impact and create lasting change in Kenyan communities
              </p>
            </div>
          </div>
        </section>

        {/* Partnership Philosophy */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="modern-card modern-card-briefing text-white p-8">
              <div className="modern-card-content relative z-10">
                <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                  Stronger Together
                </h2>
                <p className="text-lg text-white/90 leading-relaxed">
                  At Selam, we believe that meaningful change requires collaboration. Our partnerships are built on shared values, mutual respect, and a commitment to sustainable development. Together with our partners, we leverage resources, expertise, and networks to maximize our impact and reach more communities in need.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Categories */}
        {partnerCategories.map((category, index) => (
          <section key={index} className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
                  {category.title}
                </h2>
                <p className="text-lg text-gray-600">
                  {category.description}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-container">
                {category.partners.map((partner, idx) => (
                  <div
                    key={idx}
                    className={`modern-card ${cardColors[(index * 4 + idx) % cardColors.length]} text-white p-6`}
                  >
                    <div className="modern-card-content">
                      <h3 className="text-lg font-display font-bold mb-2">
                        {partner.name}
                      </h3>
                      <p className="text-sm text-white/80">{partner.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Partnership Benefits */}
        <section className="py-20 bg-[#059669]">
          <div className="absolute inset-0 opacity-50" style={{ backgroundImage: `url("${patternSvg}")` }}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Why Partner With Us
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Benefits of collaborating with Selam NGO
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-container">
              {partnershipBenefits.map((benefit, index) => (
                <div key={index} className={`modern-card ${benefit.color} text-white p-6 text-center`}>
                  <div className="modern-card-content">
                    <h3 className="text-xl font-display font-bold mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-white/80">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Types */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
                Partnership Opportunities
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Multiple ways to collaborate and make an impact
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 stagger-container">
              {[
                {
                  title: 'Financial Support',
                  description: 'Provide funding for specific programs or general operations',
                  color: 'modern-card-green',
                },
                {
                  title: 'In-Kind Donations',
                  description: 'Contribute equipment, supplies, or professional services',
                  color: 'modern-card-green',
                },
                {
                  title: 'Technical Expertise',
                  description: 'Share knowledge and skills to strengthen our programs',
                  color: 'modern-card-green',
                },
              ].map((type, index) => (
                <div key={index} className={`modern-card ${type.color} text-white p-8 text-center`}>
                  <div className="modern-card-content">
                    <h3 className="text-xl font-display font-bold mb-3">
                      {type.title}
                    </h3>
                    <p className="text-white/80">{type.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="modern-card modern-card-green text-white p-8 md:p-12">
              <div className="modern-card-content">
                <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                  Become a Partner
                </h2>
                <p className="text-lg text-white/90 mb-8">
                  Let's work together to create sustainable change and empower communities
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/join-us" className="modern-card modern-card-green text-white px-8 py-4 inline-block">
                    <span className="modern-card-content text-center font-semibold">Partner With Us</span>
                  </a>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modern-card modern-card-green text-white px-8 py-4 inline-block"
                  >
                    <span className="modern-card-content text-center font-semibold">Contact Us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
