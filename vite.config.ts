import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Served from https://metur100.github.io/Islam.Apps.Landing/
export default defineConfig({
  base: '/Islam.Apps.Landing/',
  plugins: [react()],
});
