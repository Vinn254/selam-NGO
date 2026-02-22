import { notFound } from 'next/navigation'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import localUpdates from '@/data/updates.json'

export async function generateStaticParams() {
  const updates = localUpdates?.updates || localUpdates || []
  return updates.map((update) => ({
    id: update._id,
  }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const updates = localUpdates?.updates || localUpdates || []
  const update = updates.find(u => u._id === id)
  
  if (!update) {
    return {
      title: 'Update Not Found - SELAM NURU YA JAMII INITIATIVE',
    }
  }
  
  return {
    title: `${update.title} - SELAM NURU YA JAMII INITIATIVE`,
    description: update.description,
  }
}

export default async function UpdatePage({ params }) {
  const { id } = await params
  const updates = localUpdates?.updates || localUpdates || []
  const update = updates.find(u => u._id === id)
  
  if (!update) {
    notFound()
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }
  
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Image */}
        <div className="relative h-64 md:h-96 bg-emerald-900">
          {update.mediaUrl ? (
            <Image
              src={update.mediaUrl}
              alt={update.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-700" />
          )}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                {update.title}
              </h1>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8 md:p-12">
              {/* Date */}
              <time className="text-emerald-600 font-semibold">
                {formatDate(update.createdAt)}
              </time>
              
              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mt-4 mb-6">
                {update.title}
              </h2>
              
              {/* Description */}
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="whitespace-pre-wrap">{update.description}</p>
              </div>
              
              {/* Back Link */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <a
                  href="/updates"
                  className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                >
                  <svg 
                    className="w-4 h-4 mr-2" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Back to All Updates
                </a>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
