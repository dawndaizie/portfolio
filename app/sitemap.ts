import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://dawniquecasteele.com';
  return ['', '/art', '/play', '/about'].map((path) => ({
    url: `${base}${path}`,
  }));
}