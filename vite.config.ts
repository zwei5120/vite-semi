import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import SemiPlugin from "vite-plugin-semi-theme";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    SemiPlugin({
      theme: "@semi-bot/semi-theme-default",
      // variables: {
      //   '--semi-color-primary' : '#ff0000',
      //   '--semi-blue-5' : '#ff0000'
      // }
      // theme: "@semi-bot/semi-theme-test",
      // include: "~@semi-bot/semi-theme-test/scss/local.scss",
      options: {
        // variables: {
        //   "$--semi-color-primary": "#ff0000",
        //   "$font-size-small": '#ff0000'
        // }
      },
    }),
  ],
});
