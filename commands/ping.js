exports.run = async (client, message, args) => {
  const msg = await message.channel.send(`🏓 Pinging....`);

  msg.edit(`🏓 Pong!
    Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms
    API Latency is ${Math.round(client.ws.ping)}ms`);
};

exports.cfg = {
  name: "ping",
  aliases: [],
};
