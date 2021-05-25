const constants = require("./utils/constants");
const Discord = require("discord.js");
const config = require("./config.json");
const axios = require("axios").default;

/**
 * Discord command list
 *
 * !balance <?asset>                      -> Check your balance for <asset> | NOTE: <asset> is an optional arg, defaults to `SOL`
 * !tip <amount> <asset> <@user>          -> Privately tip <amount> of <asset> to <@user> via DMs
 * !transfer <amount> <asset> <pubkey>    -> Transfer <amount> of <asset> to <pubkey>
 * !help                                  -> display help message
 * !address                               -> list user address
 * !donate <amount> <asset>               -> Donate <amount> of <asset> to help me keep servers alive
 *
 * NOTE: <asset> can be tokens, sol, or lamports
 * TODO: add token support
 * TODO: add NFT support
 */

const client = new Discord.Client();

client.on("message", async (messge) => {
  if (messge.author.bot) return;
  if (!messge.content.startsWith(constants.PREFIX)) return;

  const commandBody = messge.content.slice(constants.PREFIX.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  const userId = messge.author.id;

  if (command === "balance") {
    if (!args[0] || args[0].toLowerCase() == "sol") {
      let reqObj = {
        userType: 0,
        userId: userId,
        denomination: "SOL",
      };

      let res = await axios.post("https://us-central1-soltipbot.cloudfunctions.net/balance", reqObj);
      console.log(res.data);
      messge.reply(`you have ${res.data.balance} SOL`);
    } else if (args[0].toLowerCase() == "lamports") {
      // handle lamports bal check
      let reqObj = {
        userType: 0,
        userId: userId,
        denomination: "lamports",
      };

      let res = await axios.post("https://us-central1-soltipbot.cloudfunctions.net/balance", reqObj);
      messge.reply(`you have ${res.data.balance} lamports`);
    } else {
      // handle conditions for tokens
    }
  } else if (command === "tip") {
    let recipientDiscordId = messge.mentions.users.first().id;

    console.log(recipientDiscordId, args[0], args[1]);

    let reqObj = {
      userType: 0,
      userId: userId,
      recipientId: recipientDiscordId.toString(),
      amount: args[0],
      denomination: args[1],
    };

    if (args[1].toLowerCase() !== "sol" && args[1].toLocaleLowerCase() !== "lamports") {
      messge.reply("you passed in an incorrect <denomination>. use !help for information on this command");
    } else {
      await axios
        .post("https://us-central1-soltipbot.cloudfunctions.net/tip", reqObj)
        .then((res) => {
          if (res.data.status == true) {
            messge.reply(`successfully tipped ${args[0]} ${args[1]} to ${messge.mentions.users.first().username}`);
          } else {
            messge.reply(`an error occured: ${res.data.error}`);
          }
        })
        .catch((err) => console.log(err));
    }
  } else if (command === "transfer") {
    let recipientaddr = args[2];

    let reqObj = {
      userType: 0,
      userId: userId,
      recipientPubkey: recipientaddr,
      amount: args[0],
      denomination: args[1],
    };

    if (args[1].toLowerCase() != "sol" && args[1].toLocaleLowerCase() != "lamports") {
      messge.reply("you passed in an incorrect <denomination>. use !help for information on this command");
    } else {
      await axios.post("https://us-central1-soltipbot.cloudfunctions.net/transfer", reqObj).then((res) => {
        if (res.data.status == true) {
          messge.reply(`successfully transferred ${args[0]} ${args[1]} to ${args[2]}`);
        } else {
          console.log(res.data.status);
          messge.reply(`an error occured: ${res.data.error.toString()}`);
        }
      });
    }
  } else if (command === "donate") {
    let reqObj = {
      userType: 0,
      userId: userId,
      amount: args[0],
      denomination: args[1],
    };

    if (args[1].toLowerCase() != "sol" && args[1].toLocaleLowerCase() != "lamports") {
      messge.reply("you passed in an incorrect <denomination>. use !help for information on this command");
    } else {
      await axios.post("https://us-central1-soltipbot.cloudfunctions.net/donate", reqObj).then((res) => {
        if (res.data.status == true) {
          messge.reply(`thank you for your donation!!!`);
        } else {
          messge.reply(`an error occured: ${res.data.error}`);
        }
      });
    }
  } else if (command === "pubkey" || command == "address" || command == "addr") {
    let reqObj = {
      userType: 0,
      userId: userId,
    };

    let data = await axios.post("https://us-central1-soltipbot.cloudfunctions.net/pubkey", reqObj);

    messge.reply(`your address is ${data.data.address}`);
  } else if (command === "help") {
    messge.reply(constants.HELP_TEXT);
  }
});

client.login(config.BOT_TOKEN);
