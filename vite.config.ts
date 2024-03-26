import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import linaria from "@wyw-in-js/vite";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { devDependencies, peerDependencies } from "./package.json";
const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    linaria(),
    dts({ include: ["lib/"], rollupTypes: true }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/index.tsx"),
      formats: ["es", "cjs"],
      name: "daydreamer",
      fileName: "daydreamer",
    },
    reportCompressedSize: true,
    minify: "terser",
    rollupOptions: {
      external: [
        "react/jsx-runtime",
        "react",
        "react-dom",
        "date-fns",
        "@react-input/number-format",
        "@linaria/react",
        "@linaria/core",
        ...Object.keys(devDependencies),
        ...Object.keys(peerDependencies),
      ],
      output: {
        globals: {
          react: "React",
          "react/jsx-runtime": "jsxRuntime",
          "react-dom": "ReactDOM",
          "date-fns": "dateFns",
          "@react-input/number-format": "numberFormat",
          "@linaria/react": "linariaReact",
          "@linaria/core": "linariaCore",
        },
      },
      input: "lib/index.tsx",
    },
  },
});
