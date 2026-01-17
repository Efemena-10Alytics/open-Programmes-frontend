import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: [
    'react-country-state-city',
    'react-datepicker',
    'react-datetime-picker',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig