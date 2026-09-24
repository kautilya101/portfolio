import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://example.com',
  output: 'static',
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover'
  },
  build: {
    inlineStylesheets: 'auto'
  },
  image: {
    domains: ['cdn.sanity.io']
  }
});
