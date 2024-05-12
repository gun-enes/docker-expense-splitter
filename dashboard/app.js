require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');
const connectDB = require('./db.js');

const app = express();
const PORT = 5000 || process.env.PORT;
 
connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('public'));

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false,
	cookie: { secure: 'auto' },
	store: MongoStore.create({
	  mongoUrl: process.env.MONGODB_URI
	}),
  }));

app.use(express.static('public'));

app.use(expressLayout);
app.set('layout', './main');
app.set('view engine', 'ejs');

app.use('/', require('./routes.js'));
 
app.listen(PORT , () => {
	console.log("App listening on port " + PORT);
});
