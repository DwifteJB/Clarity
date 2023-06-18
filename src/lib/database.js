const mysql = require("mysql2");

let connection;

async function ConnectToDatabase() {
  if (connection != undefined) {
    return connection;
  }
  connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database!");

    connection.query(`CREATE DATABASE IF NOT EXISTS clarity_dev`);
    connection.query(
      `CREATE TABLE IF NOT EXISTS transactions (ID VARCHAR(10), AMOUNT BIGINT, FEE BIGINT, PAYMENT_METHOD VARCHAR(255), Payer VARCHAR(255), Recipient VARCHAR(255), STATUS VARCHAR(255), PaymentDetails JSON, PayerDetails JSON, RecipientDetails JSON, isHidden BOOL)`
    );
    connection.query(
      `CREATE TABLE IF NOT EXISTS userdata (DiscordID BIGINT, RobloxAccounts JSON, Reputation JSON, Vouches BIGINT, Transactions JSON, MiddlemanPasses JSON, isHidden BOOL)`
    );
    return connection;
  });
}

async function createUserData(userId) {
  if (connection != undefined) {
    connection = await ConnectToDatabase();
  }

  const duplicateCheck = `SELECT * FROM userdata WHERE member_id = ?`;

  connection.query(duplicateCheck, [userId], async (err, results) => {
    if (err) throw err;
    if (results[0]) {
      return false;
    } else {
      const insertQuery = `INSERT INTO userdata (member_id, balance, waterings) 
            VALUES (?, ?, ?);`;

      connection.query(insertQuery, [userId, "{}", "{}"], async (err) => {
        if (err) throw err;
        return true;
      });
    }
  });
}
module.exports = { ConnectToDatabase, createUserData };
