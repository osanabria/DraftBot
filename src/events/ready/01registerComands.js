const { testServer } = require("../../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

const normalizeCommand = (command) => {
  if (command?.data?.toJSON) {
    const { name, description, options } = command.data.toJSON();
    return {
      name,
      description,
      options,
      deleted: Boolean(command.deleted),
    };
  }

  return {
    name: command?.name,
    description: command?.description,
    options: command?.options,
    deleted: Boolean(command?.deleted),
  };
};

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands().map(normalizeCommand);
    const applicationCommands = await getApplicationCommands(
      client,
      testServer,
    );
    const fetchedCommands = await applicationCommands.fetch();

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      if (!name) {
        console.warn("Skipping command because it is missing a name.");
        continue;
      }

      if (!description) {
        console.warn(
          `Skipping command \"${name}\" because it is missing a description.`,
        );
        continue;
      }

      const existingCommand = fetchedCommands.find((cmd) => cmd.name === name);

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`Deleted command ${name}`);
          continue;
        }
        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });
          console.log(`Updated command ${name}`);
        }

        continue;
      }

      if (localCommand.deleted) {
        console.log(
          `Command ${name} is marked as deleted but does not exist in application commands.`,
        );
        continue;
      }

      await applicationCommands.create({
        name,
        description,
        options,
      });
      console.log(`Created command ${name}`);
    }
  } catch (error) {
    console.error("Error registering commands:", error);
  }
};
