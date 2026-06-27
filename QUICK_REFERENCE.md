# Selam Website - Quick Reference Guide

## 🚀 Common Commands

### Development
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Check code quality
```

### Deployment
```bash
vercel               # Deploy to Vercel
netlify deploy       # Deploy to Netlify
pm2 start npm --name "selam" -- start  # Self-hosted with PM2
```

## 📝 How To...

### Add a New Page

1. Create folder in `app/`:
```bash
mkdir app/new-page
```

2. Create `page.js`:
```javascript
export const metadata = {
  title: 'New Page',
  description: 'Description for SEO',
}

export default function NewPage() {
  return (
    <>
      <Navigation />
      <main>{/* Your content */}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
```

3. Update sitemap in [`app/sitemap.js`](./app/sitemap.js):
```javascript
const routes = [
  '',
  '/about',
  '/new-page',  // Add this
  // ...
]
```

### Add a New Update (Admin)

1. Go to `/admin` and login
2. Click "Create New Update"
3. Fill in:
   - Title
   - Description
   - Image URL (optional)
4. Click "Publish"
5. Update appears on homepage automatically

### Change WhatsApp Number

Edit [`.env.local`](./.env.local):
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=+251912345678
```

Restart server:
```bash
npm run dev
```

### Update Hero Images

Edit [`components/HeroSection.js`](./components/HeroSection.js):
```javascript
const heroImages = [
  {
    src: 'https://your-image-url.com/image1.jpg',
    alt: 'Description',
    priority: true,  // First image only
  },
  // Add more images...
]
```

### Modify Navigation Menu

Edit [`components/Navigation.js`](./components/Navigation.js):
```javascript
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'New Item', href: '/new-page' },  // Add this
  // ...
]
```

### Change Colors

Edit [`tailwind.config.js`](./tailwind.config.js):
```javascript
colors: {
  primary: {
    50: '#eff6ff',
    // ... change these values
    600: '#0ea5e9',  // Main brand color
    // ...
  }
}
```

### Add Social Media Links

Edit [`components/Footer.js`](./components/Footer.js):
```javascript
const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/SelamNGO', icon: '...' },
  { name: 'Twitter', href: 'https://twitter.com/SelamNGO', icon: '...' },
  // Add more...
]
```

### Update Contact Information

Edit [`.env.local`](./.env.local):
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=+251912345678
NEXT_PUBLIC_EMAIL=info@selam-ngo.org
NEXT_PUBLIC_PHONE=+251911234567
```

Then update [`components/Footer.js`](./components/Footer.js) to use these values.

### Optimize Images

1. Use Next.js Image component:
```javascript
import Image from 'next/image'

<Image
  src="/images/photo.jpg"
  alt="Description"
  width={800}
  height={600}
  quality={85}
  loading="lazy"
/>
```

2. Or use external URLs (add domain to [`next.config.js`](./next.config.js)):
```javascript
images: {
  domains: ['your-cdn.com'],
}
```

### Add Google Analytics

1. Get tracking ID from Google Analytics
2. Add to [`.env.local`](./.env.local):
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

3. Create `app/GoogleAnalytics.js`:
```javascript
'use client'
import Script from 'next/script'

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
    </>
  )
}
```

4. Add to [`app/layout.js`](./app/layout.js):
```javascript
import GoogleAnalytics from './GoogleAnalytics'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  )
}
```

### Change Admin Password

1. Generate hash:
```bash
node -e "console.log(require('bcryptjs').hashSync('your-new-password', 10))"
```

2. Update [`.env.local`](./.env.local):
```env
ADMIN_PASSWORD_HASH=$2b$10$...
```

3. Restart server

### Add Custom Font

1. Import in [`app/layout.js`](./app/layout.js):
```javascript
import { Inter, YourFont } from 'next/font/google'

const yourFont = YourFont({
  subsets: ['latin'],
  variable: '--font-your-font',
  display: 'swap',
})
```

2. Add to HTML:
```javascript
<html className={`${inter.variable} ${yourFont.variable}`}>
```

3. Use in Tailwind:
```javascript
// tailwind.config.js
fontFamily: {
  'your-font': ['var(--font-your-font)'],
}
```

### Enable Dark Mode

1. Update [`tailwind.config.js`](./tailwind.config.js):
```javascript
module.exports = {
  darkMode: 'class',
  // ...
}
```

2. Add toggle button in Navigation
3. Use dark mode classes:
```javascript
<div className="bg-white dark:bg-gray-900">
```

## 🐛 Troubleshooting

### Build Fails
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Images Not Loading
- Check domain in [`next.config.js`](./next.config.js)
- Verify image URL is accessible
- Check browser console for errors

### Slow Performance
```bash
# Run Lighthouse audit
npm run build
npm start
# Open Chrome DevTools → Lighthouse → Run audit
```

### 404 on Deployment
- Ensure all pages have `page.js`
- Check routing in [`app/`](./app/)
- Verify build completed successfully

### Environment Variables Not Working
- Restart development server
- Check variable names start with `NEXT_PUBLIC_` for client-side
- Verify `.env.local` exists and is not in `.gitignore`

## 📊 Performance Checklist

- [ ] Images use Next.js `<Image>` component
- [ ] Images have proper `alt` text
- [ ] Fonts use `next/font`
- [ ] No console errors
- [ ] Lighthouse score > 95
- [ ] Mobile responsive
- [ ] Fast on slow 3G
- [ ] Proper meta tags
- [ ] Sitemap accessible
- [ ] Robots.txt configured

## 🔒 Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secure
- [ ] Admin panel password protected
- [ ] No sensitive data in client code
- [ ] Security headers configured
- [ ] Dependencies up to date
- [ ] Input validation on forms
- [ ] CORS properly configured

## 📱 Testing Checklist

- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on mobile devices
- [ ] Test on slow connection
- [ ] Test all links work
- [ ] Test forms submit
- [ ] Test admin panel
- [ ] Test WhatsApp button
- [ ] Test navigation menu

## 🚀 Pre-Deployment Checklist

- [ ] Update environment variables
- [ ] Test production build locally
- [ ] Run Lighthouse audit
- [ ] Check all pages load
- [ ] Verify images load
- [ ] Test on mobile
- [ ] Check console for errors
- [ ] Verify meta tags
- [ ] Test admin login
- [ ] Backup current version

## 📞 Quick Links

- **Local Dev**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Documentation**: [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)
- **Deployment**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Setup**: [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## 🆘 Need Help?

1. Check documentation files
2. Search GitHub issues
3. Contact: info@selam-ngo.org
4. WhatsApp: +251912345678

---

**Quick Tip**: Keep this file bookmarked for fast reference! 🔖
