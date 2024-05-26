/** @type {import('next').NextConfig} */

const isGhActions = !!process.env.GITHUB_ACTIONS;

const nextConfig = {
    output: 'export',
    assetPrefix: isGhActions ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io/${process.env.GITHUB_REPOSITORY.split('/').slice(1)}/` : '',
};

export default nextConfig;
