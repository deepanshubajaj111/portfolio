import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://deepanshubajaj111.github.io',
  base: '/portfolio',
  integrations: [
    tailwind({ applyBaseStyles: false }),
  ],
  output: 'static',
});
