import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // Use relative paths for assets
  plugins: [react()],
  server: {
    open: true, // Automatically open in browser
  },
});
