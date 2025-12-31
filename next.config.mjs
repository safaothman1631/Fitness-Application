/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Disabled - breaks API routes needed for Firebase integration
  
  // Disable source maps in production to reduce bundle size
  productionBrowserSourceMaps: false,
  
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  
  // Turbopack configuration (Next.js 16+)
  turbopack: {
    rules: {
      // Handle GLTF/GLB files
      '*.glb': {
        loaders: ['file-loader'],
        as: '*.js',
      },
      '*.gltf': {
        loaders: ['file-loader'],
        as: '*.js',
      },
    },
  },
  
  // Webpack configuration for GLTF/GLB files (fallback for webpack mode)
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    })
    return config
  },
  
  // Allow accessing dev server resources from LAN IPs if you open the site on another device
  // Silence Next.js warning: configure "allowedDevOrigins"
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://0.0.0.0:3000",
    // Add your LAN IP(s) here as needed
    "http://192.168.1.4:3000",
  ],
  // Security Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Prevent clickjacking attacks
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Enable XSS protection (legacy, but still useful)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Referrer policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Permissions policy (restrict dangerous features)
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' blob: data: https://*.googleapis.com https://*.firebaseio.com https://*.cloudfunctions.net wss://*.firebaseio.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://*.upstash.io https://storage.googleapis.com https://*.firebasestorage.app https://vitals.vercel-insights.com",
              "frame-src 'self' https://*.firebaseapp.com",
              "media-src * blob: data:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ]
      },
      {
        // API routes - more relaxed CSP
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ]
      }
    ]
  },
  async redirects() {
    return [
      // Login
      { source: "/giris/hasta", destination: "/login", permanent: true },
      { source: "/giris", destination: "/login", permanent: true },
      { source: "/giris/:path*", destination: "/login/:path*", permanent: true },

      // Register
      { source: "/kayit", destination: "/register", permanent: true },

      // Payment
      { source: "/odeme", destination: "/payment", permanent: true },
      { source: "/odeme/basarili", destination: "/payment/success", permanent: true },

      // Exercises
      { source: "/egzersizler", destination: "/exercises", permanent: true },
      { source: "/egzersizler/:id", destination: "/exercises/:id", permanent: true },

      // Physiotherapist
      { source: "/fizyoterapist", destination: "/physiotherapist", permanent: true },
      { source: "/fizyoterapist/:path*", destination: "/physiotherapist/:path*", permanent: true },

      // Membership
      { source: "/uyelik", destination: "/membership", permanent: true },
      { source: "/uyelik/:path*", destination: "/membership/:path*", permanent: true },

      // Admin member
      { source: "/admin/uye/:id", destination: "/admin/member/:id", permanent: true },

      // Patient panel
      { source: "/hasta-panel", destination: "/patient-panel", permanent: true },
      { source: "/hasta-panel/:path*", destination: "/patient-panel/:path*", permanent: true },

      // Legacy generic panel route
      { source: "/panel", destination: "/dashboard", permanent: true },
    ]
  },
}

export default nextConfig
