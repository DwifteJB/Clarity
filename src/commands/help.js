const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Display help for the bot.")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild
    ),
  async execute(Client, interaction) {
    return interaction.reply({ content: "yo", ephemeral: true });
  },
};
