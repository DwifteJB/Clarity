require("dotenv").config();

const path = require("path");
global.rootFolder = path.resolve(__dirname);

const Database = require("./src/lib/database");
global.Database = Database.ConnectToDatabase();

module.exports = require("./src/client");
