/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/utils.js')

/** @type {import("next").NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		formats: ['image/avif', 'image/webp'],
	},
	reactStrictMode: true,
	experimental: {
		serverComponentsExternalPackages: ['@node-rs/argon2'],
		optimizePackageImports: ['radash'],
		optimizeCss: true,
	},
}

export default nextConfig
