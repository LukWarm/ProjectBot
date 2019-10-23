var bodyParser = require('body-parser');
var express = require('express');
const request = require('request');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res) {
  const code = req.query.code;
  console.log(code);

  request({
    method: 'POST',
    url: `https://api.clickup.com/api/v2/oauth/token?client_id=Q9JXVN7585QPRWZLSU25PBN2NZSPIZBV&client_secret=TQ984136S6GWSDETIAFDOARPXREBJLPOKOR74QXB6FTS6UI0RSLGU7U7RG4DA34U&code=${code}`,
  }, function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
    res.send(body.access_token);
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000')
});
