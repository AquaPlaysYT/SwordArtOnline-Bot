exports.run = async (client, message, args) => {
  if (
    !message.author.id === "190733468550823945" ||
    !message.author.id === "609101328752574492"
  )
    return client.embedCreator(
      message.channel,
      "You don't have perms to do this!"
    );
  const code = args.join(" ");
  try {
    const evaled = eval(code);
    const clean = await client.clean(client, evaled);
    client.embedCreator(message.channel, `\`\`\`js\n${clean}\n\`\`\``);
  } catch (err) {
    client.embedCreator(
      message.channel,
      `\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``
    );
  }
};

exports.cfg = {
  name: "eval",
  aliases: ["evaluate"],
};
