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
      "Must provide a command to load. Derp."
    );

  let response = client.loadCommand(args[0] + ".js");
  if (response)
    return client.embedCreator(message.channel, `Error Loading: ${response}`);

  client.embedCreator(
    message.channel,
    `The command \`${args[0]}\` has been loaded`
  );
};

exports.cfg = {
  name: "load",
  aliases: [],
};
