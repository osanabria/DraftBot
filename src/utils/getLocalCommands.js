const path = require("path");
const getAllFiles = require("./getAllFiles");

module.exports = (exceptions = []) => {
  const ignoredCommands = Array.isArray(exceptions) ? exceptions : [exceptions];
  const localCommands = [];
  const commandCategories = getAllFiles(
    path.join(__dirname, "..", "commands"),
    true,
  );
  for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory).filter((file) =>
      file.endsWith(".js"),
    );

    for (const commandFile of commandFiles) {
      const commandObject = require(commandFile);
      if (ignoredCommands.includes(commandObject.name)) continue;
      localCommands.push(commandObject);
    }
  }

  return localCommands;
};
