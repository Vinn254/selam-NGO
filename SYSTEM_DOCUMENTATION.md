# SELAM NURU YA JAMII INITIATIVE - Website Documentation

## Overview

The SELAM NURU YA JAMII INITIATIVE website is a comprehensive web application for a Community-Based Organization (CBO) in Kisumu, Kenya. The website serves to showcase the organization's work, accept applications from volunteers and partners, manage documents, and provide updates about their activities.

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB (with local JSON file fallback)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Authentication**: Custom JWT-based auth

---

## Website Pages

### 1. Home Page (`/`)

The main landing page featuring:
- **Hero Section**: Rotating images (IM1, IM2, IM7) with community empowerment messages
- **Bento Grid**: Quick overview of programs and initiatives
- **Latest Updates**: Horizontal scrolling carousel showing recent activities
  - Uses images: IM4, IM3, IM6
  - "Learn more" button expands to show full description
  - No "View All" button anymore

### 2. About Page (`/about`)
- Organization history
- Mission and vision
- Team members

### 3. What We Do (`/what-we-do`)
- Detailed programs and initiatives
- Community impact areas

### 4. Join Us (`/join-us`)
Three application forms:
- **Volunteer Application**: Name, email, phone, area of interest
- **Partnership Request**: Organization details, partnership type
- **Story Submission**: Personal story submission

### 5. Updates (`/updates`)
- Grid display of all updates
- Only shows admin-added updates (not local fallback data)
- Newsletter signup section

### 6. Documents (`/documents`)
- Public document library
- Categories: reports, policies, guides
- Download functionality

### 7. Partners (`/partners`)
- Partner logos and information

### 8. Admin Login (`/admin`)
- Secure login for administrators
- JWT token-based authentication

### 9. Admin Dashboard (`/admin/dashboard`)
Four main sections:

#### a. Applications Tab
- View all volunteer applications, partnership requests, and story submissions
- **Status management**: Change status from "pending" to "approved" or "rejected"
- **Delete**: Remove applications
- Data persists in database (MongoDB or local JSON fallback)

#### b. Documents Tab
- Upload new documents (PDF, DOC, DOCX)
- Fields: Title, Description, Category
- **Delete**: Remove documents
- File upload stored in `/public/uploads/documents/`

#### c. Updates Tab
- Create new updates
- Fields: Title, Description, Image/Video upload
- **Delete**: Remove updates
- Appears on home page Latest Updates section

#### d. Settings Tab
- Admin profile management

---

## Data Flow & Storage

### Primary Storage: MongoDB

The system uses MongoDB as the primary database when `MONGODB_URI` environment variable is configured.

**Collections:**
- `applications` - Stores volunteer applications, partnership requests, story submissions
- `documents` - Stores document metadata
- `updates` - Stores news/activity updates

### Fallback Storage: Local JSON Files

When MongoDB is unavailable, the system falls back to JSON files:
- `data/applications.json`
- `data/documents.json`
- `data/updates.json`

**Note**: On Vercel, local files are stored in `/tmp` which may not persist between deployments. For production, MongoDB is recommended.

---

## API Endpoints

### Applications
- `GET /api/applications` - Fetch all applications
- `POST /api/applications` - Submit new application
- `GET /api/applications/[id]` - Get single application
- `PUT /api/applications/[id]` - Update application status
- `DELETE /api/applications/[id]` - Delete application

### Documents
- `GET /api/documents` - Fetch all documents
- `POST /api/documents/upload` - Upload new document
- `GET /api/documents/[id]` - Get single document
- `DELETE /api/documents/[id]` - Delete document

### Updates
- `GET /api/updates` - Fetch all updates
- `POST /api/updates` - Create new update (admin only)
- `POST /api/updates/upload` - Upload update image
- `POST /api/updates/video-upload` - Upload update video
- `DELETE /api/updates/[id]` - Delete update

### Authentication
- `POST /api/auth/login` - Admin login

---

## Environment Variables

Required for full functionality:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3000

# WhatsApp Contact
NEXT_PUBLIC_WHATSAPP_NUMBER=+254758413152

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://selam.co.ke
NEXT_PUBLIC_SITE_NAME=SELAM NGO

# MongoDB (recommended for production)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Email (SMTP) - For receiving application notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=SELAM NGO <your-email@gmail.com>
ADMIN_EMAIL=admin@selam.co.ke
```

---

## User Roles & Permissions

### Public Users
- View all public pages
- Submit volunteer applications
- Submit partnership requests
- Submit story submissions
- Download documents

### Administrators
- Login to admin dashboard
- View and manage all applications
- Upload and delete documents
- Create and delete updates
- Update application statuses

---

## Features Summary

| Feature | Description |
|---------|-------------|
| Responsive Design | Works on mobile, tablet, and desktop |
| Image Gallery | Hero section with rotating images |
| Document Library | Upload and download PDF/DOC files |
| Application Forms | Volunteer, Partnership, Story submission |
| News Updates | Admin can post updates with images/videos |
| Email Notifications | Admin receives email when new applications submitted |
| WhatsApp Integration | Floating button for quick contact |
| SEO Optimized | Meta tags and Open Graph data |

---

## Deployment on Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

**Important**: For MongoDB to work, add `MONGODB_URI` in Vercel environment variables.

---

## Troubleshooting

### Applications not saving
- Check if MongoDB is configured (`MONGODB_URI`)
- System falls back to local JSON files if MongoDB unavailable

### Document upload failing
- Check file type (must be PDF, DOC, or DOCX)
- Check file size (max 10MB)
- Ensure `/public/uploads/documents/` directory exists

### Updates not appearing
- Ensure updates are created via admin dashboard
- Check browser console for errors

---

## Support

For issues or questions, contact the development team.
