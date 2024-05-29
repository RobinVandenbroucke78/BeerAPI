const Joi = require('joi');
const mongoose = require('mongoose');

const BrewerySchema = new mongoose.Schema({
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
        required: true
    }
});

const BreweryModel = mongoose.model('brewery', BrewerySchema);


function validateBrewery(brewery) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        location: Joi.string().min(5).max(255).required(),
        yearStarted: Joi.date().required()
    });
    return schema.validate(brewery);
}

module.exports = { BreweryModel, validateBrewery };
