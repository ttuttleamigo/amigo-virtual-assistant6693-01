
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/widget-embed.tsx'),
      name: 'AmigoWidget',
      fileName: (format) => `amigo-widget.${format}.js`,
      formats: ['umd', 'es']
    },
    outDir: 'dist-widget',
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        // Ensure CSS is extracted
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'amigo-widget.css';
          return assetInfo.name || '';
        },
      },
    },
    cssCodeSplit: false,
    // Ensure all dependencies are bundled
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env': '{}',
    global: 'globalThis',
  },
  esbuild: {
    // Fix CSS issues
    legalComments: 'none',
  },
});
