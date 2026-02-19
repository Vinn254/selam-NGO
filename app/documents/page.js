'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { value: 'all', label: 'All Documents' },
    { value: 'report', label: 'Annual Reports' },
    { value: 'financial', label: 'Financial Statements' },
    { value: 'policy', label: 'Policy Documents' },
    { value: 'newsletter', label: 'Newsletters' },
    { value: 'brochure', label: 'Brochures' },
    { value: 'other', label: 'Other' },
  ]

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/documents')
      if (response.ok) {
        const data = await response.json()
        setDocuments(data.documents || [])
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) {
      return (
        <svg className="h-8 w-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      )
    }
    return (
      <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
      </svg>
    )
  }

  const getCategoryColor = (category) => {
    const colors = {
      report: 'bg-blue-100 text-blue-800',
      financial: 'bg-green-100 text-green-800',
      policy: 'bg-purple-100 text-purple-800',
      newsletter: 'bg-yellow-100 text-yellow-800',
      brochure: 'bg-pink-100 text-pink-800',
      other: 'bg-gray-100 text-gray-800',
    }
    return colors[category] || colors.other
  }

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Navigation />
      <main className="min-h-screen page-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                Documents & Resources
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Access our annual reports, financial statements, policy documents, and other important resources
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="w-full md:w-96">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Documents Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : filteredDocuments.length === 0 ? (
              <div className="text-center py-20">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No documents found</h3>
                <p className="mt-2 text-gray-500">
                  {searchQuery || selectedCategory !== 'all'
                    ? 'Try adjusting your filters or search query'
                    : 'Documents will appear here once they are uploaded'}
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6 text-sm text-gray-600">
                  Showing {filteredDocuments.length} {filteredDocuments.length === 1 ? 'document' : 'documents'}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-container">
                  {filteredDocuments.map((doc, index) => (
                    <div
                      key={doc._id}
                      className={`modern-card ${index % 2 === 0 ? 'modern-card-green' : 'modern-card-blue'} text-white p-6`}
                    >
                      {/* Document Header */}
                      <div className="modern-card-content">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-shrink-0">
                            {getFileIcon(doc.fileType)}
                          </div>
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white/20 backdrop-blur-sm">
                            {doc.category}
                          </span>
                        </div>

                        {/* Document Info */}
                        <h3 className="text-lg font-bold mb-2 line-clamp-2">
                          {doc.title}
                        </h3>
                        {doc.description && (
                          <p className="text-sm text-white/90 mb-4 line-clamp-3">
                            {doc.description}
                          </p>
                        )}

                        {/* Metadata */}
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <span>{formatFileSize(doc.fileSize)}</span>
                          <span>{formatDate(doc.createdAt)}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 btn-primary text-center text-sm py-2"
                          >
                            View
                          </a>
                          <a
                            href={doc.fileUrl}
                            download
                            className="flex-1 btn-secondary text-center text-sm py-2"
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
