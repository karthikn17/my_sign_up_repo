const http = require('http');
const port=process.env.PORT || 3000
const { parse } = require('querystring');
var Request = require("request");
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            console.log(result);
			Request.post({
    "headers": { 
	'Authorization': 'Basic ' + new Buffer.from('systemapiuser:apiuser@123').toString('base64'),
	"content-type": "application/json"},
    "url": "https://cognizant-82015.appiancloud.com/suite/webapi/sign_up",
    "body": JSON.stringify({
    result
  }
)
}, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    console.dir(`Parsed data belonging to ${result.firstName}`);
});

        });
    } 
    else {
        res.end(`
            <!DOCTYPE HTML>
<html>
   <head>
         <title>Sign Up</title>
         <meta charset="utf-8">
      </head>
      <body>
	   <form action="/" method="post">
	  <h1> Sign Up Form </h1>
         <h3> Fields marked (*) are mandatory </h3>
         <fieldset align="center left" style="width:450px;">
            <legend >Input text field validation</legend>
            <br>
            First Name *  <input type="text" name="firstName" placeholder="First Name"><br><br>
            Last Name *  <input type="text" name="lastName" placeholder="Last Name"><br><br>
         </fieldset>
         <br>
         <fieldset align="center left" style="width:450px;">
            <legend>Mobile or Phone number</legend>
            <br>
            Mobile *  <input type="tel" name="mobile" maxlength="10" size=10 placeholder="Please enter a ten digit phone number"  style="width: 250px;" required><br><br>
         </fieldset>
         <br>
        <br>
         <fieldset align="center left" style="width:450px;">
            <legend>Number Validation With Specific Range</legend>
            <br>
            Post Code  *   <input type="zip" name="zip" pattern="[0-9]{6}" placeholder="Six digit zip code" title="Six digit zip code" style="width:150px;" required><br><br>
         </fieldset>
         <br>
         <fieldset align="center left" style="width:450px;">
            <legend>Password </legend>
            <br>
            Password * <input type="password" name="pwd" required> <br><br>
         </fieldset>
         <br> 
         <div align = "right" style="width:450px;">
            <button>Sign Up	</button>
         </div>
         <br> 
		 </form>
      </body>   
</html>
        `);
    }
});
server.listen(port,() => {
console.log(`Server running at port `+port);
});
function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}