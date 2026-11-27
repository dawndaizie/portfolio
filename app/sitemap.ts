import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://dawniquecasteele.com';
  return ['', '/art', '/play', '/about'].map((path) => ({
    url: `${base}${path}`,
  }));
}