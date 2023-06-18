const Discord = require("discord.js");

module.exports = async (client) => {
  let random = Math.floor(Math.random() * 2);
  let toDisplay;
  switch (random) {
    case 0:
      toDisplay = client.users.cache.size;
      client.user.setPresence({
        activities: [
          {
            name: `${toDisplay} members!`,
            type: Discord.ActivityType.Watching,
          },
        ],
      });
      break;
    case 1:
      toDisplay = client.guilds.cache.size;
      client.user.setPresence({
        activities: [
          {
            name: `${toDisplay} servers!`,
            type: Discord.ActivityType.Watching,
          },
        ],
      });
      break;
    default:
      break;
  }
};
