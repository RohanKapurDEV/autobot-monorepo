# autobot.money - A Solana wallet service for Discord and Telegram

autobot.money allows users to store their SOL in an open-source custodial web wallet service that they can interface with either via Discord or Telegram.

This is not a defi protocol/app ☹️ but is a convenience service that should (in theory) make the interactions between people in Discord or Telegram chats more fun. Everyone loves a community that isn't afraid to share wealth with each other and that's the kind of community Solana should be building anyway.

## A brief overview of the service

`./discordBot.ts` - Main script that listens for instructions on Discord servers

`./telegramBot.ts` - Main script that listens for instructions on Telegram servers

`./cloud-functions` - Serverside processing of all instructions passed to the bots

`./frontend/autobotmoney` - Website code
