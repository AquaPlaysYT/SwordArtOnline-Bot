// Imports and Discord.JS
const Discord = require("discord.js");
const client = new Discord.Client();

const Enmap = require("enmap");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const logger = require("./functions/Logger");

// Bot Requirements
client.commands = new Enmap();
client.aliases = new Enmap();

client.cfg = require("./config.json");
client.logger = require("./functions/Logger");
require("./functions/functions")(client);

// Logger Logic
switch (client.cfg.loglevel) {
  case "debug":
    logger.level = "debug";
    logger.debug("Started in Debug Mode.");
    break;
  default:
    logger.level = "info";
    break;
}

const init = async () => {
  const cmdFiles = await readdir("./commands/");
  client.logger.debug(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach((f) => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  const evtFiles = await readdir("./events/");
  client.logger.debug(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach((file) => {
    const eventName = file.split(".")[0];
    client.logger.debug(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });

  client.login(client.cfg.token);
};

init();
