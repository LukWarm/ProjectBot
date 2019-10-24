const Discord = require('discord.js');
const bot = new Discord.Client();

const discordToken = require('./auth.json').discordToken;
const clickToken = require('./auth.json').clickToken;
const request = require('request');
const nodeCache = require('node-cache');
const cache = new nodeCache();

const api = 'https://api.clickup.com/api/v2/'
const prefix = '!';

bot.on('ready', () => {
  console.log('Bot is Online!');
})
// wait until bot is ready to start accepting commands

function apiReq(method, url, callback) {
  // simplify clickUp API Request into reusable function
  // uses xmlHttpRequest method, addon url, and takes a callback
  request({
    method: method,
    url: api + url,
    headers: {
      'Authorization': clickToken
    }
  }, (error, response, body) => {
    body = JSON.parse(body);
    callback(body);
  })
}

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
        apiReq('GET', `team/${team_id}/space?archived=false`, body => {
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
        })
      } else if (args[1] === 'archived') {
        // if looking for archived spaces
        apiReq('GET', `team/${team_id}/space?archived=true`, body => {
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
        })
      } else {
        message.channel.send('Incorrect arguments! Must be blank or archived.');
      }
      break;
    case ('teams'):
      // print what team the bot is in (should be CircuitRunners all the time)
      apiReq('GET', 'team', body => {
        message.channel.send(`You are in the ${body.teams[0].name} team!`);
      })
      break;
    case ('folders'):
      // find and print folders for a specific space
      break;
  }
})

bot.login(discordToken);
// login to discord using bot token
