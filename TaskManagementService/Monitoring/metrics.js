

const promClient = require('prom-client');


const register = new promClient.Registry();
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ register });

 const httpCounter = new promClient.Counter({
    name: 'todo_service_counter',
    help: 'todo_service_counter',
    labelNames: ['method', 'path'],
    registers: [register]
});

 const retodoCounter = new promClient.Counter({
    name: 'todo_service_retodo_counter',
    help: 'todo_service_retodo_counter',
    labelNames: ['date'],
    registers: [register]
});

 const todoCounter = new promClient.Counter({
    name: 'todo_service_todo_counter',
    help: 'todo_service_todo_counter',
    labelNames: ['date'],
    registers: [register]
});

const todosByUserHistogram = new promClient.Histogram({
    name: 'todo_service_todo_histogram',
    help: 'todo_service_todo_histogram',
    labelNames: ['date'],
    registers: [register]
});

module.exports={register,httpCounter,todosByUserHistogram,retodoCounter,todoCounter}