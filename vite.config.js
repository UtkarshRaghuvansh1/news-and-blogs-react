import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/news-and-blogs-react/",
  define: {
    "process.env": {}, // This can fix basic 'process is not defined' errors
  },
});
