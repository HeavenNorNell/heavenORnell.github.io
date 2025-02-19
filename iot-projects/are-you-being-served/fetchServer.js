// fetchServer.js file
const http = require('http');
const port = 2218;
http.createServer(async function (req, res) {
    var args = process.argv.slice(2);
    var url = args[0] ? args[0] : "https://wikipedia.org";
        res.writeHead(200, { "Content-Type": args[1] });      
    let fetchResponse = await fetch(url)
    if (fetchResponse.ok) {
        const html = await fetchResponse.text();
        res.write(html);
    } else {
        res.write('error:' + fetchResponse.statusText + ', ' + fetchResponse.status);
    }
    res.end();
}).listen(port);