const http = require("http");
const port = 8687;
let serverStatus = undefined;
const server = http.createServer(function (req, res) {
    try {
        if (req.method === "GET") {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.write(serverStatus.message);
        } else if (req.method === "PUT") {
            var body = "";
            req.on("data", function (data) {
                body += data;
            });

            req.on("end", function () {
                serverStatus = {};
                serverStatus = JSON.parse(body);

            });
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.write("The server has been updated.");
        }
    } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write("The server has no data.");
    } finally {
        res.write("--and the message arrived");
        res.end();
    }
}).listen(port);