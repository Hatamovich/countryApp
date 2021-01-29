// Express -------->
const app = require('express');
const express = app();

express.use(app.static('public'));
express.listen(3000, () => console.log(true));


// Mongoose ---------> 
const mongoose = require('mongoose');

// Connection to the database 
mongoose.connect('mongodb://localhost:27017/site',
{useNewUrlParser: 1, useUnifiedTopology: 1});

const Schema = mongoose.Schema;
const Country = mongoose.model('Country', Schema({
	country: String,
	capital: String,
	language: String,
	currency: String,
	flag: String
}));

Country.find()
.then((countries) => {
	express.get('/countries/:country', (req, res) => {
		let currentCountry = req.params.country;
		countries.forEach(country => {
			if(currentCountry.toLowerCase() === country.country.toLowerCase()) {
				res.send(country);
			}
		});
	});
})

express.use(app.json());
express.post('/countries/country', (req, res) => {
	const received = req.body;
	const added = new Country(received)
	.save().then(() => console.log(req.body.country + ' ' + 'saved.')); 
})
