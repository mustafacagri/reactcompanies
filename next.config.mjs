/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // GitHub avatars
      },
      {
        protocol: 'https',
        hostname: 'hatscripts.github.io', // FlagCountry
      },
    ],
  },
}

export default nextConfig
