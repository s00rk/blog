var express = require('express'),
	app		= express(),
	server	= require('http').Server(app),
	io		= require('socket.io')(server),
	mongoose = require('mongoose');

var bodyParser = require('body-parser'),
	multer  = require('multer'),
	upload = multer({ dest: 'uploads/' });


mongoose.connect('mongodb://s00rk:saske321._password@75.126.80.16:16000/s00rkblog', 
	function(err, res){
		if(err) console.log('ERROR: ' + err);
		else console.log('Conextion to BD succesfully!');
	}
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./routes/PostRoutes')() );

server.listen(8000, function(){
	console.log('Server Initialized');
});