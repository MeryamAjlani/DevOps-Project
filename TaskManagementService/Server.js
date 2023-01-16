
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const http = require('http')
const bodyParser = require('body-parser')
const routes= require('./routes')
const session = require('express-session')
const promMid = require('express-prometheus-middleware');
const db= require('./Config/MongoConfig').mongoURI;
const promClient = require('prom-client');
const {register} =require('./Monitoring/metrics')
var winston = require('winston'),
    expressWinston = require('express-winston');
const rTracer = require("cls-rtracer");


const app= express()
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

var sess = {
    secret: 'keyboard cat',
    cookie: {}
  }
  
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }
  
  app.use(session(sess))
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
  }));
  app.use(routes)
  app.get('/metrics', async (req ,res) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
}); 
app.use(rTracer.expressMiddleware());
const server = http.createServer(app);
const Port=process.env.PORT||3000

server.listen(Port,console.log(Date.now))
mongoose.connect(db)
    .then(()=> console.log('MongoDB connected'))
    .catch(err => console.log(err));


