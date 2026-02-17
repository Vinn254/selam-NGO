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
    title: 'International Partners',
    description: 'Global organizations supporting our mission',
    partners: [
      { name: 'United Nations Development Programme', type: 'Development Agency' },
      { name: 'World Health Organization', type: 'Health Organization' },
      { name: 'UNICEF Kenya', type: 'Children\'s Fund' },,
      { name: 'Save the Children', type: 'International NGO' },
    ],
  },
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
    title: 'Corporate Partners',
    description: 'Businesses committed to social responsibility',
    partners: [
      { name: 'Kenyan Airlines', type: 'Corporate Sponsor' },
      { name: 'Commercial Bank of Kenya', type: 'Financial Partner' },
      { name: 'Telkom Kenya', type: 'Technology Partner' },
      { name: 'Dashen Bank', type: 'Financial Partner' },
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
    icon: '🤝',
    title: 'Strategic Collaboration',
    description: 'Work together on impactful projects that align with your mission and values',
  },
  {
    icon: '📊',
    title: 'Measurable Impact',
    description: 'Receive detailed reports and data on the outcomes of your partnership',
  },
  {
    icon: '🌍',
    title: 'Community Connection',
    description: 'Direct engagement with communities and beneficiaries',
  },
  {
    icon: '✨',
    title: 'Brand Visibility',
    description: 'Recognition across our platforms and community events',
  },
]

export default function PartnersPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <section className="py-20 green-pattern-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6">
              Stronger Together
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Selam, we believe that meaningful change requires collaboration. Our partnerships are built on shared values, mutual respect, and a commitment to sustainable development. Together with our partners, we leverage resources, expertise, and networks to maximize our impact and reach more communities in need.
            </p>
          </div>
        </section>

        {/* Partner Categories */}
        {partnerCategories.map((category, index) => (
          <section
            key={index}
            className={`py-20 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
                  {category.title}
                </h2>
                <p className="text-lg text-gray-600">
                  {category.description}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.partners.map((partner, idx) => (
                  <div
                    key={idx}
                    className="green-card p-6 rounded-2xl"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-display font-bold text-gray-900 mb-2">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-gray-600">{partner.type}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Partnership Benefits */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Why Partner With Us
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Benefits of collaborating with Selam NGO
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {partnershipBenefits.map((benefit, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-display font-bold text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-white/80">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Types */}
        <section className="py-20 green-pattern-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
                Partnership Opportunities
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Multiple ways to collaborate and make an impact
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Financial Support',
                  description: 'Provide funding for specific programs or general operations',
                  icon: '💰',
                  gradient: 'from-emerald-500 to-green-500',
                },
                {
                  title: 'In-Kind Donations',
                  description: 'Contribute equipment, supplies, or professional services',
                  icon: '🎁',
                  gradient: 'from-teal-500 to-cyan-500',
                },
                {
                  title: 'Technical Expertise',
                  description: 'Share knowledge and skills to strengthen our programs',
                  icon: '🔧',
                  gradient: 'from-blue-500 to-indigo-500',
                },
              ].map((type, index) => (
                <div key={index} className="green-card p-8 rounded-2xl text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${type.gradient} mb-4 text-4xl`}>
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
                    {type.title}
                  </h3>
                  <p className="text-gray-600">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 green-pattern-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6">
              Become a Partner
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Let's work together to create sustainable change and empower communities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/join-us" className="btn-primary">
                Partner With Us
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Contact Us
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
