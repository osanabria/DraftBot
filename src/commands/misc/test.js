const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("test")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
