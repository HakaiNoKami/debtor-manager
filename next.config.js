/** @type {import('next').NextConfig} */
module.exports = {
  distDir: "build",
  eslint: {
    dirs: ["scr"],
    ignoreDuringBuilds: true,
  },
};
