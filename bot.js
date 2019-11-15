const Discord = require('discord.js');
const bot = new Discord.Client();

const fs = require('fs');
const { discordToken, clickToken } = require('./auth.json');
const { prefix, team_id } = require('./config.json');

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

bot.on('ready', () => {
  console.log('Bot is Online!');
})
// wait until bot is ready to start accepting commands

bot.on('message', message => {
  let args = message.content.substring(prefix.length).split(" ");
  // split message that contains prefix into arguments by spacing,
  // and putting them into an array
  const commandName = args.shift().toLowerCase();
  if (!bot.commands.has(commandName)) return;
  const command = bot.commands.get(commandName);
  try {
    command.execute(message, args);
  } catch (error) {
  	console.error(error);
  	message.reply('there was an error trying to execute that command!');
  }
})

bot.login(discordToken);
// login to discord using bot token
