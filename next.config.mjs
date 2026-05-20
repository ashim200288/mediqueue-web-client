/** @type {import('next').NextConfig} */
const nextConfig = {
  
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000', 
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ibb.co.com', 
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co', 
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**', 
      },
      {
        protocol: 'http',
        hostname: '**', 
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', 
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com', 
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;