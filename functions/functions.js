const mysql = require("mysql");
const Discord = require("discord.js");
module.exports = (client) => {
  client.embedCreator = (channel, message, thumbnailImage) => {
    try {
      if (!thumbnailImage.length) thumbnailImage = null;
    } catch (e) {
      thumbnailImage = null;
    }

    const embedCreated = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(
        "Aquatic Support",
        client.user.avatarURL(),
        "https://aquaticdevelopment.xyz/"
      )
      .setDescription(message)
      .setThumbnail(thumbnailImage)
      .setTimestamp()
      .setFooter("Made by Syfe and Aqua", client.user.avatarURL());

    channel.send(embedCreated);
  };

  client.checkDays = (date) => {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
  };

  client.random = (amount) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;

    for (var i = 0; i < amount; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise") text = await text;
    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 1 });

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(
        client.token,
        "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0"
      );

    return text;
  };

  client.loadCommand = (commandName) => {
    try {
      client.logger.debug(`Loading Command: ${commandName}`);
      const props = require(`../commands/${commandName}`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(props.cfg.name, props);
      props.cfg.aliases.forEach((alias) => {
        client.aliases.set(alias, props.cfg.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  client.unloadCommand = async (commandName) => {
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command)
      return `The command \`${commandName}\` doesn\'t seem to exist, nor is it an alias. Try again!`;

    if (command.shutdown) {
      await command.shutdown(client);
    }
    const mod =
      require.cache[require.resolve(`../commands/${command.cfg.name}`)];
    delete require.cache[require.resolve(`../commands/${command.cfg.name}.js`)];
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }
    return false;
  };

  client.sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  client.randomInt = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  Object.defineProperty(String.prototype, "toProperCase", {
    value: function () {
      return this.replace(
        /([^\W_]+[^\s-]*) */g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    },
  });
};
