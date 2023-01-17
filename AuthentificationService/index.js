const express = require("express");
const mongoose = require("mongoose");
const { Order,add } = require("./database/user.js");
const promBundle = require("express-prom-bundle");
const client = require('prom-client');

const app = express();
app.use(express.json());

const register = new client.Registry();
 



const requestCounter = new client.Counter({
  name: 'requests_total',
  help: 'The total number of requests handled by the server',
  labelNames: ['status_code']
});

// Add the options to the prometheus middleware most option are for http_request_duration_seconds histogram metric
const metricsMiddleware = promBundle({
  includeMethod: true, 
  includePath: true, 
  includeStatusCode: true, 
  includeUp: true,
  customLabels: {project_name: 'authentification-service', project_type: 'test_metrics_labels'},
  promClient: {
      collectDefaultMetrics: {
      }
    }
});

//app.use('/authentification',metricsMiddleware)


app.use('/authentification',require('./routes/api/authentification'))

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://Maryem:Yqn4IfTCJLZ6wGtM@cluster0.cw5x1.mongodb.net/?retryWrites=true'
    );
    app.listen(5000, () => console.log("Server started on port 5000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();



