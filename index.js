const Joi = require('joi-oid');
const mongoose = require('mongoose');
const beers = require('./routes/beers');
const breweries = require('./routes/breweries');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();
const config = require('config');

mongoose.connect('mongodb+srv://robinvandenbroucke2:MaMTsORgBD24erKY@node.ckpcixi.mongodb.net/Eindproject')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/beers', beers);
app.use('/api/breweries', breweries);
app.use('/api/users', users);
app.use('/api/auth', auth);

/*if (!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR: jwtPrivateKey not defined');
  process.exit(1);
}*/

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
