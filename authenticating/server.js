const path = require('path');

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const sessions = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const mongoose = require('mongoose');
const bp = require('body-parser');

const app = express();

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

// Body parser
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// Incoming routes

// Endpoints
app.use('/', require('./main/routes/index'));

const PORT = process.env.PORT || 80;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
