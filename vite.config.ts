import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

declare module '@remix-run/node' {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
    },
  },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      routes: async (defineRoutes) => {
        return defineRoutes((route) => {
          route('/', 'routes/layout.tsx', () => {
            route('/', 'routes/_index.tsx');
            route('/list-of-deals', 'routes/list-of-deals.tsx');
            // route('/list-of-deals/:id', 'routes/deals.tsx');
            route('/stores', 'routes/stores.tsx');
          });
        });
      },
    }),
    tsconfigPaths(),
    tailwindcss(),
  ],
});
