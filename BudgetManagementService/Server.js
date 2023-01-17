
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const http = require('http')
const bodyParser = require('body-parser')
const routes= require('./routes')
const session = require('express-session')

const db= require('./Config/MongoConfig').mongoURI;

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

app.use(routes)
const server = http.createServer(app);
const Port=process.env.PORT||3002
server.listen(Port,console.log(Date.now))
mongoose.connect(db)
    .then(()=> console.log('MongoDB connected'))
    .catch(err => console.log(err));


