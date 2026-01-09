import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: [
    'react-country-state-city',
    'react-datepicker',
    'react-datetime-picker',
  ],
}

export default nextConfig