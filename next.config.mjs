/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // The 'appDir' experimental flag is no longer needed in Next.js 13.4+
  // as the App Router is stable. Removing it.
  // experimental: {
  //   appDir: true,
  // },
}

export default nextConfig
