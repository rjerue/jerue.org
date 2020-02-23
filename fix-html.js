const fs = require("fs");
const path = require("path");
const root = "./out";

function fix(dir) {
  const folders = fs.readdirSync(dir);
  folders.forEach((file, index, list) => {
    if (file === "index.html" || file === "_next") {
      return;
    }
    const isDir = fs.statSync(path.join(dir, file)).isDirectory();
    if (isDir) {
      fix(path.join(dir, file));
    } else if (file.includes(".html")) {
      // is an html file
      const noHTML = file.replace(".html", "");
      console.log(noHTML, dir, file);
      if (list.includes(noHTML)) {
        fs.copyFileSync(
          path.join(dir, file),
          path.join(dir, noHTML, "index.html")
        );
      } else {
        fs.copyFileSync(path.join(dir, file), path.join(dir, noHTML));
      }
    }
  });
}

fix(root);
