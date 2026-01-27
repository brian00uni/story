import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/story/',
  define: {
    global: 'globalThis',
  },
  plugins: [
    react(),
    {
      name: 'redirect-story-slash',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/story') {
            res.statusCode = 302;
            res.setHeader('Location', '/story/');
            res.end();
            return;
          }
          next();
        });
      },
    },
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'src'),
    },
  },
});
