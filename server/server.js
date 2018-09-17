var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(__dirname + '/public/dist'));
app.set('views', __dirname + '/public/dist');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


require('./routes/user')(app);
app.get('/*', function(req, res) {
   res.render('index.html');
   //res.sendFile(__dirname + '/public/index.html');
});
app.listen(3000);