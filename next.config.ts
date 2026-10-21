import type { NextConfig } from "next";
import { randomUUID } from "node:crypto";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  // En dev el service worker estorba (caché viejo): solo se genera en el build
  disable: process.env.NODE_ENV === "development",
  // La página offline se guarda al instalar el SW; la revisión cambia en cada build para refrescarla
  additionalPrecacheEntries: [{ url: "/~offline", revision: randomUUID() }],
});

const nextConfig: NextConfig = {};

export default withSerwist(nextConfig);
