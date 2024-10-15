import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [deno(), react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000", // Replace with your Deno server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove /api prefix when forwarding to the backend
      },
    },
  },
});
