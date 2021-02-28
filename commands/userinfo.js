const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  const user =
    message.mentions.users.first() ||
    client.users.cache.find((user) => user.username === args[0]) ||
    client.users.cache.get(args[0]) ||
    message.author;

  const uPres = user.presence;

  const gUser = message.guild.member(user);

  let statuses = {
    online: "<:online:749949205363032094> Online",
    dnd: "<:dnd:749949205388460112> Do Not Disturb",
    offline: "<:offline:749949205593980948> Offline",
    idle: "<:idle:749949205170356265> Away",
  };

  let perms = gUser.permissions.toArray();
  let permsToAllow = [
    "ADMINISTRATOR",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "MANAGE_MESSAGES",
    "MENTION_EVERYONE",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
  ];
  let permsToDisplay = [];

  perms.forEach((perm) => {
    if (permsToAllow.includes(perm)) {
      permsToDisplay.push(perm.replace("_", " ").toProperCase());
    }
  });

  const embedCreated = new Discord.MessageEmbed()
    .setTitle(`User Info for ${user.tag}`)
    .addField("User", `${user.toString()} (ID: ${user.id})`)
    .addField("Nickname", `${gUser.nickname || "None"}`)
    .addField("Status", statuses[uPres.status])
    .addField("Perm(s)", `${permsToDisplay.join(", ") || "None"}`)
    .addField("Created at", `${user.createdAt}`, true)
    .addField("Joined at", `${gUser.joinedAt}`, true)
    .setThumbnail(user.avatarURL({ format: "png", dynamic: true }))
    .setTimestamp()
    .setFooter("Made by Syfe and Aqua", client.user.avatarURL());

  message.channel.send(embedCreated);
};

exports.cfg = {
  name: "userinfo",
  aliases: ["whois", "who"],
};
