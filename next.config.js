// next.config.js
const fs = require("fs");
const withOffline = require("next-offline");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const nextConfig = {
  exportTrailingSlash: true,
  pageExtensions: ["ts", "tsx", "mdx"],
};

const folders = fs.readdirSync("./pages/blog");

const regex = /(.*)\.mdx/;

const posts = folders
  .filter(f => f.includes(".mdx"))
  .map(f => {
    const matches = regex.exec(f);
    return matches[1];
  });

fs.writeFileSync(
  "./blogs.json",
  JSON.stringify({
    posts,
  })
);

module.exports = [withOffline, withMDX].reduce(
  (updatedConfig, configWrapper) => configWrapper(updatedConfig),
  nextConfig
);
