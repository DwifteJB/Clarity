const crypto = require("crypto");

function randomNumber() {
  return Math.floor(Math.random() * 10);
}

function generateTransactionID(username1, username2) {
  let transactionIDBytes = [
    randomNumber(),
    username1.substring(0, 2).toUpperCase(),
    crypto.randomBytes(1).toString("hex").toUpperCase(),
    username2.substring(0, 2).toUpperCase(),
    randomNumber(),
    crypto.randomBytes(1).toString("hex").toUpperCase(),
    "-",
    crypto
      .createHash("sha256")
      .update(String(Date.now()))
      .digest("hex")
      .substring(0, 6)
      .toUpperCase(),
  ];
  console.log(transactionIDBytes);
  console.log(transactionIDBytes.join(""));

  return transactionIDBytes.join("");
}

module.exports = { generateTransactionID };
