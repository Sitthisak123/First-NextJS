/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    images:{
        remotePatterns: [
            {
              protocol: "http", 
              hostname: "10.30.0.75", 
            },
          ]
    }
};

export default nextConfig;
