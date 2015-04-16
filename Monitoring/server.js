var sio = require('socket.io')
  , http = require('http')
  , request = require('request')
  , os = require('os')
  , express = require('express');


  var app = express();
  var server = app.listen(7172, function () {

          var host = server.address().address
          var port = server.address().port
        console.log('Example app listening at http://%s:%s', host, port)
})

  var io = require('socket.io').listen(server);
       io.sockets.on('connection', function (socket) {
        socket.on('heartbeat',function(data){
              console.log(data);
        });

  })
