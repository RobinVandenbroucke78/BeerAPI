const Joi = require('joi');
const mongoose = require('mongoose');
const { Brewery } = require('./brewery');

const Beer = mongoose.model('Beer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    type: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    alcohol: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 3
    },
    content: {
        type: Number,
        required: true,
        minlength: 2,
        maxlength: 4
    },
    price: {
        type: Number,
        required: true,
        minlength: 3,
        maxlength: 4
    },
    brewery: {
        type: Brewery,
        required: true,
    }
}));


function validateBeer(beer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        type: Joi.string().min(5).max(255).required(),
        alcohol: Joi.number().min(1).max(3).required(),
        content: Joi.number().min(2).max(4).required(),
        price: Joi.number().min(3).max(4).required(),
        brewery: Joi.object().required()
    });
    return schema.validate(beer);
}

exports.Beer = Beer;
exports.validate = validateBeer;
