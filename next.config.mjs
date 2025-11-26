/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Disabled - breaks API routes needed for Firebase integration
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Allow accessing dev server resources from LAN IPs if you open the site on another device
  // Silence Next.js warning: configure "allowedDevOrigins"
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://0.0.0.0:3000",
    // Add your LAN IP(s) here as needed
    "http://192.168.1.4:3000",
  ],
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
