/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['fakestoreapi.com'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'fakestoreapi.com',
            port: '', // Leave it empty if not applicable
            pathname: '/products', // Path to the images or data
            
          },
        ],
      },
};

export default nextConfig;
