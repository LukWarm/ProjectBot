const Discord = require('discord.js');
const discordToken = require('./auth.json').discordToken;
const bot = new Discord.Client();
const sbodID = '636425993208332288';
const request = require('request');
const api = 'https://api.clickup.com/api/v2/'
const team_id = '2242564';
const clickToken = require('./auth.json').clickToken;
const prefix = '!';

bot.on('ready', () => {
  console.log('Bot is Online!');
})

bot.on('message', message => {
  let args = message.content.substring(prefix.length).split(" ");
  switch (args[0]) {
    case ('ping'):
      message.channel.send('Pong!');
      break;
    case ('spaces'):
      if (!args[1]) {
        request({
          method: 'GET',
          url: `${api}team/${team_id}/space?archived=false`,
          headers: {
            'Authorization': clickToken
          }}, function (error, response, body) {
            body = JSON.parse(body);
            console.log('Status:', response.statusCode);
            console.log('Response:', body);
            if (!body.spaces[0]) {
              message.channel.send('There are currently no active spaces.');
            } else {
              let msg = '';
              for ( i in body.spaces ) {
                i === 0 ? msg = `> ${body.spaces[i].name}\n` : msg = msg + `> ${body.spaces[i].name}\n`;
                console.log(msg);
              }
              message.channel.send(`Active Spaces: \n${msg}`);
            }
          });
      } else if (args[1] === 'archived') {
        request({
          method: 'GET',
          url: `${api}team/${team_id}/space?archived=true`,
          headers: {
            'Authorization': clickToken
          }}, function (error, response, body) {
            body = JSON.parse(body);
            console.log('Status:', response.statusCode);
            console.log('Response:', body);
            if (!body.spaces[0]) {
              message.channel.send('There are currently no archived spaces.');
            } else {
              let msg = '';
              for ( i in body.spaces ) {
                i === 0 ? msg = `> ${body.spaces[i].name}\n` : msg = msg + `> ${body.spaces[i].name}\n`;
                console.log(msg);
              }
              message.channel.send(`Archived Spaces: \n${msg}`);
            }
          });
      } else {
        message.channel.send('Incorrect arguments! Must be blank or archived.');
      }
      break;
    case ('teams'):
      request({
        method: 'GET',
        url: `${api}team`,
        headers: {
          'Authorization': clickToken
        }}, function (error, response, body) {
          body = JSON.parse(body);
          console.log('Status:', response.statusCode);
          console.log('Response: ', body);
          message.channel.send(`You are in the ${body.teams[0].name} team!`);
        });
      break;
  }
})

bot.login(discordToken);
