module.exports = {
  name: "ping",
  description: "ping command",
  devOnly: true,
  //testOnly:true,
  //options":[],

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;
    interaction.editReply(`pong ${ping} ms!`);
  },
};
