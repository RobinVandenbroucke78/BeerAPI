const Joi = require('joi');
const mongoose = require('mongoose');

const BeerSchema = new mongoose.Schema({
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
    }
});

const BeerModel = mongoose.model('beer', BeerSchema);

function validateBeer(beer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        type: Joi.string().min(5).max(255).required(),
        alcohol: Joi.number().min(1).max(3).required(),
        content: Joi.number().min(2).max(4).required(),
        price: Joi.number().min(3).max(4).required()
    });
    return schema.validate(beer);
};

async function saveBeer({ name, type, alcohol, content, price }) {
    const existingBeer = await BeerModel.findOne({ name });
    if (existingBeer) {
      throw new Error("Beer already exists");
    }
    const beer = new BeerModel({ name, type, alcohol, content, price });
    const error = beer.validateSync();
    if (error) {
      throw error;
    }
    await beer.save();
    return beer;
}

module.exports = { BeerModel, validateBeer, saveBeer };
