var http = require('http')
  , request = require('request')
  , os = require('os')
  , io = require('socket.io-client')

  var args = process.argv.slice(2);
  var name = args[0];


socket = io.connect('http://ec2-52-4-175-99.compute-1.amazonaws.com:7172/');

function memoryLoad()
{
	return (os.totalmem()- os.freemem())/os.totalmem();
	
}

socket.on('connect',function(){
  socket.emit('heartbeat', { Name: name , memory: memoryLoad() });
});

setInterval( function () {
  socket.emit('heartbeat', { Name: name , memory: memoryLoad() });
  }, 2000);

