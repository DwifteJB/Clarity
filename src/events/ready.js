/* eslint no-empty:0 */
const { SlashCommandLoader } = require("../lib/loader");

module.exports = async (client) => {
  try {
    console.log(
      `Logged in as ${client.user.tag}\nIn ${client.guilds.cache.size} servers w/ ${client.users.cache.size} members`
    );
    // load slash commands
    new SlashCommandLoader(client).Load();

    client.emit("updatePresence");
    setInterval(() => {
      client.emit("updatePresence");
    }, 30000);
  } catch (err) {}
};
