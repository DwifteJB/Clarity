/*
        Loads anything the bot client needs.
*/
const path = require("path");
const fs = require("fs");
const Discord = require("discord.js");

class InteractionHandler {
  constructor(client, interaction) {
    this.client = client;
    this.interaction = interaction;
    this.command = this.client.commands.get(this.interaction.commandName);
    this.channel = this.interaction.channel;
    this.guild = this.interaction.guild;
    this.user = this.interaction.user;
    this.member = this.interaction.member;
  }
}

class Loader {
  constructor(client) {
    this.client = client;

    this.client.cooldowns = new Discord.Collection();

    this.client.commands = new Discord.Collection();
    const folder = fs
      .readdirSync(path.join(global.rootFolder, "bot", "src", "commands"))
      .filter((file) => file.endsWith(".js"));
    console.clear();
    console.log("Loading commands!");
    console.log("╭────────────────────┬──╮");

    for (const file of folder) {
      try {
        const command = require(path.join(
          global.rootFolder,
          "src",
          "commands",
          file
        ));
        const boxCmdName = `${command.data.name}`.padEnd(20);
        console.log(`│${boxCmdName}│✅│`);
        console.log("├────────────────────┼──┤");
        this.client.commands.set(command.data.name, command);
        this.client.cooldowns.set(command.data.name, new Discord.Collection());
      } catch (error) {
        const boxCmdName = `${file}`.padEnd(20);
        console.log(`│${boxCmdName}│❌│`);
        console.log(error);
      }
    }
    console.log("╰────────────────────┴──╯");

    fs.readdir(path.join(global.rootFolder, "src", "events"), (err, files) => {
      if (err) return console.error;
      for (const file of files) {
        if (!file.endsWith(".js")) return;
        const evt = require(path.join(
          global.rootFolder,
          "src",
          "events",
          file
        ));
        let evtName = file.split(".")[0];
        client.on(evtName, evt.bind(null, this.client));
      }
      console.log(`Loaded ${files.length} events`);
    });
  }
}

class SlashCommandLoader {
  constructor(client) {
    this.client = client;
    this.rest = new Discord.REST({ version: "10" }).setToken(this.client.token);
    this.commands = [];
    const folder = fs
      .readdirSync(path.join(global.rootFolder, "src", "commands"))
      .filter((file) => file.endsWith(".js"));
    for (const file of folder) {
      const command = require(path.join(
        global.rootFolder,
        "src",
        "commands",
        file
      ));
      if (command.data) {
        this.commands.push(command.data.toJSON());
      }
    }
  }
  async Load() {
    try {
      const data = await this.rest.put(
        Discord.Routes.applicationCommands(this.client.user.id),
        { body: this.commands }
      );

      this.client.slashCommandData = data;

      console.log(`Loaded ${data.length} slash commands`);
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = {
  Loader,
  SlashCommandLoader,
  InteractionHandler,
};