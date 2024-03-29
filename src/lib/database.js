const mysql = require("mysql2");

let connection;

async function ConnectToDatabase() {
  if (connection != undefined) {
    return connection;
  }

  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
  });
  /* eslint-disable no-undef, no-async-promise-executor */
  return await new Promise(async (resolve) => {
    await connection.connect((err) => {
      if (err) throw err;
      connection.query(`CREATE DATABASE IF NOT EXISTS clarity_dev`);
      connection.query(
        `CREATE TABLE IF NOT EXISTS transactions (ID VARCHAR(10), STATUS VARCHAR(255), DISCORD_CHANNEL VARCHAR(255), AMOUNT BIGINT, FEE BIGINT, PAYMENT_METHOD VARCHAR(255), Payer VARCHAR(255), Recipient VARCHAR(255), PaymentDetails JSON, PayerDetails JSON, RecipientDetails JSON, isHidden BOOL)`
      );
      connection.query(
        `CREATE TABLE IF NOT EXISTS userdata (DiscordID BIGINT, RobloxAccounts JSON, Reputation JSON, Vouches JSON, Transactions JSON, MiddlemanPasses JSON, isHidden BOOL)`
      );
      connection.query(
        `CREATE TABLE IF NOT EXISTS wallets (Address VARCHAR(100), TYPE VARCHAR(20), PublicKey LONGTEXT, PrivateKey LONGTEXT, PrivateWIF LONGTEXT, Passphrase LONGTEXT, Transactions JSON)`
      );

      console.log("Connected to MySQL database!");

      resolve(connection);
    });
  });
}

async function createUserData(userId) {
  if (connection != undefined) {
    connection = await ConnectToDatabase();
  }

  const duplicateCheck = `SELECT * FROM userdata WHERE DiscordID = ?`;

  connection.query(duplicateCheck, [userId], async (err, results) => {
    if (err) throw err;
    if (results[0]) {
      return false;
    } else {
      const insertQuery = `INSERT INTO userdata (DiscordID BIGINT, RobloxAccounts JSON, Reputation JSON, Vouches JSON, Transactions JSON, MiddlemanPasses JSON, isHidden BOOL) 
            VALUES (?, ?, ?);`;

      connection.query(
        insertQuery,
        [userId, "{}", "{}", "{}", "{}", "{}", false],
        async (err) => {
          if (err) throw err;
          return true;
        }
      );
    }
  });
}
module.exports = { ConnectToDatabase, createUserData };
