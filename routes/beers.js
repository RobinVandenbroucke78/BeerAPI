const express = require('express');
const { BeerModel , validateBeers } = require('../models/beer');
const router = express.Router();

router.get('/', async (req, res) => {
    /**
 * @swagger
 * /api/beers:
 *   get:
 *     summary: Get a list of all Beers
 *     tags: [Beers]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
    try {
        const beers = await BeerModel.find();
        res.status(302).send(beers);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const beer = await BeerModel.findById(req.params.id);
        if (!beer) return res.status(404).send('Beer not found.');
        res.status(302).send(beer);
    } catch (err) {
        res.status(404).send(err.message);
    }
});

router.post('/', async (req, res) => {
    const { error } = validateBeers(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let beer = new BeerModel({
        name: req.body.name,
        type: req.body.type,
        alcohol: req.body.alcohol,
        content: req.body.content,
        price: req.body.price
    });

    try {
        beer = await beer.save();
        res.status(200).send(beer);
    } catch (err) {
        res.status(400).send(err.message);
    }  
});

router.patch('/:id', async (req, res) => {
    const beerId = req.params.id;
    const updateFields = req.body;

    try {
        const updatedBeer = await BeerModel.findByIdAndUpdate(
            beerId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedBeer) {
            return res.status(404).send('User not found');
        }

        res.status(200).send(updatedBeer);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validateBeers(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const beerId = req.params.id;
    const updateFields = req.body;

    try {
        const updatedBeer = await BeerModel.findByIdAndUpdate(
            beerId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedBeer) {
            return res.status(404).send('Beer not found');
        }

        res.status(200).send(updatedBeer);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const beer = await BeerModel.findByIdAndDelete(req.params.id);
        if (!beer) return res.status(404).send('Beer not found.');
        res.status(200).send(beer);
    } catch (err) {
        res.status(404).send(err.message);
    }
});

module.exports = router;