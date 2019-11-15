const request = require('request');
const api = 'https://api.clickup.com/api/v2/';
const { clickToken } = require('../auth.json');

exports.apiReq = function(method, url, callback) {
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
