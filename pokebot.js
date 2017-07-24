var express = require('express')
//var StatsD = require('node-statsd') 
var app = express()
//var stats = new StatsD()
const launcher = require('./index');
const logger = require('./logger');
//const username = require('username');
const config = require('./config.js');
//const restify = require('restify');
const builder = require('botbuilder');
const recast = require('recastai');
const recastClient = new recast.request(config.recast, 'en')
//var responseTime = require('response-time')

// app.use(responseTime(function(req,res,time){
// 
// var stat = (req.method + req.url).toLowerCase()
//     .replace(/[:\.]/g, '')
//     .replace(/\//g, '_')
//   stats.timing(stat, time)
//   console.log(stat , time);
// 
// }))


const connect = new recast.connect(config.recast)
// Connection to Microsoft Bot Framework
const connector = new builder.ChatConnector({
  appId: config.appId,
  appPassword: config.appPassword,
})
const bot = new builder.UniversalBot(connector)

// Event when Message received
bot.dialog('/', (session) => {
	console.log("Inside dialog");
	launcher.launch(recastClient,config,session,builder).then(function(ans){console.log("Inside logger call");logger.log(session,ans);});
	console.log("after launcher ");
 })
// Server Init
//const server = restify.createServer()
app.listen(8282)
app.post('/', connector.listen())