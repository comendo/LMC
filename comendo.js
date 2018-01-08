var express = require('express'), 
app = module.exports = express(),
http = require('http'),
server = http.createServer(app),
io = require('socket.io').listen(server);
app.use(express.static(__dirname + '/www'));
app.set('port', process.env.PORT || 9716); 
var test = "";
/**********debut socket.io**********/
io.sockets.on('connection', function (socket) {
	console.log('socket:',socket);
	
	socket.on('test', function (message) {
		console.log('Seb, le retour est : ');
		console.log(message);
/*****fin exemple multi get*****/
		socket.emit('test', message);
		//socket.broadcast.emit('test', message);
	});
}); 
/**********fin socket.io**********/


//ecoute sur le serveur
server.listen(app.get('port'), function () {
  console.log('Express server listening on port %d in %s mode',app.get('port'),app.settings.env);
});
