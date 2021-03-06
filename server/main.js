var express 		= require('express'),
	app				= express(),
	server			= require('http').Server(app),
	io				= require('socket.io')(server),
	mongoose 		= require('mongoose'),
	nunjucks 		= require('express-nunjucks'),
	mailer 			= require('express-mailer'),
	csrf 			= require('csurf'),
	cookieParser 	= require('cookie-parser'),
	session 		= require('express-session'),
	flash 			= require('connect-flash');

var MongoStore 		= require('connect-mongo')(session);

var bodyParser 		= require('body-parser'),
	multer  		= require('multer'),
	upload 			= multer({ dest: __dirname + '/public/uploads/' });


mongoose.connect('mongodb://s00rk:saske321._password@75.126.80.16:16000/s00rkblog', 
	function(err, res){
		if(err) console.log('ERROR: ' + err);
		else console.log('Connection to BD succesfully!');
	}
);

mailer.extend(app, {
	from: 'no-reply@victorivera.com',
	host: 'smtp.gmail.com', 
	secureConnection: true,
	port: 465,
	transportMethod: 'SMTP',
	auth: {
		user: 'gmail.user@gmail.com',
		pass: 'userpass'
	}
});

var csrfProtection = csrf({ cookie: true })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
	resave: true,
	saveUninitialized: true,
    secret: 's00rkblog',
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(flash());


app.set('view engine', 'html');
app.set('views', __dirname + '/views/');
nunjucks.setup({
	autoescape: false,
	watch: true
}, app);
app.use('/static', express.static(__dirname + '/public'));



app.use(function(req, res, next) {
	res.locals.session = req.session;
	next();
});


var isAdmin = function(req, res, next){
	if(req.session.logged) next();
	else res.redirect('/entrar');
};

app.post('/admin/post/:slug', upload.single('image'));
app.use(csrfProtection);

app.use('/', require('./routes/PostRoutes')() );
app.use('/', require('./routes/InfoRoutes')() );
app.use('/', isAdmin, require('./routes/AdminRoutes')() );







server.listen(8000, function(){
	console.log('Server Initialized');
});

module.exports = app;