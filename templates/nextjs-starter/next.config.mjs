import {withJuno} from '@junobuild/nextjs-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export'
};

export default withJuno({nextConfig, juno: {container: true}});
