var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 8080

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
  var id = setInterval(function() {
      console.log("send ping: C")
      ws.send("C",function() {  })
    
  }, 12000)   
  
  console.log("websocket connection open " )
  
  ws.on('message', function(message) {
      console.log('received: %s', message);
     // wss.myBroadcast(message);  
      wss.broadcast(message);  
  });  
        
  ws.on("close", function() {
     console.log("websocket connection close")
     clearInterval(id)
  })
  
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      client.send(data);
    });
  };

})  // end wss.on
