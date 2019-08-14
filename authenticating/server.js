const path = require('path');

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const mongoose = require('mongoose');
const bp = require('body-parser');

const app = express();

// Passport config
require('Auth/passport')(passport);

// Database Connection
const db = require('./config/db').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to Mongo'))
  .catch(err => console.error(err));

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'main', 'views'));

app.use(express.static('public'));

const indexRoutes = require('./main/routes/index');
const userRoutes = require('./main/routes/user');
const errorController = require('./main/controllers/error');

// Body parser
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// Express Session
app.use(
  session({
    secret: 'my secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global Variables for flash
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Endpoints
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use(errorController.get404);

const PORT = process.env.PORT || 80;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
