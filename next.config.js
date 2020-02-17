// next.config.js
const withOffline = require("next-offline");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/
});

const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"]
};

module.exports = [withOffline, withMDX].reduce(
  (updatedConfig, configWrapper) => configWrapper(updatedConfig),
  nextConfig
);
