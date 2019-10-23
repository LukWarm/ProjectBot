var bodyParser = require('body-parser');
var express = require('express');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res) {
  console.log(req.query);
  res.send('Secret area');
});

app.listen(3000, () => {
  console.log('Listening on port 3000')
});
