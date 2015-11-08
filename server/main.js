var express = require('express'),
	app		= express(),
	server	= require('http').Server(app),
	io		= require('socket.io')(server);

mongoose.connect('mongoose://75.126.80.16:16000/s00rk_blog', function(err, res){
	if(err) console.log('ERROR: ' + err);
	else console.log('Conextion to BD succesfully!');
});


app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.router);
});

server.listen(8080, function(){
	console.log('Server Initialized');
});