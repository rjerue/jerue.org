/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const withPWA = require("next-pwa");

const isProd = process.env.NODE_ENV === "production";

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const nextConfig = {
  exportTrailingSlash: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  pwa: {
    dest: "public",
  },
};

const folders = fs.readdirSync("./pages/blog");

const regex = /(.*)\.mdx/;

const posts = folders
  .filter((f) => f.includes(".mdx"))
  .map((f) => {
    const matches = regex.exec(f);
    return matches[1];
  });

fs.writeFileSync(
  "./blogs.json",
  JSON.stringify({
    posts,
  })
);

module.exports = [...(isProd ? [withPWA] : []), withMDX].reduce(
  (updatedConfig, configWrapper) => configWrapper(updatedConfig),
  nextConfig
);
