import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/* Manual chunking strategy:
   - vendor-react: framework + router + helmet (rarely changes)
   - vendor-motion: framer-motion (heaviest non-app dep)
   - vendor-i18n: i18next + plugins (loaded once, then cached)
   - vendor-form: react-hook-form + zod + resolvers (only Kontakt section)
   - vendor-icons: lucide-react (used everywhere)
   This keeps the main entry small and lets HTTP/2 multiplex small chunks. */
export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('framer-motion')) return 'vendor-motion';
          if (id.includes('react-i18next') || id.includes('/i18next')) return 'vendor-i18n';
          if (
            id.includes('react-hook-form') ||
            id.includes('@hookform') ||
            id.includes('/zod')
          )
            return 'vendor-form';
          if (id.includes('lucide-react')) return 'vendor-icons';
          if (
            id.includes('react-dom') ||
            id.includes('react-router') ||
            id.includes('react-helmet') ||
            id.includes('scheduler') ||
            id.includes('/react/')
          )
            return 'vendor-react';
          return 'vendor';
        },
      },
    },
  },
})
