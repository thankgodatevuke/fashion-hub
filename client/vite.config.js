import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom"], // Forces Vite to use a single React instance
  },
  optimizeDeps: {
    include: ["react", "react-dom"], // Ensures they are pre-bundled correctly
  },
});
