const express = require('express');
const { BreweryModel, validateBrewery } = require('../models/brewery');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateBrewery(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let brewery = new BreweryModel({
        name: req.body.name,
        location: req.body.location
    });

    try {
        brewery = await brewery.save();
        res.status(200).send(brewery);
    } catch (err) {
        res.status(400).send(err.message);
    }  
});

router.get('/', async (req, res) => {
    try {
        const breweries = await BreweryModel.find();
        res.status(302).send(breweries);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.patch('/:id', async (req, res) => {
    const breweryId = req.params.id;
    const updateFields = req.body;

    try {
        const updatedBrewery = await BreweryModel.findByIdAndUpdate(
            breweryId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedBrewery) {
            return res.status(404).send('Brewery not found');
        }

        res.status(200).send(updatedBrewery);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validateBrewery(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const breweryId = req.params.id;
    const updateFields = req.body;

    try {
        const updatedBrewery = await BreweryModel.findByIdAndUpdate(
            breweryId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedBrewery) {
            return res.status(404).send('User not found');
        }

        res.status(200).send(updatedBrewery);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const brewery = await BreweryModel.findByIdAndDelete(req.params.id);
        if (!brewery) return res.status(404).send('Brewery not found.');
        res.status(200).send(brewery);
    } catch (err) {
        res.status(404).send(err.message);
    }
});

module.exports = router;