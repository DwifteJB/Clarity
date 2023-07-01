const { InteractionHandler } = require("../lib/loader");

const config = require("../../config.json");
const fs = require("fs");
const path = require("path");

const CreateTicketModules = {};
const TicketModulesPath = path.join(
  global.rootFolder,
  "src",
  "lib",
  "ticketOptions"
);

fs.readdirSync(path.join(TicketModulesPath)).forEach((file) => {
  try {
    const req = require(path.join(TicketModulesPath, file));
    CreateTicketModules[file.split(".")[0]] = req;
    console.log("load", file.split(".")[0]);
  } catch (e) {
    console.error(e);
  }
});

module.exports = async (Client, interaction) => {
  // COMMANDS!!
  if (interaction.isButton()) {
    console.log(interaction);
    const ButtonDetails = interaction.customId.split(":");

    if (ButtonDetails[0] == "TICKET") {
      console.log("TICKET");
      if (CreateTicketModules[ButtonDetails[1]]) {
        console.log("exists??");
      }
    }
  }

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
