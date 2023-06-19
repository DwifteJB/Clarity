require("dotenv").config();

const path = require("path");
global.rootFolder = path.resolve(__dirname);

const Eth = require("./src/lib/paymentMethods/cryptocurrency/ethereum");
const GeneratePayment = require("./src/lib/generatePayment");

(async () => {
  const Wal = new Eth();

  Wal.generate();
  await Wal.saveKey();

  GeneratePayment.generateTransactionID("Dwifte", "Benji");
})();
