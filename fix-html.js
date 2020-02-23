const fs = require("fs");
const path = require("path");
const root = "./out";

function fix(dir) {
  const folders = fs.readdirSync(dir);
  folders.forEach((file, index, list) => {
    if (file === "index.html" || file === "404.html" || file === "_next") {
      return;
    }
    const isDir = fs.statSync(path.join(dir, file)).isDirectory();
    if (isDir) {
      fix(path.join(dir, file));
    } else if (file.includes(".html")) {
      // is an html file
      const noHTML = file.replace(".html", "");
      console.log(noHTML, dir, file);
      const found = path.join(dir, file);
      const newDir = path.join(dir, noHTML);
      try {
        fs.mkdirSync(path.join(dir, noHTML), {});
      } catch (err) {
        // exists
      }
      fs.copyFileSync(found, path.join(dir, noHTML, "index.html"));
      fs.unlinkSync(found);
    }
  });
}

fix(root);
