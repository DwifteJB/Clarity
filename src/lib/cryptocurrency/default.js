const database = require("../database");
const webhookError = require("../webhookError");
const saveKeys = require("./lib/saveKeys");

const ErrorEmbed = {
  title: "Clarity ERROR -> Uploading wallet to database",
  color: 7545892,
  fields: [
    {
      name: "Wallet Address",
      value: "",
      inline: true,
    },
    {
      name: "Type",
      value: "",
      inline: true,
    },
    {
      name: "** **",
      value: "** **",
    },
    {
      name: "Public Key",
      value: "",
      inline: true,
    },
    {
      name: "Private Key",
      value: "",
      inline: true,
    },
  ],
};

class Default {
  constructor() {
    this.address = "";
    this.publicKey = "";
    this.privateKey = "";
    this.privateWif;
    this.Passphrase;
  }

  async generate() {
    throw new Error(
      "This is unused, and should be overwritten by child class."
    );
  }

  async saveKey() {
    console.log("add to db, save 2 file");
    if (!this.address || !this.publicKey || !this.privateKey) {
      throw new Error(
        "There is no address, public key, or private key to add to the database."
      );
    }

    const Connection = await database.ConnectToDatabase();

    let nonBufferPublicKey = this.publicKey;
    let nonBufferPrivateKey = this.privateKey;

    if (Buffer.isBuffer(this.publicKey)) {
      nonBufferPublicKey = this.publicKey.toString("hex");
    }

    if (Buffer.isBuffer(this.privateKey)) {
      nonBufferPrivateKey = this.privateKey.toString("hex");
    }

    Connection.query(
      `SELECT * FROM wallets WHERE Address = ? AND Type = ?`,
      [this.address, this.Type],
      async (err, results) => {
        if (err) {
          ErrorEmbed.fields[0].value = this.address;
          ErrorEmbed.fields[1].value = this.Type;
          ErrorEmbed.fields[3].value = nonBufferPublicKey;
          ErrorEmbed.fields[4].value = nonBufferPrivateKey;
          await webhookError(embed, err);
        }

        if (results[0]) {
          console.log(
            "this address was already added to the database? generate a new one...?"
          );

          try {
            this.generate();
            this.addToDatabase();
          } catch (err) {
            console.log(err);
          }
        } else {
          Connection.query(
            `INSERT INTO wallets (Address, TYPE, PublicKey, PrivateKey, PrivateWIF, Passphrase, Transactions) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              this.address,
              this.Type,
              nonBufferPublicKey,
              nonBufferPrivateKey,
              this.privateWif || "",
              this.Passphrase || "",
              "{}",
            ],
            async (err, res) => {
              if (err) {
                console.log(err);
                ErrorEmbed.fields[0].value = this.address;
                ErrorEmbed.fields[1].value = this.Type;
                ErrorEmbed.fields[3].value = this.publicKey.toString("hex");
                ErrorEmbed.fields[4].value = this.privateKey.toString("hex");
                await webhookError(ErrorEmbed, err.sqlMessage + " " + err.sql);
              }

              const files = {
                "address.txt": this.address,
                "privateKey.txt": nonBufferPrivateKey,
                "publicKey.txt": nonBufferPublicKey,
              };

              if (this.privateWif) {
                files["privateWif.txt"] = this.privateWif;
              }

              if (this.seed) {
                files["seed.txt"] = this.seed;
              }

              if (this.Passphrase) {
                files["passthrase.txt"] = this.Passphrase;
              }

              saveKeys(
                this.Type,
                require("crypto").randomBytes(32).toString("hex"),
                files
              );

              console.log("added to database");
            }
          );
        }
      }
    );
  }
}

module.exports = Default;
