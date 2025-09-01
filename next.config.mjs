/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  poweredByHeader: false,
  // async headers() {
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: [
  //         {
  //           key: "Content-Security-Policy",
  //           value: ["default-src 'self';",
  //             "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://www.seepie.com https://www.elastic.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/;",
  //             "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.seepie.com https://www.elastic.com;",
  //             "img-src 'self' data: blob: https://*.tile.openstreetmap.org https://*.osm.org https://www.youtube.com https://randomuser.me https://github.com;",
  //             "font-src 'self' https://fonts.gstatic.com https://www.seepie.com https://www.elastic.com;",
  //             "connect-src 'self' https://*.tile.openstreetmap.org https://*.osm.org https://www.youtube.com https://crrsa-api.risertechservices.com;",
  //             "frame-src 'self' https://www.google.com https://www.youtube.com;",
  //             "media-src 'self' blob: data: https://www.youtube.com;"
  //           ].join(" ").replace(/\s{2,}/g, ' ').trim()
  //         },
  //         {
  //           key: "X-Content-Type-Options",
  //           value: "nosniff",
  //         },
  //         {
  //           key: "X-Frame-Options",
  //           value: "SAMEORIGIN",
  //         },
  //         {
  //           key: "Referrer-Policy",
  //           value: "origin",
  //         },
  //         {
  //           key: "Strict-Transport-Security",
  //           value: "max-age=31536000; includeSubDomains",
  //         },
  //         {
  //           key: "Access-Control-Allow-Credentials",
  //           value: "true",
  //         },
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "https://*",
  //         },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET,OPTIONS,DELETE,POST,PUT",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //         },
  //         {
  //           key: "Server",
  //           value: "hide",
  //         }
  //       ],
  //     }
  //   ];
  // },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
    };
    return config;
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

