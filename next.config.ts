import type { NextConfig } from "next";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : "*.supabase.co";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseHost,
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Fotos já chegam comprimidas em WebP do cliente, mas o limite padrão (1MB)
      // ainda pode ser justo pra uma foto única de alta resolução.
      bodySizeLimit: "8mb",
    },
  },
  // 127.0.0.1 e localhost são hosts distintos pro dev server; sem isso o HMR
  // trava silenciosamente (JS para de atualizar) se a aba abrir via 127.0.0.1.
  allowedDevOrigins: ["localhost", "127.0.0.1"],
};

export default nextConfig;
