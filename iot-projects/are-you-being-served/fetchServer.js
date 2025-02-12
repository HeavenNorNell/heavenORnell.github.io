// fetchServer.js file
const http = require('http');
const port = 2218;
http.createServer(async function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    let fetchResponse = await fetch('https://heavenORnell.github.io')
    if (fetchResponse.ok) {
        // need to await the text
        const html = fetchResponse.text();
        res.write(html);
    } else {
        res.write('error:' + fetchResponse.statusText + ', ' + fetchResponse.status);
    }
    res.end();
}).listen(port);