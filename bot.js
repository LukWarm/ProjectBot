const Discord = require('discord.js');
const auth = require('./auth.json');
const token = auth.token;
const bot = new Discord.Client();
const sbodID = '636425993208332288';
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xhr = new XMLHttpRequest();
const api = 'https://api.clickup.com/api/v2/'
const access_token = '';
const prefix = '!';

bot.on('ready', () => {
  console.log('Bot is Online!');
})

bot.on('message', message => {
  let args = message.content.substring(prefix.length).split(" ");
  switch (args[0]) {
    case ('auth'):
      if (message.member.roles.has(sbodID)) {
        message.channel.send('Auth URL https://app.clickup.com/api?client_id=Q9JXVN7585QPRWZLSU25PBN2NZSPIZBV&redirect_uri=https://discord.gg/');
      } else {
        message.channel.send('You do not have the proper role for this command!');
      }
      break;
    case ('ping'):
      message.channel.send('Pong!');
      break;
    case ('team'):
      xhr.open('POST', `${api}team`)
      xhr.setRequestHeader('Authorization', access_token);
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          console.log('Status:', this.status);
          console.log('Headers:', this.getAllResponseHeaders());
          console.log('Body:', this.responseText);
          message.channel.send(this.responseText.name);
        }
      };
      xhr.send();
    break;
  }
})

bot.login(token);
