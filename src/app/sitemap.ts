import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wftech.fr';

  return [
    {
      url: `${baseUrl}/homepage`,
      lastModified: new Date('2026-04-09'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}