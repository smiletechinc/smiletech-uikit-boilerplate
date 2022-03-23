/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [ {
      destination: '/account/login',
      permanent: true,
    }
    ]
  }

  
}

module.exports = nextConfig
