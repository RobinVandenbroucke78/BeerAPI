const Joi = require('joi');
const mongoose = require('mongoose');
const beers = require('./routes/beers');
const express = require('express');
const app = express();

mongoose.connect('mongodb+srv://robinvandenbroucke2:MaMTsORgBD24erKY@node.ckpcixi.mongodb.net/')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/beers', beers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
