import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import Image from 'next/image'

async function getUpdates() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/updates`, {
      next: { revalidate: 60 },
    })
    
    if (!res.ok) return []
    const data = await res.json()
    return data.updates || []
  } catch (error) {
    console.warn('Failed to fetch updates:', error.message)
    return []
  }
}

export const metadata = {
  title: 'Latest Updates',
  description: 'Stay informed about Selam NGO\'s recent activities, projects, and impact stories from communities across Kenya.',
  openGraph: {
    title: 'Latest Updates - Selam NGO',
    description: 'Recent news and stories from our work in Kenyan communities.',
    images: ['/og-updates.jpg'],
  },
}

export default async function UpdatesPage() {
  const updates = await getUpdates()

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
                Latest Updates
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Stay connected with our recent activities, success stories, and community impact
              </p>
            </div>
          </div>
        </section>

        {/* Updates Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {updates.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-6">📰</div>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  No Updates Yet
                </h2>
                <p className="text-gray-600">
                  Check back soon for the latest news and stories from our work
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {updates.map((update) => (
                  <article
                    key={update._id || update.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                  >
                    {/* Image */}
                    {update.image && (
                      <div className="relative h-56 w-full bg-gray-200">
                        <Image
                          src={update.image}
                          alt={update.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      {/* Date */}
                      <time className="text-sm text-primary-600 font-semibold">
                        {formatDate(update.createdAt || update.date)}
                      </time>

                      {/* Title */}
                      <h3 className="text-xl font-display font-bold text-gray-900 mt-2 mb-3">
                        {update.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {update.description}
                      </p>

                      {/* Read More Link */}
                      <a
                        href={`/updates/${update._id || update.id}`}
                        className="inline-flex items-center space-x-1 text-primary-600 font-semibold hover:text-primary-700 transition-colors duration-200 group"
                      >
                        <span>Read more</span>
                        <svg 
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" 
                          fill="none" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6">
              Stay Updated
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Subscribe to our newsletter to receive the latest updates directly in your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
