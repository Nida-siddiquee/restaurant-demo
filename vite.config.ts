import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://uk.api.just-eat.io',
        changeOrigin: true,
        secure: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  define: {
      // make VITE_API_BASE_URL available as process.env.VITE_API_BASE_URL
      'process.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL)
    }
});
