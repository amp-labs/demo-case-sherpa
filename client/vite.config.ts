import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    define: {
        'process.env': {
          VITE_AMPERSAND_PROJECT_ID: process.env.VITE_AMPERSAND_PROJECT_ID,
          VITE_AMPERSAND_API_KEY: process.env.VITE_AMPERSAND_API_KEY,
        },
    },
    server: {
        port: 3006,
    },
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
    },
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        sourcemap: true,
        rollupOptions: {
            input: {
                main: '/index.html',
            },
        },
    },
});
