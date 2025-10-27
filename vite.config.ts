import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/web-components/index.ts'),
      name: 'ReactCounterLib',
      formats: ['iife'],
      fileName: (format) => `react-counter-lib.${format}.js`
    },
    rollupOptions: {
        external: [],
        output: {
            globals: {},
        }
    },
    outDir: 'dist'
  }
});
