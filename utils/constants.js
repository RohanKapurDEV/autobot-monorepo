const PREFIX = "!";
const SUPPORTED_TOKENS = [
  {
    name: "Project Serum",
    symbol: "SRM",
  },
  {},
];

const HELP_TEXT =
  "here is the command list:\n\n`!balance` -> Check your SOL balance\n\n`!tip <amount> <denomination> <@user>` -> tip <amount> of SOL denominated in <denomination to <@user>\n\n`!transfer <amount> <denomination> <pubkey>` -> transfer <amount> of <denomination> to <pubkey>\n\n`!assets` -> Show a list of supported assets\n\n`!donate <amount> <denomination>` -> Donate <amount> of SOL in <denomination>\n\n`!help` -> Display this help text";

module.exports = { PREFIX, SUPPORTED_TOKENS, HELP_TEXT };

/**
 * Twitter command list
 *
 * ✅ /balance                               -> Check your balance for <asset>
 * /tip <amount> <asset> <@user>          -> Privately tip <amount> of <asset> to <@user> via DMs
 * /transfer <amount> <asset> <pubkey>    -> Transfer <amount> of <asset> to <pubkey>
 * ✅ /help                                -> display help message
 * ✅ /pubkey                                -> list user address
 * /donate <amount> <asset>               -> Donate <amount> of <asset> to help me keep servers alive
 *
 * NOTE: <asset> can be tokens, sol, or lamports
 */
