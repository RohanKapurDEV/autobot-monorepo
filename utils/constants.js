const PREFIX = "!";
const SUPPORTED_TOKENS = [
  {
    name: "Project Serum",
    symbol: "SRM",
  },
  {},
];

const HELP_TEXT =
  "here is the command list:\n\n`!balance <denomination>` -> Check your SOL balance\n\n`!tip <amount> <denomination> <@user>` -> tip <amount> of SOL denominated in <denomination> to <@user>\n\n`!transfer <amount> <denomination> <pubkey>` -> transfer <amount> of SOL denominated in <denomination> to <pubkey>\n\n`!donate <amount> <denomination>` -> Donate <amount> of SOL in <denomination> to feed the dev\n\n`!help` -> Display this help text";

module.exports = { PREFIX, SUPPORTED_TOKENS, HELP_TEXT };
