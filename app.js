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
    "url": "https://cognizant-82015.appiancloud.com/suite/webapi/signup/new",
    "body": JSON.stringify({
    result
  }
)
}, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    console.dir(`Parsed data belonging to ${result.fname}`);
});

        });
    } 
    else {
        res.end(`
            <!doctype html>
            <html>
            <body>
                <form action="/" method="post">
                    <input type="text" name="fname" /><br />
                    <input type="number" name="age" /><br />
                    <input type="file" name="photo" /><br />
                    <button>Save</button>
                </form>
            </body>
            </html>
        `);
    }
});
server.listen(3000);

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