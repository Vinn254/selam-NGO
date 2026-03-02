import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import TeamSection from '@/components/TeamSection'
import AnimatedImpactStats from '@/components/AnimatedImpactStats'

export const metadata = {
  title: 'About Us | Selam CBO Kenya - Community-Based Organization in Kisumu',
  description: 'Learn about Selam CBO Kenya, a community-based organization in Kisumu empowering vulnerable communities through education, vocational training, mentorship, and sustainable development for youth, women, and children.',
  keywords: ['About Selam CBO', 'Community-Based Organization Kisumu', 'non-profit organization Kenya', 'youth women children empowerment', 'community development Kisumu', 'CBO Kenya', 'sustainable development organizations', 'gender inequality Kenya'],
  openGraph: {
    title: 'About Selam CBO Kenya | Community-Based Organization Empowering Vulnerable Communities',
    description: 'Discover how Selam CBO Kenya addresses gender inequality, poverty, and limited access to education through community initiatives for youth, women, and children in Kisumu.',
    images: ['/og-about.jpg'],
  },
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen page-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 bg-[#059669]">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-8">
                ABOUT US
              </h1>
              <div className="space-y-6 text-lg sm:text-xl text-white/90 max-w-6xl mx-auto text-left leading-relaxed">
                <p>
                  SELAM – Nuru ya Jamii Initiative CBO is a registered community-based organization in Kisumu, Kenya. Founded by committed local members, we address urgent social and economic challenges affecting vulnerable families in Kisumu County. Our organization is rooted in grassroots action, and our mission is to foster unity, expand opportunities, and promote sustainable, inclusive development.
                </p>
                <p>
                  Kisumu, located on the shores of Lake Victoria, is rich in culture and potential. However, communities continue to face significant barriers to progress and well-being. Gender inequality, poverty, and limited access to quality education and healthcare persist. Early pregnancies, substance abuse, crime, illiteracy, and food insecurity further undermine families and restrict opportunities for youth and women. We established SELAM – Nuru ya Jamii Initiative to address these urgent challenges through lasting, community-driven solutions.
                </p>
                <p>
                  The names "Selam," meaning peace, and "Nuru ya Jamii," meaning light of the community, embody our vision and guiding philosophy. For us, peace signifies not only the absence of conflict but also the presence of justice, opportunity, equality, and shared prosperity. As the light of the community, we aim to inspire resilience, self-reliance, and collective responsibility among those we serve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section - Client Component */}
        <TeamSection />

        {/* Organizational Core Values Section */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
                Organizational Core Values
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Selam CBO launches grassroots initiatives that support youth, women, and children. Through education, vocational training, mentorship, reproductive health advocacy, and economic empowerment, the organization addresses core social challenges, including early pregnancies, substance abuse, and food insecurity. Driven by integrity, inclusivity, and sustainability, Selam CBO cultivates lasting, community-led progress throughout Kisumu County.
              </p>
            </div>

            {/* Modern Animated Core Value Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-container mb-12">
              {[
                { title: 'Integrity & Accountability', desc: 'Acting with honesty and taking responsibility', color: 'modern-card-green-light' },
                { title: 'Inclusivity & Equality', desc: 'Treating everyone equally regardless of background', color: 'modern-card-green-teal' },
                { title: 'Community Participation', desc: 'Encouraging everyone to take part', color: 'modern-card-green-emerald' },
                { title: 'Transparency', desc: 'Being open in all that we do', color: 'modern-card-green-mint' },
                { title: 'Sustainability', desc: 'Committed to sustainable practices', color: 'modern-card-green-light' },
                { title: 'Social Justice', desc: 'Standing up for what is right', color: 'modern-card-green-teal' },
                { title: 'Environmental Responsibility', desc: 'Protecting our environment', color: 'modern-card-green-emerald' },
              ].map((value, index) => (
                <div key={index} className={`modern-card ${value.color} text-white`}>
                  <div className="modern-card-content">
                    <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                    <p className="text-white/90 text-sm">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats - Client Component */}
        <AnimatedImpactStats />

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Common questions about Selam CBO Kenya
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "What is Selam CBO Kenya?",
                  answer: "SELAM – Nuru ya Jamii Initiative CBO is a registered community-based organization in Kisumu, Kenya. Founded by committed local members, we address urgent social and economic challenges affecting vulnerable families in Kisumu County. Our organization is rooted in grassroots action, and our mission is to foster unity, expand opportunities, and promote sustainable, inclusive development."
                },
                {
                  question: "What areas does Selam serve in Kenya?",
                  answer: "We primarily serve Kisumu County, located on the shores of Lake Victoria. Our programs reach vulnerable communities throughout the region, focusing on youth, women, and children who face barriers to education, healthcare, and economic opportunities."
                },
                {
                  question: "How is Selam CBO funded?",
                  answer: "Selam CBO operates through a combination of grants from international donors, partnerships with NGOs, community contributions, and fundraising efforts. We are committed to transparency and accountability in all our financial operations."
                },
                {
                  question: "How can I volunteer with Selam?",
                  answer: "We welcome volunteers who are passionate about community development. You can get involved by visiting our Join Us page to fill out a volunteer application. We offer opportunities for both local and international volunteers in areas such as education, healthcare, and community empowerment."
                },
                {
                  question: "What makes Selam different from other NGOs in Kenya?",
                  answer: "As a community-based organization rooted in Kisumu, we have deep local knowledge and strong relationships with the communities we serve. Our approach focuses on sustainable, community-driven solutions rather than short-term aid. We address the root causes of poverty and inequality through education, vocational training, mentorship, and economic empowerment."
                },
                {
                  question: "How can I donate or support Selam's work?",
                  answer: "There are several ways to support our work: you can make a financial donation through our website, partner with us as a corporate or organization, or donate materials such as books, school supplies, or medical equipment. Visit our Join Us page to learn more about supporting our mission."
                },
                {
                  question: "What are the main programs offered by Selam CBO?",
                  answer: "Our key programs include Education (school support, scholarships, adult literacy), Healthcare (mobile clinics, maternal health, disease prevention), Community Development (vocational training, microfinance, youth employment), and Water & Sanitation (clean water access, hygiene education). We also focus on women's empowerment and youth mentorship."
                },
                {
                  question: "Is Selam CBO a registered nonprofit organization?",
                  answer: "Yes, Selam – Nuru ya Jamii Initiative is a registered community-based organization (CBO) in Kenya. We operate in compliance with Kenyan law and maintain proper governance structures to ensure accountability and sustainability."
                }
              ].map((faq, index) => (
                <div key={index} className="modern-card modern-card-green-light text-white">
                  <div className="modern-card-content">
                    <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                    <p className="text-white/90 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="modern-card modern-card-green-extra-light text-gray-900 p-8 md:p-12">
              <div className="modern-card-content">
                <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                  Join Us in Making a Difference
                </h2>
                <p className="text-lg text-gray-900/90 mb-8">
                  Together, we can create lasting change and empower communities across Kenya
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/join-us" className="modern-card modern-card-green-bright text-white px-8 py-4 inline-block">
                    <span className="modern-card-content text-center font-semibold">Get Involved</span>
                  </a>
                  <a href="/what-we-do" className="modern-card modern-card-green-vibrant text-white px-8 py-4 inline-block">
                    <span className="modern-card-content text-center font-semibold">Our Programs</span>
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
