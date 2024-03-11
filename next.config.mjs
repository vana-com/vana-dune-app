/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'storage.googleapis.com',
				port: '',
				pathname: '/vana-gotchi-jobs-development/**',
			},
		],
	},
};

export default nextConfig;
