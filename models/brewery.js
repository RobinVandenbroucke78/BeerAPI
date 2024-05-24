const Joi = require('joi');
const mongoose = require('mongoose');

const Brewery = mongoose.model('Brewery', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    location: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    yearStarted: {
        type: Date,
        required: true,
        minlength: 8,
        maxlength: 8
    }
}));


function validateBrewery(brewery) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        location: Joi.string().min(5).max(255).required(),
        yearStarted: Joi.number().min(8).max(8).required()
    });
    return schema.validate(brewery);
}

exports.Brewery = Brewery;
exports.validate = validateBrewery;
