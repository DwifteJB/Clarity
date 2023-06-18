/*
   Clarity
   Init
*/
const Discord = require("discord.js");
const config = require("../config");
const { Loader } = require("./lib/loader");

const Indt = new Discord.IntentsBitField().add(
  Discord.IntentsBitField.Flags.GuildMessages,
  Discord.IntentsBitField.Flags.GuildPresences,
  Discord.IntentsBitField.Flags.GuildMembers,
  Discord.IntentsBitField.Flags.Guilds,
  Discord.IntentsBitField.Flags.MessageContent
);

config.client.intents = Indt;
config.client.partials = [
  Discord.Partials.Message,
  Discord.Partials.Channel,
  Discord.Partials.Reaction,
];

const Client = new Discord.Client(config.client);

Client.updateTrees = [];
Client.slashCommandData = {};
Client.Timeouts = [];

Client.login(process.env.TOKEN);
new Loader(Client);

module.exports = Client;
