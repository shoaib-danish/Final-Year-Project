/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/recruiter-dashboard",
        destination: "/recruiter/dashboard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

