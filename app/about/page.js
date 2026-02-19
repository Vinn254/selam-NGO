import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import Image from 'next/image'

export const metadata = {
  title: 'About Us',
  description: 'Learn about Selam NGO\'s history, mission, vision, and the dedicated team working to empower communities across Kenya through sustainable development initiatives.',
  openGraph: {
    title: 'About Selam NGO - Our Story and Mission',
    description: 'Discover how Selam NGO is transforming lives through education, healthcare, and community development.',
    images: ['/og-about.jpg'],
  },
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
                ABOUT US
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto text-left">
                SELAM is a non-political, independent, and non-profit Community-Based Organization (CBO) founded in Kisumu, Kenya, that empowers vulnerable communities by fostering solidarity, creating opportunities, and promoting sustainable growth. Established to address gender inequality, poverty, and limited access to education and health services, as well as promote environmental sustainability. The name “Selam,” meaning peace, reflects our commitment to inclusive development, human dignity, and community harmony.
              </p>
            </div>
          </div>
        </section>

        {/* Organizational Core Values Section */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
                Organizational Core Values
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Selam CBO launches grassroots initiatives that support youth, women, and children. Through education, vocational training, mentorship, reproductive health advocacy, and economic empowerment, the organization addresses core social challenges, including early pregnancies, substance abuse, and food insecurity. Driven by integrity, inclusivity, and sustainability, Selam CBO cultivates lasting, community-led progress throughout Kisumu County.
              </p>
            </div>

            <ol className="list-decimal list-inside space-y-4 text-gray-700 leading-relaxed">
              <li>We act with integrity and take responsibility for our actions.</li>
              <li>We value inclusivity and treat everyone equally.</li>
              <li>We encourage everyone to take part in our community.</li>
              <li>We are open and transparent in all that we do.</li>
              <li>We are committed to sustainable practices.</li>
              <li>We stand up for social justice.</li>
              <li>We take responsibility for protecting the environment.</li>
            </ol>

            <div className="mt-12 text-center">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">Core Values</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {['Integrity & Accountability','Inclusivity & Equality','Community Participation','Transparency','Sustainability','Social Justice','Environmental Responsibility'].map((v, i) => (
                  <span key={i} className="px-4 py-2 bg-gray-50 text-gray-800 rounded-full shadow-sm">{v}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Our Impact
              </h2>
              <p className="text-lg text-white/90">
                Making a difference, one community at a time
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: '50,000+', label: 'Lives Transformed' },
                { number: '15', label: 'Regions Served' },
                { number: '100+', label: 'Active Projects' },
                { number: '200+', label: 'Community Partners' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl sm:text-5xl font-display font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6">
              Join Us in Making a Difference
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Together, we can create lasting change and empower communities across Kenya
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/join-us" className="btn-primary">
                Get Involved
              </a>
              <a href="/what-we-do" className="btn-secondary">
                Our Programs
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
