const defclass = require("./default");
const ethers = require("ethers");

class Ethereum extends defclass {
  constructor() {
    super();

    this.Type = "Ethereum";
  }

  generate() {
    const wallet = ethers.Wallet.createRandom();

    this.privateKey = wallet.privateKey;
    this.Passphrase = wallet.mnemonic.phrase;
    this.address = wallet.address;
    this.publicKey = wallet.publicKey;
  }
}

module.exports = Ethereum;
