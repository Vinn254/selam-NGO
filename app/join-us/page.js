'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const waysToHelp = [
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Volunteer',
    description: 'Share your time, skills, and passion to make a direct impact in communities',
    action: 'Apply to Volunteer',
    link: '#volunteer',
    color: 'emerald',
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Become a Partner',
    description: 'Collaborate with us for meaningful corporate social responsibility initiatives',
    action: 'Become a Partner',
    link: '#partner',
    color: 'teal',
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: 'Share Our Story',
    description: 'Help us reach more people by sharing our mission on social media and beyond',
    action: 'Share Your Story',
    link: '#story',
    color: 'blue',
  },
]

export default function JoinUsPage() {
  const [activeForm, setActiveForm] = useState('volunteer')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  
  // Form states for each type
  const [volunteerData, setVolunteerData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'field',
    skills: '',
    availability: '',
    message: '',
  })
  
  const [partnerData, setPartnerData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    partnershipType: 'corporate',
    message: '',
  })
  
  const [storyData, setStoryData] = useState({
    name: '',
    email: '',
    storyType: 'testimonial',
    story: '',
    consent: false,
  })

  const handleVolunteerChange = (e) => {
    setVolunteerData({ ...volunteerData, [e.target.name]: e.target.value })
  }

  const handlePartnerChange = (e) => {
    setPartnerData({ ...partnerData, [e.target.name]: e.target.value })
  }

  const handleStoryChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setStoryData({ ...storyData, [e.target.name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      let payload
      let type

      switch (activeForm) {
        case 'volunteer':
          payload = {
            ...volunteerData,
            type: 'volunteer',
          }
          type = 'volunteer'
          break
        case 'partner':
          payload = {
            ...partnerData,
            type: 'partner',
          }
          type = 'partner'
          break
        case 'story':
          payload = {
            name: storyData.name,
            email: storyData.email,
            type: 'story',
            storyType: storyData.storyType,
            message: storyData.story,
            consent: storyData.consent,
          }
          type = 'story'
          break
      }

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form
        if (activeForm === 'volunteer') {
          setVolunteerData({
            name: '',
            email: '',
            phone: '',
            interest: 'field',
            skills: '',
            availability: '',
            message: '',
          })
        } else if (activeForm === 'partner') {
          setPartnerData({
            name: '',
            email: '',
            phone: '',
            organization: '',
            partnershipType: 'corporate',
            message: '',
          })
        } else {
          setStoryData({
            name: '',
            email: '',
            storyType: 'testimonial',
            story: '',
            consent: false,
          })
        }
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFormTitle = () => {
    switch (activeForm) {
      case 'volunteer': return 'Volunteer Application'
      case 'partner': return 'Partner Application'
      case 'story': return 'Share Your Story'
      default: return 'Application'
    }
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
                Join Our Mission
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Be part of the change. Together, we can transform lives and build stronger communities across Kenya
              </p>
            </div>
          </div>
        </section>

        {/* Ways to Help */}
        <section className="py-20 green-pattern-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
                Ways to Get Involved
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose how you'd like to support our mission
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {waysToHelp.map((way, index) => (
                <div
                  key={index}
                  className="green-card p-8 rounded-2xl text-center"
                >
                  <div className={`text-5xl mb-4 text-${way.color}-600`}>{way.icon}</div>
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
                    {way.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{way.description}</p>
                  <a
                    href={way.link}
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveForm(way.link.replace('#', ''))
                      setSubmitStatus(null)
                    }}
                    className="inline-block px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                  >
                    {way.action}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Forms */}
        <section id="volunteer" className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Form Type Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => { setActiveForm('volunteer'); setSubmitStatus(null) }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeForm === 'volunteer'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Volunteer
                </span>
              </button>
              <button
                onClick={() => { setActiveForm('partner'); setSubmitStatus(null) }}
                id="partner"
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeForm === 'partner'
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Become a Partner
                </span>
              </button>
              <button
                onClick={() => { setActiveForm('story'); setSubmitStatus(null) }}
                id="story"
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeForm === 'story'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Share Your Story
                </span>
              </button>
            </div>

            {/* Volunteer Form */}
            {activeForm === 'volunteer' && (
              <div className="green-card p-8 rounded-2xl relative z-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                    Volunteer With Us
                  </h2>
                  <p className="text-gray-600">
                    We welcome volunteers who are passionate about making a difference. Fill out the form below to get started.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="vol-name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="vol-name"
                        name="name"
                        value={volunteerData.name}
                        onChange={handleVolunteerChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="vol-email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="vol-email"
                        name="email"
                        value={volunteerData.email}
                        onChange={handleVolunteerChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="vol-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="vol-phone"
                        name="phone"
                        value={volunteerData.phone}
                        onChange={handleVolunteerChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="+251 911 123 456"
                      />
                    </div>
                    <div>
                      <label htmlFor="vol-interest" className="block text-sm font-semibold text-gray-700 mb-2">
                        I'm Interested In *
                      </label>
                      <select
                        id="vol-interest"
                        name="interest"
                        value={volunteerData.interest}
                        onChange={handleVolunteerChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="field">Field Work</option>
                        <option value="professional">Professional Services</option>
                        <option value="remote">Remote/Online Support</option>
                        <option value="events">Event Support</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="vol-skills" className="block text-sm font-semibold text-gray-700 mb-2">
                        Skills & Expertise
                      </label>
                      <input
                        type="text"
                        id="vol-skills"
                        name="skills"
                        value={volunteerData.skills}
                        onChange={handleVolunteerChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="e.g., Teaching, Healthcare, IT"
                      />
                    </div>
                    <div>
                      <label htmlFor="vol-availability" className="block text-sm font-semibold text-gray-700 mb-2">
                        Availability
                      </label>
                      <select
                        id="vol-availability"
                        name="availability"
                        value={volunteerData.availability}
                        onChange={handleVolunteerChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="">Select availability</option>
                        <option value="weekdays">Weekdays</option>
                        <option value="weekends">Weekends</option>
                        <option value="flexible">Flexible</option>
                        <option value="one-time">One-time Event</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="vol-message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Why do you want to volunteer?
                    </label>
                    <textarea
                      id="vol-message"
                      name="message"
                      value={volunteerData.message}
                      onChange={handleVolunteerChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Tell us about yourself and why you're interested..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Volunteer Application'}
                  </button>
                </form>
              </div>
            )}

            {/* Partner Form */}
            {activeForm === 'partner' && (
              <div className="green-card p-8 rounded-2xl relative z-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                    Become a Partner
                  </h2>
                  <p className="text-gray-600">
                    Let's work together to create lasting impact. Fill out the form below and we'll be in touch.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="part-name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        id="part-name"
                        name="name"
                        value={partnerData.name}
                        onChange={handlePartnerChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="part-email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        id="part-email"
                        name="email"
                        value={partnerData.email}
                        onChange={handlePartnerChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="part-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="part-phone"
                        name="phone"
                        value={partnerData.phone}
                        onChange={handlePartnerChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="+251 911 123 456"
                      />
                    </div>
                    <div>
                      <label htmlFor="part-org" className="block text-sm font-semibold text-gray-700 mb-2">
                        Organization Name *
                      </label>
                      <input
                        type="text"
                        id="part-org"
                        name="organization"
                        value={partnerData.organization}
                        onChange={handlePartnerChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Your Company Name"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="part-type" className="block text-sm font-semibold text-gray-700 mb-2">
                      Partnership Type *
                    </label>
                    <select
                      id="part-type"
                      name="partnershipType"
                      value={partnerData.partnershipType}
                      onChange={handlePartnerChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="corporate">Corporate Partnership</option>
                      <option value="foundation">Foundation/Grant</option>
                      <option value="institutional">Institutional Partnership</option>
                      <option value="media">Media Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="part-message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Tell us about your partnership goals
                    </label>
                    <textarea
                      id="part-message"
                      name="message"
                      value={partnerData.message}
                      onChange={handlePartnerChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Describe your organization and how you'd like to collaborate..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Partnership Inquiry'}
                  </button>
                </form>
              </div>
            )}

            {/* Story Form */}
            {activeForm === 'story' && (
              <div className="green-card p-8 rounded-2xl relative z-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                    Share Your Story
                  </h2>
                  <p className="text-gray-600">
                    Have you been impacted by our work or witnessed our impact? We'd love to hear from you.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="story-name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="story-name"
                        name="name"
                        value={storyData.name}
                        onChange={handleStoryChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="story-email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="story-email"
                        name="email"
                        value={storyData.email}
                        onChange={handleStoryChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="story-type" className="block text-sm font-semibold text-gray-700 mb-2">
                      Story Type *
                    </label>
                    <select
                      id="story-type"
                      name="storyType"
                      value={storyData.storyType}
                      onChange={handleStoryChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="testimonial">Personal Testimonial</option>
                      <option value="impact">Impact Story</option>
                      <option value="volunteer">Volunteer Experience</option>
                      <option value="partner">Partner Collaboration</option>
                      <option value="community">Community Story</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="story-content" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Story *
                    </label>
                    <textarea
                      id="story-content"
                      name="story"
                      value={storyData.story}
                      onChange={handleStoryChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Share your experience with Selam NGO..."
                    />
                  </div>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="story-consent"
                      name="consent"
                      checked={storyData.consent}
                      onChange={handleStoryChange}
                      required
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                    />
                    <label htmlFor="story-consent" className="ml-3 text-sm text-gray-600">
                      I consent to my story being shared on Selam's website and social media channels. I understand that my name may be used alongside my story unless I request otherwise.
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Your Story'}
                  </button>
                </form>
              </div>
            )}

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-green-800">Thank you for your application!</p>
                    <p className="text-green-700 text-sm">We'll review your submission and get back to you soon.</p>
                  </div>
                </div>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div>
                    <p className="font-semibold text-red-800">Something went wrong</p>
                    <p className="text-red-700 text-sm">Please try again or contact us directly.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Your Impact
              </h2>
              <p className="text-lg text-white/90">
                See what your support can achieve
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
      </main>
      <Footer />
    </>
  )
}
