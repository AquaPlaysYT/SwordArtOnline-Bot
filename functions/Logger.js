var log4js = require("log4js");
log4js.configure({
  appenders: {
    out: {
      type: "stdout",
      layout: {
        type: "pattern",
        pattern: "%[[%d{yyyy-MM-dd] [hh.mm.ss]} [%p]%] %m%n",
      },
    },
  },
  categories: { default: { appenders: ["out"], level: "info" } },
});
var logger = log4js.getLogger("Sana");

module.exports = logger;
