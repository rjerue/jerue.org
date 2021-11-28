const fetch = require("node-fetch");
const fs = require("fs").promises;

function makeColor([r, g, b], a = 1) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

async function refreshThemeColorsFromColormind() {
  const color = await fetch("http://colormind.io/api/", {
    method: "post",
    body: JSON.stringify({
      model: "ui",
    }),
  })
    .then((result) => result.json())
    .then((data) => data.result);
  return {
    text: makeColor(color[0]),
    background: makeColor(color[4]),
    primary: makeColor(color[2]),
    muted: makeColor(color[3]),
    secondary: makeColor(color[1]),
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const colors = await Promise.all(
    new Array(100).fill(0).map(async () => {
      await sleep(2000);
      return refreshThemeColorsFromColormind();
    })
  );
  await fs.writeFile("./public/static/colors.json", JSON.stringify(colors));
}

main();
