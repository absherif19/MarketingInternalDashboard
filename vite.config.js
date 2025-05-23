import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "./", // 👈 important for subfolder deployment
  plugins: [react(), tailwindcss()],
    server: {
    host: true, // 👈 this allows access from your network
  },
});
