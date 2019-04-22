// app.js
const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const app = express();


var Request = require("request");

Request.post({
    "headers": { 
	'Authorization': 'Basic ' + new Buffer.from('karthikn:Kar@sg17').toString('base64'),
	"content-type": "application/json"},
    "url": "https://cognizant-82015.appiancloud.com/suite/webapi/signup/new",
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
    console.dir(JSON.parse(body));
});

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

