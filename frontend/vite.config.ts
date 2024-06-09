import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, isPreview, mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  console.log("command: ", command);
  console.log("isPreview: ", isPreview);
  console.log("mode: ", mode);
  return {
    plugins: [react()],
    define: {
      __APP_ENV__: JSON.stringify(env["APP_ENV"]),
    },
  };
});
