'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('applications')
  const [documents, setDocuments] = useState([])
  const [applications, setApplications] = useState([])
  const [updates, setUpdates] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [message, setMessage] = useState({ type: '', text: '' })
  const router = useRouter()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''

  // Form state for document upload
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'report',
    file: null,
  })

  // Form state for update creation
  const [updateFormData, setUpdateFormData] = useState({
    title: '',
    description: '',
    mediaType: 'image',
    mediaUrl: '',
  })
  const [updateImageFile, setUpdateImageFile] = useState(null)
  const [updateImagePreview, setUpdateImagePreview] = useState(null)
  const [imageUploading, setImageUploading] = useState(false)
  // Video upload state
  const [updateVideoFile, setUpdateVideoFile] = useState(null)
  const [updateVideoPreview, setUpdateVideoPreview] = useState(null)
  const [videoUploading, setVideoUploading] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken')
    const userData = localStorage.getItem('adminUser')
    
    if (!token || !userData) {
      router.push('/admin')
      return
    }
    
    setUser(JSON.parse(userData))
    fetchDocuments()
    fetchApplications()
    fetchUpdates()
  }, [router])

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/documents`)
      if (response.ok) {
        const data = await response.json()
        setDocuments(data.documents || [])
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error)
    }
  }

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${apiUrl}/api/applications`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setApplications(data.applications || [])
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error)
    }
  }

  const fetchUpdates = async () => {
    try {
      const response = await fetch(`/api/updates`)
      if (response.ok) {
        const data = await response.json()
        setUpdates(data.updates || [])
      } else {
        console.error('Failed to fetch updates:', response.status)
      }
    } catch (error) {
      console.error('Failed to fetch updates:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    router.push('/admin')
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'File size must be less than 10MB' })
        return
      }
      setFormData({ ...formData, file })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })
    setUploadProgress(0)

    try {
      const token = localStorage.getItem('adminToken')
      const data = new FormData()
      data.append('title', formData.title)
      data.append('description', formData.description)
      data.append('category', formData.category)
      data.append('document', formData.file)

      const xhr = new XMLHttpRequest()

      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100
          setUploadProgress(Math.round(percentComplete))
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status === 201) {
          setMessage({ type: 'success', text: 'Document uploaded successfully!' })
          setFormData({ title: '', description: '', category: 'report', file: null })
          setUploadProgress(0)
          fetchDocuments()
          // Reset file input
          document.getElementById('file-input').value = ''
        } else {
          const response = JSON.parse(xhr.responseText)
          setMessage({ type: 'error', text: response.message || 'Upload failed' })
        }
        setLoading(false)
      })

      xhr.addEventListener('error', () => {
        setMessage({ type: 'error', text: 'Network error occurred' })
        setLoading(false)
      })

      xhr.open('POST', `${apiUrl}/api/documents/upload`)
      xhr.setRequestHeader('Authorization', `Bearer ${token}`)
      xhr.send(data)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload document' })
      setLoading(false)
    }
  }

  const handleDelete = async (documentId) => {
    if (!confirm('Are you sure you want to delete this document?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${apiUrl}/api/documents/${documentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Document deleted successfully!' })
        fetchDocuments()
      } else {
        const data = await response.json()
        setMessage({ type: 'error', text: data.message || 'Delete failed' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete document' })
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
      month: 'short',
      day: 'numeric',
    })
  }

  // Update handling functions
  const handleUpdateChange = (e) => {
    const { name, value } = e.target
    setUpdateFormData({ ...updateFormData, [name]: value })
  }

  const handleUpdateImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image must be less than 5MB' })
        return
      }
      setUpdateImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setUpdateImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdateVideoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Video must be less than 50MB' })
        return
      }
      setUpdateVideoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setUpdateVideoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreateUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const token = localStorage.getItem('adminToken')
      let mediaUrl = updateFormData.mediaUrl

      // If there's an image file, upload it first
      if (updateImageFile && updateFormData.mediaType === 'image') {
        setImageUploading(true)
        const imageFormData = new FormData()
        imageFormData.append('image', updateImageFile)

        const uploadResponse = await fetch(`${apiUrl}/api/updates/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: imageFormData,
        })

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json()
          mediaUrl = uploadData.imageUrl
        } else {
          const uploadError = await uploadResponse.json()
          setMessage({ type: 'error', text: uploadError.message || 'Image upload failed' })
          setLoading(false)
          setImageUploading(false)
          return
        }
        setImageUploading(false)
      }

      // If there's a video file, upload it
      if (updateVideoFile && updateFormData.mediaType === 'video') {
        setVideoUploading(true)
        const videoFormData = new FormData()
        videoFormData.append('video', updateVideoFile)

        const uploadResponse = await fetch(`${apiUrl}/api/updates/video-upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: videoFormData,
        })

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json()
          mediaUrl = uploadData.videoUrl
        } else {
          const uploadError = await uploadResponse.json()
          setMessage({ type: 'error', text: uploadError.message || 'Video upload failed' })
          setLoading(false)
          setVideoUploading(false)
          return
        }
        setVideoUploading(false)
      }

      const response = await fetch(`${apiUrl}/api/updates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...updateFormData, mediaUrl }),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Update created successfully!' })
        setUpdateFormData({ title: '', description: '', mediaType: 'image', mediaUrl: '' })
        setUpdateImageFile(null)
        setUpdateImagePreview(null)
        setUpdateVideoFile(null)
        setUpdateVideoPreview(null)
        // Reset file inputs
        const imageInput = document.getElementById('update-image-input')
        if (imageInput) imageInput.value = ''
        const videoInput = document.getElementById('update-video-input')
        if (videoInput) videoInput.value = ''
        fetchUpdates()
      } else {
        const data = await response.json()
        setMessage({ type: 'error', text: data.message || 'Failed to create update' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create update' })
    } finally {
      setLoading(false)
      setImageUploading(false)
      setVideoUploading(false)
    }
  }

  const deleteUpdate = async (updateId) => {
    if (!confirm('Are you sure you want to delete this update?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/updates/${updateId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Update deleted successfully!' })
        fetchUpdates()
      } else {
        const data = await response.json()
        setMessage({ type: 'error', text: data.message || 'Delete failed' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete update' })
    }
  }

  const editUpdate = async (update) => {
    const newTitle = prompt('Edit Title:', update.title)
    if (newTitle === null) return
    
    const newDescription = prompt('Edit Description:', update.description)
    if (newDescription === null) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/updates/${update._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
        }),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Update edited successfully!' })
        fetchUpdates()
      } else {
        const data = await response.json()
        setMessage({ type: 'error', text: data.message || 'Edit failed' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to edit update' })
    }
  }

  // Application handling functions
  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${apiUrl}/api/applications/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: `Application marked as ${newStatus}!` })
        fetchApplications()
      } else {
        const data = await response.json()
        setMessage({ type: 'error', text: data.message || 'Update failed' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update application' })
    }
  }

  const deleteApplication = async (applicationId) => {
    if (!confirm('Are you sure you want to delete this application?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${apiUrl}/api/applications/${applicationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Application deleted successfully!' })
        fetchApplications()
      } else {
        const data = await response.json()
        setMessage({ type: 'error', text: data.message || 'Delete failed' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete application' })
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'volunteer': return 'bg-emerald-100 text-emerald-800'
      case 'partner': return 'bg-teal-100 text-teal-800'
      case 'story': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'reviewed': return 'bg-blue-100 text-blue-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 relative rounded-xl overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                  <svg 
                    width={36} 
                    height={36} 
                    viewBox="0 0 36 36" 
                    fill="none" 
                    className="relative z-10 p-1"
                  >
                    <path 
                      d="M18 6C12.48 6 10 10 10 14C10 18 14 20 18 22C22 24 26 24 26 28C26 32 22 34 18 34" 
                      stroke="white" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path 
                      d="M22 10C24 8 28 8 28 12C28 16 24 18 20 16" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      fill="none"
                      opacity="0.8"
                    />
                    <circle cx="12" cy="28" r="2" fill="white" opacity="0.6" />
                  </svg>
                </div>
                <span className="font-display font-bold text-xl text-gray-900">Selam</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Selam Admin</h1>
              <p className="text-sm text-gray-500">Welcome, {user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                View Website
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'applications'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Applications
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'documents'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveTab('updates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'updates'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Updates
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'upload'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upload New
            </button>
          </nav>
        </div>

        {/* Messages */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
              <p className="text-sm text-gray-600 mt-1">{applications.length} total applications</p>
            </div>
            
            {applications.length === 0 ? (
              <div className="p-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
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
                <h3 className="mt-2 text-sm font-medium text-gray-900">No applications yet</h3>
                <p className="mt-1 text-sm text-gray-500">Applications will appear here when submitted.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map((app) => (
                      <tr key={app._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                              <span className="text-primary-600 font-bold">
                                {app.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{app.name}</div>
                              <div className="text-sm text-gray-500">{app.email}</div>
                              {app.phone && (
                                <div className="text-sm text-gray-500">{app.phone}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(app.type)}`}>
                            {app.type.charAt(0).toUpperCase() + app.type.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {app.type === 'volunteer' && (
                              <>
                                <div><strong>Interest:</strong> {app.interest || 'Not specified'}</div>
                                {app.skills && <div><strong>Skills:</strong> {app.skills}</div>}
                              </>
                            )}
                            {app.type === 'partner' && (
                              <>
                                <div><strong>Organization:</strong> {app.organization || 'Not specified'}</div>
                                {app.partnershipType && <div><strong>Type:</strong> {app.partnershipType}</div>}
                              </>
                            )}
                            {app.type === 'story' && (
                              <>
                                <div><strong>Story Type:</strong> {app.storyType || 'Not specified'}</div>
                              </>
                            )}
                          </div>
                          {app.message && (
                            <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {app.message}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={app.status}
                            onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
                            className={`text-sm rounded-full px-3 py-1 font-semibold border-0 cursor-pointer ${getStatusColor(app.status)}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(app.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => deleteApplication(app._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Updates Tab */}
        {activeTab === 'updates' && (
          <div className="space-y-6">
            {/* Create Update Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Update</h2>
              <form onSubmit={handleCreateUpdate} className="space-y-6">
                <div>
                  <label htmlFor="updateTitle" className="block text-sm font-semibold text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    id="updateTitle"
                    name="title"
                    type="text"
                    value={updateFormData.title}
                    onChange={handleUpdateChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., New Volunteer Program Launch"
                  />
                </div>

                <div>
                  <label htmlFor="updateDescription" className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="updateDescription"
                    name="description"
                    value={updateFormData.description}
                    onChange={handleUpdateChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Describe what's happening..."
                  />
                </div>

                <div>
                  <label htmlFor="mediaType" className="block text-sm font-semibold text-gray-700 mb-2">
                    Media Type
                  </label>
                  <select
                    id="mediaType"
                    name="mediaType"
                    value={updateFormData.mediaType}
                    onChange={(e) => {
                      handleUpdateChange(e)
                      // Clear image file when switching to video
                      if (e.target.value === 'video') {
                        setUpdateImageFile(null)
                        setUpdateImagePreview(null)
                        const fileInput = document.getElementById('update-image-input')
                        if (fileInput) fileInput.value = ''
                      } else {
                        // Clear video file when switching to image
                        setUpdateVideoFile(null)
                        setUpdateVideoPreview(null)
                        const videoInput = document.getElementById('update-video-input')
                        if (videoInput) videoInput.value = ''
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                {/* Image Upload - shown when media type is image */}
                {updateFormData.mediaType === 'image' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload Image (optional)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-400 transition-colors">
                      <div className="space-y-2 text-center">
                        {updateImagePreview ? (
                          <div className="relative">
                            <img
                              src={updateImagePreview}
                              alt="Preview"
                              className="mx-auto h-40 w-auto rounded-lg object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setUpdateImageFile(null)
                                setUpdateImagePreview(null)
                                const fileInput = document.getElementById('update-image-input')
                                if (fileInput) fileInput.value = ''
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <>
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="text-sm text-gray-600">
                              <label htmlFor="update-image-input" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                                <span>Upload an image</span>
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP up to 5MB</p>
                          </>
                        )}
                        <input
                          id="update-image-input"
                          type="file"
                          accept="image/jpeg,image/png,image/gif,image/webp"
                          onChange={handleUpdateImageChange}
                          className={updateImagePreview ? 'hidden' : 'block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 mt-2'}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Video Upload - shown when media type is video */}
                {updateFormData.mediaType === 'video' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload Video (optional)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-400 transition-colors">
                      <div className="space-y-2 text-center">
                        {updateVideoPreview ? (
                          <div className="relative">
                            <video
                              src={updateVideoPreview}
                              className="mx-auto h-40 w-auto rounded-lg object-cover"
                              controls
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setUpdateVideoFile(null)
                                setUpdateVideoPreview(null)
                                const fileInput = document.getElementById('update-video-input')
                                if (fileInput) fileInput.value = ''
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <>
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                              <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 30v-20l16 10-16 10z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="text-sm text-gray-600">
                              <label htmlFor="update-video-input" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                                <span>Upload a video</span>
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">MP4, MOV, WebM, AVI, MKV up to 50MB</p>
                          </>
                        )}
                        <input
                          id="update-video-input"
                          type="file"
                          accept="video/mp4,video/quicktime,video/webm,video/x-msvideo,video/x-matroska,.mp4,.mov,.webm,.avi,.mkv"
                          onChange={handleUpdateVideoChange}
                          className={updateVideoPreview ? 'hidden' : 'block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 mt-2'}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="mediaUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                    {updateFormData.mediaType === 'video' ? 'Video URL' : 'Image URL'} (optional)
                  </label>
                  <input
                    id="mediaUrl"
                    name="mediaUrl"
                    type="url"
                    value={updateFormData.mediaUrl}
                    onChange={handleUpdateChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={updateFormData.mediaType === 'video' ? 'https://youtube.com/...' : 'https://example.com/image.jpg'}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {updateFormData.mediaType === 'image' 
                      ? 'You can upload an image above OR paste a URL here. Upload takes priority.' 
                      : 'You can upload a video above OR paste a video URL here. Upload takes priority.'}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || imageUploading || videoUploading}
                  className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400"
                >
                  {imageUploading ? 'Uploading image...' : videoUploading ? 'Uploading video...' : loading ? 'Creating...' : 'Create Update'}
                </button>
              </form>
            </div>

            {/* Existing Updates List */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Existing Updates</h2>
                <p className="text-sm text-gray-600 mt-1">{updates.length} total updates</p>
              </div>
              
              {updates.length === 0 ? (
                <div className="p-12 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No updates yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Create your first update above.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Media Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {updates.map((update) => (
                        <tr key={update._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{update.title}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 max-w-xs truncate">{update.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              update.mediaType === 'video' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {update.mediaType}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{formatDate(update.createdAt)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => editUpdate(update)}
                              className="text-blue-600 hover:text-blue-900 transition-colors mr-4"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteUpdate(update._id)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Document</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Document Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Annual Report 2024"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Brief description of the document..."
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="report">Annual Report</option>
                  <option value="financial">Financial Statement</option>
                  <option value="policy">Policy Document</option>
                  <option value="newsletter">Newsletter</option>
                  <option value="brochure">Brochure</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="file-input" className="block text-sm font-semibold text-gray-700 mb-2">
                  Document File * (PDF, DOC, DOCX - Max 10MB)
                </label>
                <input
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                />
                {formData.file && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {formData.file.name} ({formatFileSize(formData.file.size)})
                  </p>
                )}
              </div>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Uploading...' : 'Upload Document'}
              </button>
            </form>
          </div>
        )}

        {/* Documents List Tab */}
        {activeTab === 'documents' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">All Documents</h2>
              <p className="text-sm text-gray-600 mt-1">{documents.length} documents uploaded</p>
            </div>
            
            {documents.length === 0 ? (
              <div className="p-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
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
                <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by uploading a document.</p>
                <div className="mt-6">
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="btn-primary"
                  >
                    Upload Document
                  </button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Document
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Uploaded
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {documents.map((doc) => (
                      <tr key={doc._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
                              <svg
                                className="h-6 w-6 text-primary-600"
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
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                              {doc.description && (
                                <div className="text-sm text-gray-500 line-clamp-1">{doc.description}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {doc.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatFileSize(doc.fileSize)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(doc.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-900 mr-4"
                          >
                            View
                          </a>
                          <button
                            onClick={() => handleDelete(doc._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
