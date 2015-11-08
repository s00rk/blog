var express = require('express'),
	app		= express(),
	server	= require('http').Server(app),
	io		= require('socket.io')(server);


app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.router);
});

server.listen(8080, function(){
	console.log('Servidor Iniciado');
});