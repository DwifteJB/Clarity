require("dotenv").config();

const path = require("path");
global.rootFolder = path.resolve(__dirname);

const Eth = require("./src/lib/cryptocurrency/ethereum");
(async () => {
  const Wal = new Eth();

  Wal.generate();
  await Wal.saveKey();
})();
