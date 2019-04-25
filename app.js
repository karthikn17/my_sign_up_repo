const http = require('http');
const port=process.env.PORT || 3000
const { parse } = require('querystring');
var Request = require("request");
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            //console.log(result);
			console.log(JSON.stringify(result));

			Request.post({
    "headers": { 
	'Authorization': 'Basic ' + new Buffer.from('systemapiuser:apiuser@123').toString('base64'),
	"content-type": "application/json"},
    "url": "https://cognizant-82015.appiancloud.com/suite/webapi/signup/new",
    "body": JSON.stringify(result)
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
	  <style>
form {
  /* Just to center the form on the page */
  margin: 150px auto;
  width: 450px;
  /* To see the outline of the form */
  padding: 0.5em;  
  border: 1px solid #282828;
  border-radius: 1em;
}
</style>
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
form {
  /* Just to center the form on the page */
  margin: 150px auto;
  width: 450px;
  /* To see the outline of the form */
  padding: 0.5em;  
  border: 1px solid #808080;
  border-radius: 1em;
}

form div + div {
  margin-top: 3em;]
   
}
body  {
  background-size:  contain;
  background: linear-gradient(to bottom, #33ccff 0%, #ff9900 100%);
}


label {
  /* To make sure that all labels have the same size and are properly aligned */
  display: inline-block;
  width: 90px;
  text-align: right;
}

input, textarea {

  padding: 15px;
  margin: 5px 10px 22px 10px;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input, selection {

  padding: 15px;
  margin: 5px 10px 22px 10px;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input:focus, textarea:focus {
  /* To give a little highlight on active elements */
  border-color: #000;
}

textarea {
  /* To properly align multiline text fields with their labels */
  vertical-align: top;

  /* To give enough room to type some text */
  height: 5em;
}


.button {
  /* To position the buttons to the same position of the text fields */
  padding-left: 90px; /* same size as the label elements */
}

button {
  /* This extra margin represent roughly the same space as the space
     between the labels and their text fields */
  margin-left: .5em;
}
body {
 
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
	 <font color="b36b00"><h1><i> Sign Up Form</i> </h1></font>
	  <hr>
           <table> 
				<tr><td></td><td></td><td></td></tr>
				<tr> <td>
 <input type="text" name="name"  placeholder="Name *" required >
             			</td>
						<td><td>
				<td> 
              <input type="text" name="chineseName"  placeholder="Chinese Name *" required> </td>
				</tr>
				<tr> <td> <input type="radio" name="gender" value="male"> Male
<input type="radio" name="gender" value="female"> Female</td><td><td>
				<td><input placeholder="DOB *" class="textbox-n" type="text" onfocus="(this.type='date')" onblur="(this.type='text')" name="dob" id="date" required> </td>
				</tr>
				<tr> <td><input type="number" name="mobile" placeholder="Mobile *" required> 
			 </td><td><td>
				<td> <input type="email" name="email"   placeholder="E-mail *" required>
			</td>
				</tr>
				<tr> <td> <input type="text" name="nationality" placeholder="Nationality *" required >
			</td><td><td>
				<td> <input type="text" name="countryofResidence" placeholder="Country of Residence *" required >
			</td>
				</tr>
		.		<tr>
				<td><input type="text" name="passportNo" placeholder="Passport No *" required>
					
			</td><td><td><td><input placeholder="Passport Validaty *" class="textbox-n" type="text" onfocus="(this.type='date')" onblur="(this.type='text')" name="passportValidity" id="passportValidity" required>			
			</td>
				</tr>
				<tr>
				<td><input type="text" name="wechat" placeholder="We Chat Id *" required>
			</td><td><td><td><input type="text" name="CMOOfficebyregion" placeholder="CMO Office by Region *" required>
			</td>
				</tr>
				<tr>
				<td><input type="text" name="bankAccNo" placeholder="Bank Acc No *">
			</td><td><td><td><input type="text" name="bankName"  placeholder="Bank Name *">
			</td>
				</tr>
				<tr><td><input type="number" name="NoOfYrsInEuropeTL" placeholder="No of Years in Europe TL *"required>
			</td><td><td>
				<td><input type="text" name="requestedBy" placeholder="Requested By *">
        </td></tr>
				</table>
                
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