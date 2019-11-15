const request = require('./request.js');

module.exports = {
  name: 'teams',
  description: 'sends current team',
  execute(message, args) {
    // print what team the bot is in (should be CircuitRunners all the time)
    request.apiReq('GET', 'team', body => {
      message.channel.send(`You are in the ${body.teams[0].name} team!`);
    })
  },
}
