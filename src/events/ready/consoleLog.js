module.exports = (client) => {
  console.log(
    `Logged in as ${client.user.tag} and ready to serve ${client.guilds.cache.size} guilds!`,
  );
};
