export default function sitemap() {
  const baseUrl = 'https://selam.co.ke'
  
  const routes = [
    '',
    '/about',
    '/what-we-do',
    '/partners',
    '/join-us',
    '/updates',
    '/documents',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : route === '/updates' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/updates' ? 0.9 : 0.8,
  }))

  return routes
}
