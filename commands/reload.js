exports.run = async (client, message, args) => {
  if (
    !message.author.id === "190733468550823945" ||
    !message.author.id === "609101328752574492"
  )
    return client.embedCreator(
      message.channel,
      "You don't have perms to do this!"
    );
  if (!args || args.length < 1)
    return client.embedCreator(
      message.channel,
      "Must provide a command to reload. Derp."
    );
  const command =
    client.commands.get(args[0]) ||
    client.commands.get(client.aliases.get(args[0]));
  let response = await client.unloadCommand(args[0]);
  if (response)
    return client.embedCreator(message.channel, `Error Unloading: ${response}`);

  response = client.loadCommand(command.cfg.name);
  if (response)
    return client.embedCreator(message.channel, `Error Loading: ${response}`);

  client.embedCreator(
    message.channel,
    `The command \`${command.cfg.name}\` has been reloaded`
  );
};

exports.cfg = {
  name: "reload",
  aliases: [],
};
