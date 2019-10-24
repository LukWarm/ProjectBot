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
// wait until bot is ready to start accepting commands

bot.on('message', message => {
  let args = message.content.substring(prefix.length).split(" ");
  // split message that contains prefix into arguments by spacing,
  // and putting them into an array
  switch (args[0]) {
    case ('ping'):
      // basic connection test
      message.channel.send('Pong!');
      break;
    case ('spaces'):
      // find and print spaces
      // usage: !spaces (blank : archived)
      if (!args[1]) {
        // if no second argument (not archived)
        request({
          method: 'GET',
          url: `${api}team/${team_id}/space?archived=false`,
          headers: {
            'Authorization': clickToken
          }}, function (error, response, body) {
            body = JSON.parse(body);
            if (!body.spaces[0]) {
              message.channel.send('There are currently no active spaces.');
              // if no items in array, no active spaces
            } else {
              let msg = '';
              for ( i in body.spaces ) {
                i === 0 ? msg = `> ${body.spaces[i].name}\n` : msg = msg + `> ${body.spaces[i].name}\n`;
                // for each item in array,
                // add to message with blockqoute and line break
              }
              message.channel.send(`Active Spaces: \n${msg}`);
            }
          });
      } else if (args[1] === 'archived') {
        // if looking for archived spaces
        request({
          method: 'GET',
          url: `${api}team/${team_id}/space?archived=true`,
          headers: {
            'Authorization': clickToken
          }}, function (error, response, body) {
            body = JSON.parse(body);
            if (!body.spaces[0]) {
              message.channel.send('There are currently no archived spaces.');
              // if no items in array, no archived spaces
            } else {
              let msg = '';
              for ( i in body.spaces ) {
                i === 0 ? msg = `> ${body.spaces[i].name}\n` : msg = msg + `> ${body.spaces[i].name}\n`;
                // for each item in array,
                // add to message with blockqoute and line break
              }
              message.channel.send(`Archived Spaces: \n${msg}`);
            }
          });
      } else {
        message.channel.send('Incorrect arguments! Must be blank or archived.');
      }
      break;
    case ('teams'):
      // print what team the bot is in (should be CircuitRunners all the time)
      request({
        method: 'GET',
        url: `${api}team`,
        headers: {
          'Authorization': clickToken
        }}, function (error, response, body) {
          body = JSON.parse(body);
          message.channel.send(`You are in the ${body.teams[0].name} team!`);
        });
      break;
    case ('folders'):
      // find and print folders for a specific space
      break;
  }
})

bot.login(discordToken);
// login to discord using bot token
