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
};

export default nextConfig;
