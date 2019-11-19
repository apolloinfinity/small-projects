const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 80;
const db = require('./config/db').mongoURI;

const start = async () => {
	try {
		await mongoose.connect(db, { useNewUrlParser: true });
		console.log('Connected to Mongo');
		const app = express();
		app.set('view engine', 'ejs');

		const user = require('./routes/indexRoute');

		// Middleware
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));

		// Routes
		app.use('/', user);

		app.listen(PORT, console.log(`App started on port ${PORT}`));
	} catch (err) {
		console.error(err);
	}
};

start();
