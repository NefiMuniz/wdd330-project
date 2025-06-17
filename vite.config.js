import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        account: resolve(__dirname, "src/account/index.html"),
        entries: resolve(__dirname, "src/account/entries.html"),
        report: resolve(__dirname, "src/account/report.html"),
        help: resolve(__dirname, "src/account/help.html"),
      },
    },
  },
});
