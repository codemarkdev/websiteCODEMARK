/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',            // Static export: 100% archivos estáticos
  trailingSlash: true,         // URLs siempre con slash al final (/about/)
  skipTrailingSlashRedirect: true,
  distDir: 'out',              // Carpeta de salida para el build

  // No hace falta optimizar imágenes si usas SVG, pero si subes JPG/PNG también, usa una CDN externa para optimizarlas.
  images: {
    unoptimized: true
  },

  // Solo ignorar errores de ESLint/TS en desarrollo rápido, no en producción final
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV !== 'production',
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV !== 'production',
  },

  // Permite importar SVGs como componentes React (¡es lo más pro!)
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false
                },
                {
                  name: 'cleanupIDs',
                  active: true
                }
              ]
            }
          }
        }
      ]
    });
    return config;
  }
};

export default nextConfig;
