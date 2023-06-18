const { InteractionHandler } = require("../lib/loader");

const config = require("../../config.json");

module.exports = async (Client, interaction) => {
  // COMMANDS!!
  if (!interaction.isChatInputCommand()) return;

  let IHandle = new InteractionHandler(Client, interaction);
  if (IHandle.command) {
    console.log(IHandle.command);
    if (Client.Timeouts[interaction.user.id] > Date.now()) {
      return interaction.reply({
        content: `You must wait ${
          (Client.Timeouts[interaction.user.id] - Date.now()) / 1000
        }s before executing another command.`,
        ephemeral: true,
      });
    }

    try {
      Client.Timeouts[interaction.user.id] =
        Date.now() + config.settings.commandTimeout * 1000;
      await IHandle.command.execute(Client, interaction);
    } catch (e) {
      console.error(e);
      return interaction.reply({
        content: `An error occured, it has been reported to the bot developers.`,
        ephemeral: true,
      });
    }
  }
};
