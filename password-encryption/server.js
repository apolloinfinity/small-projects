const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bp = require('body-parser');

const app = express();

const db = require('./config').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected with mongoose'))
  .catch(err => console.error(err));

// Middleware for app
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// incoming routes
app.use('/', require('./authRoute'));

const port = 8080;
app.listen(port, () => {
  console.log(`App started on ${port}`);
});
