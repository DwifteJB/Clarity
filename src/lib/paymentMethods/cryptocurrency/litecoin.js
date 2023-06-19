const defclass = require("./default");

const CoinKey = require("coinkey");
const secureRandom = require("secure-random");

class Litecoin extends defclass {
  constructor() {
    super();

    this.Coinkey = null;
    this.Type = "Litecoin";
  }

  generate() {
    const privateKeyBytes = secureRandom.randomBuffer(32);

    this.Coinkey = new CoinKey(privateKeyBytes, {
      private: 0xb0,
      public: 0x30,
    });

    this.address = this.Coinkey.publicAddress;
    this.publicKey = this.Coinkey.publicKey; // is buffer
    this.privateKey = this.Coinkey.privateKey; // is buffer
    this.privateWif = this.Coinkey.privateWif;
  }
}

module.exports = Litecoin;
