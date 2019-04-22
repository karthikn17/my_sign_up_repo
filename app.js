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
    res.end(`<!DOCTYPE HTML>
<html>
   <head>
         <title>Sign Up</title>
         <meta charset="utf-8">
      </head>
      <body>
	  <h2>Your sign up request has been successfully received<h2> <br><br>
	  </body>
	  </html>`);
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
		 <style>
.content {
  max-width: 500px;
  margin: auto;
}
</style>
<body>

<div class="content"> 
  <!-- Page content -->
</div>

</body>
      </head>
      <body align="center">
	   <form action="/" method="post">
	  <h1> Sign Up Form </h1>
         <fieldset align="left" style="width:450px;">
            <legend ><h3>Fields marked (*) are mandatory</h3></legend>
            <br>
            Name *  <input type="text" name="name" ><br><br>
            Chinese Name *  <input type="text" name="chineseName"><br><br>
			Gender *<input type="radio" name="gender" value="male" checked> Male
			<input type="radio" name="gender" value="female"> Female
			<input type="radio" name="gender" value="other"> Other<br><br>
			DOB * <input type="date" name="dob"> <br><br>
			Mobile * <input type="number" name="mobile"> <br><br>
			E-mail * <input type="email" name="email"> <br><br>
			Nationality *  <input type="text" name="nationality" ><br><br>
			Country of Residence *  <input type="text" name="lastName" ><br><br>
			We Chat Id  <input type="text" name="wechat"><br><br>
			Passport No *  <input type="text" name="passportNo"><br><br>
			Passport Validaty *  <input type="date" name="passportValidity"><br><br>
			CMO Office by Region *  <input type="text" name="CMOOfficebyregion"><br><br>
			No of Years in Europe TL *  <input type="number" name="NoOfYrsInEuropeTL"><br><br>
			Bank Name *  <input type="text" name="bankName"><br><br>
			Bank Acc No *  <input type="text" name="bankName"><br><br>
			Requested By *  <input type="text" name="requestedBy"><br><br>
         </fieldset>
         <br>  <div align = "right" style="width:450px;">
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