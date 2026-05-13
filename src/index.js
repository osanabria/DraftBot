const discord = require("discord.js");

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const eventHandler = require("./handlers/eventHandler");
const client = new discord.Client({
  intents: [
    discord.GatewayIntentBits.Guilds,
    discord.GatewayIntentBits.GuildMessages,
    discord.GatewayIntentBits.MessageContent,
  ],
});

eventHandler(client);

client.login(process.env.DISCORD_TOKEN);
// const client = new discord.Client({
//   intents: [
//     discord.GatewayIntentBits.Guilds,
//     discord.GatewayIntentBits.GuildMessages,
//     discord.GatewayIntentBits.MessageContent,
//   ],
// });
// require("dotenv").config();

// client.once("clientReady", () => {
//   console.log("Logged in as " + client.user.tag);
// });

// client.commands = new discord.Collection();
// const commandsPath = path.join(__dirname, "commands");
// const commandFiles = fs
//   .readdirSync(commandsPath)
//   .filter((file) => file.endsWith(".js"));
// for (const file of commandFiles) {
//   const filePath = path.join(commandsPath, file);
//   const command = require(filePath);
//   if ("data" in command && "execute" in command) {
//     client.commands.set(command.data.name, command);
//   }
// }

// client.on("interactionCreate", async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;
//   const command = client.commands.get(interaction.commandName);
//   if (!command) return;
//   try {
//     await command.execute(interaction);
//   } catch (error) {
//     console.error(error);
//     await interaction.reply({
//       content: "There was an error while executing this command!",
//       ephemeral: true,
//     });
//   }
// });
