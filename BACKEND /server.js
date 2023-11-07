const app = require("./app");

// debugging
const debug = require("debug")("node-angular");

// HTTPS is the HTTP protocol over TLS/SSL
const https = require("https");

//  Node.js file system module allows you to work with the file system on your computer
const fs = require("fs");

// set the port number
const port = 3000;

// HSTS options
const hstsOptions = {
  maxAge: 31536000,       // 1 year in seconds
  includeSubDomains: true,
  preload: false,
};

// read the open ssl private key and certificate from the files
const server = https.createServer(
  {
    key: fs.readFileSync("./keys/privatekey.pem"),
    cert: fs.readFileSync("./keys/certificate.pem"),
  },
  (req, res) => {
    // Set the HSTS header in the server response
    res.setHeader("Strict-Transport-Security", `max-age=${hstsOptions.maxAge}${hstsOptions.includeSubDomains ? "; includeSubDomains" : ""}${hstsOptions.preload ? "; preload" : ""}`);
    app(req, res); // Pass the request and response to your app
  }
);


// set the server to listen to the desingated port number
server.listen(port);
console.log(`Sever listening on Port ${port}`);

// const http = require('http')
// const app = require('./app')
// const fs = require('fs')
// const PORT = 3000

// const privateKey = fs.readFileSync('keys/privatekey.pem', 'utf8');
// const certificate = fs.readFileSync('keys/certificate.pem', 'utf8');
// const credentials = { key: privateKey, cert: certificate };

// const server = http.createServer(
//   credentials, app
// );

// server.on('error', (error) => {
//   console.error('Server Error: ', error)
// });

// server.listen(PORT)


