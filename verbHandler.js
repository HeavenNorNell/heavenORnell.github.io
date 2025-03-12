const http = require("http");
const port = 3000;

let data = "";
let secret = "I'm gay.";
let notSecret = "I'm very gay!"
const list = [];

http.createServer(function (req, res) {

    if (req.method === "GET") {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        if (req.url === "/secret") {
            res.end(secret);
        } else {
            res.end(notSecret);
        }

    } else if (req.method === "DELETE") {
        secret = undefined;
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("secret deleted");

    } else if (req.method === "PUT") {
        req.on("data", function (chunk) {
            secret += chunk.toString();
        })
        req.on("end", function () {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(secret);
        })
    } else if (req.method === "POST") {
        req.on("data", function (chunk) {
            data += chunk.toString();
            list.push(chunk);
        })
        req.on("data", function () {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Data added successfully!");
        })

    } else {

    }
}).listen(port);
console.log(`Listening to port ${port}`)
console.log(`http://localhost:${port}`)