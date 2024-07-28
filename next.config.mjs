/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Because of the error:
  Module parse failed: Unexpected token (1:0)
  You may need an appropriate loader to handle this file type,
  currently no loaders are configured to process this file.
  See https://webpack.js.org/concepts#loaders */
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.externals = [...config.externals, "bcrypt"];
  //   return config;
  // },

  // experimental: {
  //   serverActions: true
  // }

  images: {
    // domains: ["https://cdmsotn3nauemiwf.public.blob.vercel-storage.com/"],
    remotePatterns: [
      {
          protocol: 'https',
          hostname: 'cdmsotn3nauemiwf.public.blob.vercel-storage.com',
          port: '',
          // pathname: '/account123/**',
      },
  ],
  },
};

export default nextConfig;
