const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  const embedCreated = new Discord.MessageEmbed()
    .setTitle(`What is my purpose?`)
    .setDescription("My purpose is to regulate, monitor and change the world of **Sword Art Online**.")
    .addField("Features", "There are many features to my system which allows you to fight, trade, battle and level up your unique or rare characters!")
    .setTimestamp()
    .setFooter("Made by Syfe and Aqua", client.user.avatarURL());

  message.channel.send(embedCreated);
};

exports.cfg = {
  name: "info",
  aliases: [],
};
