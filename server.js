const path = require('path');
const webpack = require('webpack');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const index = require('./webserver/routes/index');
const register = require('./webserver/routes/register');
const login = require('./webserver/routes/login');
const article = require('./webserver/routes/newsarticle');
const users = require('./webserver/routes/users');
const app = express();
const compiler = webpack(config);

require('./passport')(passport);

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, './webclient/')));
app.use(session({
  secret: 'news world',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
// app.get('*', function (request, response) {
//   response.sendFile(path.resolve(__dirname, 'webclient', 'index.html'));
// });


// Mongoose
const db = 'mongodb://localhost/newsworld';
mongoose.connect(db);

const con = mongoose.connection;
con.on('error', console.error.bind(console, 'connection error:'));
con.once('open', function() {
    console.log('connnected with mongo');
});


// All Ruotes
app.use('/', index);
app.use('/stream', users);
app.use('/signup', register);
app.use('/login', login);
app.use('/article', article);
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
}));

app.use(webpackHotMiddleware(compiler));


// Listening to port 8081
app.listen(8080, '0.0.0.0', function(err) {
    if (err) {
        console.error('Error ', err);
    }

    console.log('Server started at 8080');
});
