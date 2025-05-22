import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// vite.config.js
export default defineConfig({
  base: '/services/CorporateMarketing/', // 👈 use the actual deployed folder
  plugins: [react(), tailwindcss()],
});
