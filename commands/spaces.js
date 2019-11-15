const request = require('./request.js');
const team_id = '2242564';

module.exports = {
  name: 'spaces',
  description: 'sends current spaces, specify if archived',
  execute(message, args) {
    // find and print spaces
    // usage: !spaces (blank : archived)
    if (!args[1]) {
      // if no second argument (not archived)
      request.apiReq('GET', `team/${team_id}/space?archived=false`, body => {
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
          console.log(body);
          message.channel.send(`Active Spaces: \n${msg}`);
        }
      })
    } else if (args[1] === 'archived') {
      // if looking for archived spaces
      request.apiReq('GET', `team/${team_id}/space?archived=true`, body => {
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
  }
}
