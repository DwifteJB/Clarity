const defclass = require("./default");

const CoinKey = require("coinkey");
const secureRandom = require("secure-random");

class Bitcoin extends defclass {
  constructor() {
    super();

    this.Coinkey = null;
    this.Type = "Bitcoin";
  }

  generate() {
    const privateKeyBytes = secureRandom.randomBuffer(32);

    this.Coinkey = new CoinKey(privateKeyBytes);

    this.address = this.Coinkey.publicAddress;
    this.publicKey = this.Coinkey.publicKey; // is buffer
    this.privateKey = this.Coinkey.privateKey; // is buffer
    this.privateWif = this.Coinkey.privateWif;
  }
}

module.exports = Bitcoin;
