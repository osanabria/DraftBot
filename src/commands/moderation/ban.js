module.exports = {
  name: "ping",
  description: "ping command",
  // devOnly:true,
  //testOnly:true,
  //options":[],

  callback: (client, interaction) => {
    interaction.reply(`pong ${client.ws.ping} ms!`);
  },
};
