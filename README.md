# rocketchat-bot
Simple Rocket.Chat bot

## Requirements

A Bot in your Rocket.Chat Instance. Add a new user via the Administration Panel with `username`, `password` and `bot` role.
If you are enforcing OTP / 2FA you need to create an access token for the created bot-user

## Setup

```sh
git clone https://github.com/rabalyn/rocketchat-bot.git
cd rocketchat-bot
npm install
cp .env.sample .env
# modify the .env (botusername, instance-url, password /access token
npm run start OR npm run start:dev
```



By default the Bot is listening in #general. Available commands via `!help`
