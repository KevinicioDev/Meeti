import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a4x3pkbqek.ufs.sh"//esto permitira que se puedan mostrar las imagenes en el proyecto
      }
    ]
  }
};

export default nextConfig;
