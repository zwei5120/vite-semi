import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import SemiPlugin from "vite-plugin-semi-theme";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
