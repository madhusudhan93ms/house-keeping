import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'html-rewrite-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.method === 'GET') {
            const cleanUrl = req.url.split('?')[0].replace(/\/$/, '');
            if (cleanUrl && cleanUrl !== '') {
              const candidate = path.join(__dirname, 'public', cleanUrl, 'index.html');
              if (fs.existsSync(candidate)) {
                req.url = `${cleanUrl}/index.html`;
              }
            }
          }
          next();
        });
      }
    }
  ],
})
