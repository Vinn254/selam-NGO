# Selam Website - Deployment Guide

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

### Local Development

1. **Install Dependencies**
```bash
cd selam-website
npm install
```

2. **Configure Environment Variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000

# WhatsApp Configuration
NEXT_PUBLIC_WHATSAPP_NUMBER=+251912345678
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hello Selam! I would like to know more about your organization.

# Revalidation Time (seconds)
REVALIDATE_TIME=60

# Admin Credentials (for development only)
ADMIN_EMAIL=admin@selam-ngo.org
ADMIN_PASSWORD_HASH=$2b$10$...
```

3. **Run Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Built by Next.js creators
- Automatic optimization
- Global CDN
- Zero configuration
- Free SSL
- Automatic deployments

**Steps:**

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
cd selam-website
vercel
```

4. **Configure Environment Variables**
- Go to Vercel Dashboard
- Select your project
- Settings → Environment Variables
- Add all variables from `.env.local`

5. **Set Production Domain**
- Settings → Domains
- Add your custom domain (e.g., selam-ngo.org)
- Configure DNS records as instructed

**Automatic Deployments:**
- Connect GitHub repository
- Every push to `main` branch auto-deploys
- Preview deployments for pull requests

### Option 2: Netlify

**Steps:**

1. **Install Netlify CLI**
```bash
npm i -g netlify-cli
```

2. **Login**
```bash
netlify login
```

3. **Initialize**
```bash
cd selam-website
netlify init
```

4. **Configure Build Settings**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

5. **Deploy**
```bash
netlify deploy --prod
```

6. **Environment Variables**
- Netlify Dashboard → Site Settings → Environment Variables
- Add all variables

### Option 3: AWS Amplify

**Steps:**

1. **Install Amplify CLI**
```bash
npm i -g @aws-amplify/cli
```

2. **Configure AWS**
```bash
amplify configure
```

3. **Initialize Amplify**
```bash
cd selam-website
amplify init
```

4. **Add Hosting**
```bash
amplify add hosting
```

5. **Deploy**
```bash
amplify publish
```

### Option 4: Self-Hosted (VPS/Dedicated Server)

**Requirements:**
- Ubuntu 20.04+ or similar Linux distribution
- Node.js 18+
- Nginx or Apache
- PM2 for process management
- SSL certificate (Let's Encrypt)

**Steps:**

1. **Server Setup**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Certbot for SSL
sudo apt install -y certbot python3-certbot-nginx
```

2. **Clone Repository**
```bash
cd /var/www
sudo git clone https://github.com/your-org/selam-website.git
cd selam-website
```

3. **Install Dependencies & Build**
```bash
npm install
npm run build
```

4. **Configure Environment**
```bash
sudo nano .env.local
# Add production environment variables
```

5. **Start with PM2**
```bash
pm2 start npm --name "selam-website" -- start
pm2 save
pm2 startup
```

6. **Configure Nginx**
```bash
sudo nano /etc/nginx/sites-available/selam-ngo.org
```

```nginx
server {
    listen 80;
    server_name selam-ngo.org www.selam-ngo.org;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache static assets
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, immutable";
    }

    # Cache images
    location /images {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, immutable";
    }
}
```

7. **Enable Site**
```bash
sudo ln -s /etc/nginx/sites-available/selam-ngo.org /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

8. **Setup SSL**
```bash
sudo certbot --nginx -d selam-ngo.org -d www.selam-ngo.org
```

9. **Auto-renewal**
```bash
sudo certbot renew --dry-run
```

### Option 5: Docker Deployment

**Dockerfile:**
```dockerfile
# selam-website/Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SITE_URL=https://selam-ngo.org
      - NEXT_PUBLIC_API_URL=https://api.selam-ngo.org
      - NEXT_PUBLIC_WHATSAPP_NUMBER=+251912345678
    restart: unless-stopped
```

**Deploy:**
```bash
docker-compose up -d
```

## Post-Deployment Checklist

### 1. Verify Deployment
- [ ] Homepage loads correctly
- [ ] All pages are accessible
- [ ] Images load properly
- [ ] Navigation works smoothly
- [ ] WhatsApp button functions
- [ ] Admin panel is accessible
- [ ] Forms submit successfully

### 2. SEO Configuration
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify robots.txt is accessible
- [ ] Check meta tags with SEO tools
- [ ] Verify structured data with Google Rich Results Test
- [ ] Set up Google Analytics
- [ ] Configure Google Tag Manager (optional)

### 3. Performance Testing
- [ ] Run Lighthouse audit (target: 95+ performance)
- [ ] Test on PageSpeed Insights
- [ ] Check Core Web Vitals
- [ ] Test on multiple devices
- [ ] Test on slow 3G connection
- [ ] Verify image optimization

### 4. Security
- [ ] HTTPS is enforced
- [ ] Security headers are set
- [ ] Admin panel requires authentication
- [ ] Environment variables are secure
- [ ] No sensitive data in client-side code
- [ ] CORS is properly configured

### 5. Monitoring Setup
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure error tracking (Sentry)
- [ ] Set up analytics (Google Analytics 4)
- [ ] Monitor Core Web Vitals
- [ ] Set up alerts for downtime

### 6. DNS Configuration
```
A Record:
@ → Your server IP

CNAME Record:
www → selam-ngo.org

TXT Record (for verification):
@ → google-site-verification=...
```

### 7. CDN Setup (Optional but Recommended)
- Cloudflare (Free tier available)
- AWS CloudFront
- Fastly

## Continuous Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: ${{ secrets.SITE_URL }}
          NEXT_PUBLIC_API_URL: ${{ secrets.API_URL }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Backup Strategy

### Database Backups (if using backend)
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="mongodb://..." --out="/backups/mongo_$DATE"
```

### File Backups
```bash
# Backup uploaded files
rsync -avz /var/www/selam-website/public/uploads/ /backups/uploads/
```

### Automated Backups
- Set up cron jobs for daily backups
- Store backups in cloud storage (S3, Google Cloud Storage)
- Keep 30 days of backups
- Test restore procedure monthly

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Images Not Loading
- Check image domains in `next.config.js`
- Verify image URLs are accessible
- Check CDN configuration

### Slow Performance
- Run Lighthouse audit
- Check image sizes
- Verify CDN is working
- Check server resources
- Enable compression

### 404 Errors
- Verify all pages exist
- Check routing configuration
- Clear browser cache
- Rebuild application

## Maintenance

### Regular Tasks
- **Weekly:** Check error logs
- **Monthly:** Update dependencies
- **Quarterly:** Security audit
- **Annually:** Review and optimize

### Updates
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update Next.js
npm install next@latest react@latest react-dom@latest

# Test after updates
npm run build
npm start
```

## Support & Resources

- **Next.js Documentation:** https://nextjs.org/docs
- **Vercel Support:** https://vercel.com/support
- **Community:** https://github.com/vercel/next.js/discussions

## Conclusion

Your Selam website is now deployed and optimized for:
- ⚡ Maximum performance
- 🔍 Perfect SEO
- 🔒 Strong security
- 📱 Mobile excellence
- 🌍 Global reach

Monitor regularly and keep content fresh for best results!
