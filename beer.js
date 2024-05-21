const mongoose = require('mongoose')
const express = require('express');
const Joi = require('joi');
const router = express.Router();

mongoose.connect('mongodb+srv://robinvandenbroucke2:MaMTsORgBD24erKY@node.ckpcixi.mongodb.net/')
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log("Error connecting to DB: " + err));

const beerSchema = new mongoose.Schema({
    id: Int32Array,
    name: String,
    type: String,
})

const Beers = mongoose.model('Beers', courseSchema)



function validateBeers(beer){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        type: Joi.string().min(3)
    })
    return schema.validate(beer);
}