import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "A³ Texture Finishes",
        short_name: "A³",

        description:
          "Premium Interior & Exterior Texture Finishes",

        theme_color: "#0f172a",
        background_color: "#ffffff",

        display: "standalone",

        start_url: "/",

        icons: [
          {
            src: "/logo.jpeg",
            sizes: "192x192",
            type: "image/jpeg",
          },

          {
            src: "/logo.jpeg",
            sizes: "512x512",
            type: "image/jpeg",
          },
        ],
      },
    }),
  ],
});