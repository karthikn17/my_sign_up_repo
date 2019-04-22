var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var Request = require("request");
 
// Running Server Details.
var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at %s:%s Port", host, port)
});
 
 
app.get('/form', function (req, res) {
  var html='';
  html +="<body>";
  html += "<form action='/thank'  method='post' name='form1'>";
  html += "Name:</p><input type= 'text' name='name'>+";
  html += "Email:</p><input type='text' name='email'>+";
  html += "address:</p><input type='text' name='address'>+";
  html += "Mobile number:</p><input type='text' name='mobilno'>+";
  html += "<input type='submit' value='submit'>";
  html += "<INPUT type='reset'  value='reset'>";
  html += "</form>";
  html += "</body>";
  res.send(html);  

});
 
app.post('/thank', urlencodedParser, function (req, res){
    Request.post({
    "headers": { 
	'Authorization': 'Basic ' + new Buffer.from('userId:Pwd').toString('base64'),
	"content-type": "application/json"},
    "url": "https://myUrl",
    "body": JSON.stringify({
    "nationality": "Ireland",
    "countryofResidence": "Singapore",
    "name": "Samwel Tarly",
    "mobile": "+6598879887",
    "passportNo": "ABC1234567",
    "chineseName": "fdf",
    "gender": "Male",
    "DOB": "1991-12-27T06:26:43Z",
    "photo": "CAAS",
    "passportValidity": "2029-01-30",
    "email": "raghul.krish@gmail.com",
    "wechat": "Sam123",
    "CMOOfficebyregion": "London",
    "NoOfYrsInEuropeTL": 5,
    "bankName": "RBS",
    "bankAccNo" : "122221AAA" ,
     "requestedBy": "Tour Leader" 
  }
)
}, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    var reply='';
  reply += "Your name is" + req.body.name;
  reply += "Your E-mail id is" + req.body.email; 
  reply += "Your address is" + req.body.address;
  reply += "Your mobile number is" + req.body.mobilno;
  res.send(reply);
  
});
 });