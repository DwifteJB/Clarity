const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("generate")
    .setDescription("TEMP | GENERATES MESSAGE")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild
    ),
  async execute(Client, interaction) {
    const Embed = new EmbedBuilder()
      .setTitle("Clarity: Limiteds Middleman Service")
      .setColor(4153766)
      .addFields(
        {
          name: "💳 Fees",
          value:
            "$3 Flat price  - Buy MM Passes for a discount in <#1124734047185281166>",
        },
        {
          name: "💰 Fee Payment Methods",
          value: "Stripe, Cashapp, Bitcoin, Ethereum, Litecoin",
        },
        {
          name: "❓ How does it work?",
          value:
            "Press the 'Create Middleman Ticket' button below to create a ticket. The following will happen within the ticket.\n\n* Tell the bot who you're dealing with\n* Specify whether you are buying or selling the item\n* If you are buying, then specify the payment method or use \"other\"\n* Cover the service fee with a pass or through one of our payment methods.\n* Seller sends the trade to one of our ROBLOX Middleman accounts\n* Bot will check if the trade has gone through and confirm the sellers items.\n* Buyer sends the specified currency to the other person, then the seller can confirm the buyers items.\n* Items are released after confirmation.",
        },
        {
          name: "❔ How safe is this?",
          value:
            "While this system is new, if the bot goes down at all, its completely refreshed and all tickets remain as they should. If not, any errors are sent to owner and your ticket will be fixed free of charge.",
        }
      );

    const Button = new ButtonBuilder()
      .setCustomId("TICKET:LIMITEDS")
      .setLabel("Create Middleman Ticket")
      .setEmoji("<:DominusFormidulosus:1124736010874519654>")
      .setStyle("Success");

    const Row = new ActionRowBuilder().addComponents(Button);

    interaction.channel.send({
      embeds: [Embed],
      components: [Row],
    });

    return interaction.reply({ content: "Sent Embed!", ephemeral: true });
  },
};
