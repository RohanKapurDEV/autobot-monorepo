const constants = require("./utils/constants");
const { db } = require("./utils/admin");
const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

client.on("message", async (messge) => {
  if (messge.author.bot) return;
  if (!messge.content.startsWith(constants.PREFIX)) return;

  const commandBody = messge.content.slice(constants.PREFIX.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  const userId = messge.author.id;

  if (command === "balance") {
    // get user balance
  } else if (command === "tip") {
    // handle tip
    let recipientId = messge.mentions.users.first().id;
  } else if (command === "transfer") {
    // handle transfer
  } else if (command === "donate") {
    // handle donate
  } else if (command === "id") {
    messge.reply(messge.author.id);
  } else if (command === "pubkey" || command == "address" || command == "addr") {
    // handle address retrival
  } else if (command === "help") {
    messge.reply(constants.HELP_TEXT);
  }
});

client.login(config.BOT_TOKEN);
