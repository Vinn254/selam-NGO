# Selam NGO Website - Complete Setup Guide

## 🎯 Quick Start (5 Minutes)

### Step 1: Install Dependencies

```bash
# Navigate to the Selam website folder
cd selam-website

# Install all dependencies
npm install
```

### Step 2: Create Environment File

Create `.env.local` in the `selam-website` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WHATSAPP_NUMBER=+251912345678
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hello Selam! I would like to know more about your organization.
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Selam NGO
REVALIDATE_TIME=60
```

### Step 3: Add Hero Images

Create the folder `selam-website/public/images/` and add 3 images:
- `hero-1.jpg` (recommended size: 1920x1080)
- `hero-2.jpg` (recommended size: 1920x1080)
- `hero-3.jpg` (recommended size: 1920x1080)

**Tip**: Use optimized JPG images (quality 80-85) to keep file sizes under 200KB each.

### Step 4: Start the Backend

```bash
# Open a new terminal
cd event-management-system/backend

# Start the backend server (already configured)
npm start
```

Backend will run on: http://localhost:5000

### Step 5: Start the Frontend

```bash
# In another terminal
cd selam-website

# Start the development server
npm run dev
```

Frontend will run on: http://localhost:3000

## ✅ Verify Installation

Visit http://localhost:3000 and you should see:
- ✅ Hero section with image carousel
- ✅ Hamburger menu (top right)
- ✅ Bento Grid with mission/vision
- ✅ Latest Updates section (may be empty initially)
- ✅ Footer with links
- ✅ WhatsApp button (appears after scrolling)

## 👤 Create Admin User

### Option 1: Using cURL

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@selam.org",
    "password": "admin123",
    "phone": "+251912345678",
    "role": "organizer"
  }'
```

### Option 2: Using Postman/Insomnia

**POST** `http://localhost:5000/api/auth/register`

**Body (JSON):**
```json
{
  "name": "Admin User",
  "email": "admin@selam.org",
  "password": "admin123",
  "phone": "+251912345678",
  "role": "organizer"
}
```

## 🔐 Login to Admin Panel

1. Visit: http://localhost:3000/admin
2. Enter credentials:
   - Email: `admin@selam.org`
   - Password: `admin123`
3. You'll be redirected to the dashboard (to be implemented)

## 📝 Create Your First Update

### Using cURL:

```bash
# First, login to get your token
TOKEN=$(curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@selam.org","password":"admin123"}' \
  | jq -r '.token')

# Create an update with image
curl -X POST http://localhost:5000/api/updates \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=New Education Initiative Launched" \
  -F "description=We are excited to announce the launch of our new education program that will benefit over 500 children in rural communities. This initiative includes building new classrooms, providing learning materials, and training teachers." \
  -F "category=education" \
  -F "featured=true" \
  -F "image=@/path/to/your/image.jpg"
```

### Using Postman:

1. **Login First:**
   - **POST** `http://localhost:5000/api/auth/login`
   - Body: `{"email":"admin@selam.org","password":"admin123"}`
   - Copy the `token` from response

2. **Create Update:**
   - **POST** `http://localhost:5000/api/updates`
   - Headers: `Authorization: Bearer YOUR_TOKEN_HERE`
   - Body (form-data):
     - `title`: "New Education Initiative Launched"
     - `description`: "We are excited to announce..."
     - `category`: "education"
     - `featured`: "true"
     - `image`: (select file)

## 🎨 Customization Guide

### 1. Change Colors

Edit `selam-website/tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#0ea5e9',  // Change this to your brand color
    600: '#0284c7',
    700: '#0369a1',
  },
}
```

### 2. Update Hero Text

Edit `selam-website/components/HeroSection.js`:

```javascript
<h1>
  Your Custom Headline,
  <br />
  <span className="text-accent-300">Your Tagline</span>
</h1>

<p>
  Your custom description text here...
</p>
```

### 3. Modify Bento Grid Content

Edit `selam-website/components/BentoGrid.js`:

