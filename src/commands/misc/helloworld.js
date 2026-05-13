const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("helloworld")
    .setDescription("HI"),
  async execute(interaction) {
    await interaction.reply("HELLO WORLD!");
  },
};
