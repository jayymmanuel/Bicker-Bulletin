const express = require("express");
const app = express();
const cors = require('cors');

//helmet
const helmet = require("helmet");
// path for url
const urlPrefix = "/api";

// include mongoose in our project and open a connection to the test database
const mongoose = require("mongoose");

//  Node.js file system module allows you to work with the file system on your computer
const fs = require("fs");

// ssl certificate
const cert = fs.readFileSync("keys/certificate.pem");

//A Certificate Authority is a trusted source for an SSL certificate, and using a certificate from a CA allows your users to trust the identity of your website.
const options = { server: { sslCA: cert } };

const connstring = 'mongodb+srv://jayymmanuel:keYIY4mvedpBK7Aa@cluster0.hsr4vxn.mongodb.net/';

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");

//morgan for logging
const path = require("path");
const morgan = require("morgan");

// body parser
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(helmet());


// Connect to MongoDB
mongoose
  .connect(connstring)
  .then(() => {
    console.log('Connection to MongoDB: Successful ✔');
    console.log('Backend App is running');

  })
  .catch((err) => {
    console.error('Connection to MongoDB: Failed ', err);
  }, options);


  app.use(express.json());

  let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
    flags: "a",
  });
  
  //morgan token to log the body of a request
  morgan.token("tbody", (req) => {
    let string = "";
    if (req.body) {
      string += `REQ BODY -> ${JSON.stringify(req.body)}`;
    }
    return string;
  });

  //Logs requests to a log file
//app.use(morgan('DATE -> :date[clf]\t| METHOD -> :method| URL -> :url\t| STATUS -> :status\t| RESPONSE TIME -> :response-time ms\t|BODY -> :tbody', { stream: accessLogStream }));
//Logs requests
app.use(
  morgan(
    "REQ\t| DATE -> :date[clf]\t| METHOD -> :method| URL -> :url\t| STATUS -> :status\t| RESPONSE TIME -> :response-time ms\t|BODY -> :tbody",
    {
      immediate: true,
      stream: accessLogStream,
    }
  )
);

// Logs responses
app.use(
  morgan(
    "RES\t| DATE -> :date[clf]\t| METHOD -> :method| URL -> :url\t| STATUS -> :status\t| RESPONSE TIME -> :response-time ms",
    {
      stream: accessLogStream,
    }
  )
);

app.use(cors());

app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

// catering for CORS
// allows the front end to call the backend
app.use((reg, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

// utilise the routes defined in routes.posts.js/users.js
app.use(urlPrefix + "/posts", postRoutes);
app.use(urlPrefix + "/user", userRoutes);

module.exports = app;
