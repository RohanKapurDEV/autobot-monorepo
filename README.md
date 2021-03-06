![alt text](./frontend/autobotmoney/public/images/gradient.png "Logo Title Text 1")

# autobot.money - A Solana wallet service for Discord and Telegram

autobot.money allows users to store their SOL in an open-source custodial web wallet service that they can interface with either via Discord or Telegram.

This is not a defi protocol/app ☹️ but is a convenience service that should (in theory) make the interactions between people in Discord or Telegram chats more fun.

## Monorepo structure

`./discordBot.ts` - Main script that listens for instructions on Discord servers

`./telegramBot.ts` - Main script that listens for instructions on Telegram servers

`./cloud-functions` - Serverside processing of all instructions passed to the bots

`./frontend/autobotmoney` - Website code

---

## Discord commands

**NOTE: [denomination] can either be "SOL" or "lamports, adjust [amount] accordingly"**

`!autobot balance [denomination]?` - Retrieve your balance, [denomination] is an optional argument (?). It defaults to `SOL`

`!autobot address` - Retrieve your wallet's address

`!autobot tip [amount] [denomination] [@username]` - Tip [amount] of SOL denominated in [denomination] to [@username]

`!autobot transfer [amount] [denomination] [address]` - Transfer [amount] of SOL denominated in [denomination] to [address]

`!autobot donate [amount] [denomination]` - Donate [amount] of SOL denominated in [denomination] to me (only if you want to tho <3)

`!autobot help` - Display the command list
