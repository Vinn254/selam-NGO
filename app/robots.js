export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://selam-ngo.org'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
