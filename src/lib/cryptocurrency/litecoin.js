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
    console.log("ADDRESS:", this.Coinkey.publicAddress);
    console.log("PUBLIC KEY:", this.Coinkey.publicKey.toString("hex")); // Buffer.from(key1.publicKey.toString('hex'), 'hex')
    console.log("PRIVATE KEY:", this.Coinkey.privateKey.toString("hex"));

    this.address = this.Coinkey.publicAddress;
    this.publicKey = this.Coinkey.publicKey;
    this.privateKey = this.Coinkey.privateKey;
    this.privateWif = this.Coinkey.privateWif;
  }
}

module.exports = Litecoin;