```javascript
const bentoItems = [
  {
    title: 'Your Vision',
    description: 'Your vision statement...',
    icon: '🎯',
    // ... rest of config
  },
  // Add more items...
]
```

### 4. Update Footer Links

Edit `selam-website/components/Footer.js`:

```javascript
const footerLinks = {
  about: [
    { name: 'Your Link', href: '/your-page' },
    // Add more links...
  ],
}
```

### 5. Change WhatsApp Number

Update `.env.local`:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=+251912345678
NEXT_PUBLIC_WHATSAPP_MESSAGE=Your custom message here
```

## 🚀 Production Deployment

### Build for Production

```bash
cd selam-website
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd selam-website
   vercel --prod
   ```

3. **Set Environment Variables in Vercel Dashboard:**
   - `NEXT_PUBLIC_API_URL`: Your production backend URL
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: Your WhatsApp number
   - `NEXT_PUBLIC_SITE_URL`: Your production domain

### Deploy Backend

**Option 1: Render.com**
1. Push backend code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables
5. Deploy

**Option 2: Railway.app**
1. Push backend code to GitHub
2. Create new project on Railway
3. Connect GitHub repository
4. Set environment variables
5. Deploy

## 📊 Performance Checklist

Before going live, ensure:

- [ ] All hero images are optimized (< 200KB each)
- [ ] `.env.local` has production API URL
- [ ] Backend is deployed and accessible
- [ ] Admin user is created
- [ ] At least 3-5 updates are published
- [ ] WhatsApp number is correct
- [ ] All links in footer work
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit (target: 90+ scores)

## 🐛 Common Issues & Solutions

### Issue: Updates not showing

**Solution:**
1. Check backend is running: `curl http://localhost:5000/api/updates`
2. Verify `NEXT_PUBLIC_API_URL` in `.env.local`
3. Check browser console for errors
4. Ensure at least one update is published

### Issue: Images not loading

**Solution:**
1. Verify images exist in `public/images/`
2. Check image filenames match in `HeroSection.js`
3. Ensure images are JPG format
4. Check file permissions

### Issue: Admin login fails

**Solution:**
1. Verify admin user was created successfully
2. Check backend logs for errors
3. Ensure JWT_SECRET matches in backend
4. Try creating a new admin user

### Issue: WhatsApp button not appearing

**Solution:**
1. Scroll down the page (it appears after 300px)
2. Check `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local`
3. Verify WhatsAppButton component is imported in `page.js`

### Issue: Build fails

**Solution:**
1. Delete `.next` folder: `rm -rf .next`
2. Delete `node_modules`: `rm -rf node_modules`
3. Reinstall: `npm install`
4. Try build again: `npm run build`

## 📱 Testing Checklist

### Desktop Testing
- [ ] Hero carousel transitions smoothly
- [ ] Hamburger menu opens/closes
- [ ] Bento Grid displays correctly
- [ ] Updates slider works
- [ ] WhatsApp button appears on scroll
- [ ] Footer links work
- [ ] Admin login works

### Mobile Testing
- [ ] Responsive layout works
- [ ] Touch navigation works
- [ ] Images load properly
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] WhatsApp opens correctly

### Performance Testing
- [ ] Run Lighthouse audit
- [ ] Check page load time (< 3 seconds)
- [ ] Test on slow 3G network
- [ ] Verify images lazy load
- [ ] Check Core Web Vitals

## 🔒 Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET in production
- [ ] Enable HTTPS in production
- [ ] Set secure CORS origins
- [ ] Keep dependencies updated
- [ ] Don't commit `.env` files
- [ ] Use environment variables for secrets

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Vercel Deployment Guide](https://vercel.com/docs)

## 🆘 Need Help?

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review the main README.md
3. Check browser console for errors
4. Review backend logs
5. Verify all environment variables

## 🎉 You're Ready!

Your Selam NGO website is now set up and ready to empower communities online!

**Next Steps:**
1. Add your real hero images
2. Customize colors and content
3. Create several updates
4. Test thoroughly
5. Deploy to production
6. Share with the world!

---

**Built with ❤️ for Selam NGO**
