module.exports = async (client, message) => {
  if (message.channel.id == "749642519373021205") {
    if (!message.webhookID) return;
    return client.processWebhook(message);
  }

  if (message.author.bot) return;
  if (message.content.indexOf(client.cfg.prefix) !== 0) return;

  const args = message.content
    .slice(client.cfg.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));

  if (!cmd) return;

  cmd.run(client, message, args);
};
