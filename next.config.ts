import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
		domains: ['raw.githubusercontent.com'],
		localPatterns: [
			{
				pathname: '/img/**',
				search: '',
			},
		],
	}
};

export default nextConfig;
