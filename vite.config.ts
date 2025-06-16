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
  define: {
    __API_BASE__: JSON.stringify(process.env.NODE_ENV === 'development' ? '' : 'https://uk.api.just-eat.io'),
  },
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'https://uk.api.just-eat.io',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
