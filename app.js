const express = require('express');
const beers = require('./routes/beers');

const app = express();
const Joi = require('joi');

app.use(express.json()); //haalt json uit body en steekt het in de request
app.use(express.urlencoded({ extended: true }));  //haalt van url data op en zet dat in de req.body
app.use(express.static('public')); //files uit folder toehankelijk maken online

app.use('/api/beers', beers);

// $env:NODE_ENV = "production" (omzetten  naar PRODUCTION)(in console)
//app.use(logger); //log

const port = process.env.PORT || 3000;


console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);


app.listen(port, () => console.log('listening on port 3000'));
//console.log(process.env)

