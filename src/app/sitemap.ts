import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wftech.com';

  return [
    {
      url: `${baseUrl}/homepage`,
      lastModified: new Date('2026-04-30'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date('2026-04-30'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2026-04-30'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/carrieres`,
      lastModified: new Date('2026-04-30'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/newsroom`,
      lastModified: new Date('2026-04-30'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/solutions/otostop`,
      lastModified: new Date('2026-04-30'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/zehouse`,
      lastModified: new Date('2026-04-30'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/zetravel`,
      lastModified: new Date('2026-04-30'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/logistikagricol`,
      lastModified: new Date('2026-04-30'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/dirty-meta`,
      lastModified: new Date('2026-04-30'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/health-of`,
      lastModified: new Date('2026-04-30'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/ai-mimicry`,
      lastModified: new Date('2026-04-30'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}