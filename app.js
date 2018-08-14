var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var path = require('path');


app = express();

var index = require('./routes/index');

var config = require('./config/database');
mongoose.connect(config.url,{ useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set thư mục gốc
app.use(express.static(path.join(__dirname, 'public')));

//truyền passport
require('./config/passport')(passport);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(flash());

//cấu hình passport
app.use(session({
    secret:'longkma1234',
    saveUninitialized: true,
    resave:true
}));
app.use(passport.initialize());
app.use(passport.session());



require('./routes/auth')(app, passport);
require('./routes/quotation')(app, passport);


//gọi router ra
app.use('/',index);


app.listen(3000);

