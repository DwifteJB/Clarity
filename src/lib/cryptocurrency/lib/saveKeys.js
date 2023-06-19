const fs = require("fs");
const path = require("path");

const addresses = path.join(global.rootFolder, "addresses");

module.exports = function (Type, HeaderName, files) {
  /*
      files: {
        ["filename.txt"]: "file contents",
        ["filename2.txt"]: "file contents", etc..
      }

    */

  if (!fs.existsSync(addresses)) {
    fs.mkdirSync(addresses);
  }

  if (!fs.existsSync(path.join(addresses, Type))) {
    fs.mkdirSync(path.join(addresses, Type));
  }

  if (!fs.existsSync(path.join(addresses, Type, HeaderName))) {
    fs.mkdirSync(path.join(addresses, Type, HeaderName));
  }

  for (const [filename, value] of Object.entries(files)) {
    fs.writeFileSync(path.join(addresses, Type, HeaderName, filename), value);
  }
};
