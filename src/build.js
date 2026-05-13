const { Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { REST } = require("@discordjs/rest");

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    commands.push(command.data.toJSON());
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
    );
  }
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

rest
  .put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
