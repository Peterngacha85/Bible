// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/bible': {
        target: 'https://bible-api.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bible/, ''),
      },
    },
  },
});
