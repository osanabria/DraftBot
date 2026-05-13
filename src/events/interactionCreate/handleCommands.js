const { MessageFlags } = require("discord.js");
const { devs, testServer } = require("../../../config");
const getLocalCommands = require("../../utils/getLocalCommands");
module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const localCommand = getLocalCommands();

  try {
    const commandObject = localCommand.find(
      (cmd) => cmd.name === interaction.commandName,
    );
    if (!commandObject) {
      return;
    }
    if (!devs.includes(interaction.member.id)) {
      interaction.reply({
        content: "You are not allowed to use this command.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }
    if (commandObject.testOnly) {
      if (interaction.guildId !== testServer) {
        interaction.reply({
          content: "You are not allowed to use this command.",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }
    }
    if (commandObject.permissionsRequired?.length) {
      for (const perm of commandObject.permisionsRequired) {
        if (!interaction.member.permissions.has(perm)) {
          interaction.reply({
            content: "You are missing the permission " + perm,
            flags: MessageFlags.Ephemeral,
          });
          break;
        }
      }
    }
    if (commandObject.botPermissions?.length) {
      for (const perm of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(perm)) {
          interaction.reply({
            content: "I am missing the permission " + perm,
            flags: MessageFlags.Ephemeral,
          });
          break;
        }
      }
    }

    if (typeof commandObject.callback === "function") {
      await commandObject.callback(client, interaction);
    }
  } catch (error) {
    console.error("Error executing command:", error);
  }
};
