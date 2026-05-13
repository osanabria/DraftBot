const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("embed")
    .setDescription("Sends an embed message"),
  async execute(interaction) {
    const embed = new discord.EmbedBuilder()
      .setTitle("Sample Embed")
      .setDescription("This is a sample embed message.")
      .setTimestamp()
      .setColor(0x00ff00);
    await interaction.reply({ embeds: [embed] });
  },
};
