const express = require('express');
const { BeerModel , validateBeer } = require('../models/beer');
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
    /**
 * @swagger
 * /api/beers/{id}:
 *   get:
 *     summary: Get a beers by ID
 *     tags: [Beers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the beer
 *         schema:
 *           type: string
 *         example:
 *             658918e852a0131af4c0aab1
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       404:
 *         description: Beer not found
 */
    try {
        const beer = await BeerModel.findById(req.params.id);
        if (!beer) return res.status(404).send('Beer not found.');
        res.status(302).send(beer);
    } catch (err) {
        res.status(404).send(err.message);
    }
});

router.post('/', async (req, res) => {
    /**
 * @swagger
 * /api/beers:
 *   post:
 *     summary: Create a new beer
 *     tags: [Beers]
 *     requestBody:
 *       description: Beer object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               alcohol:
 *                 type: integer
 *               content:
 *                 type: integer
 *               price:
 *                 type: float
 *               brewery:
 *                  type: string
 * 
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       400:
 *         description: Invalid request
 */
    const { error } = validateBeer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let beer = new BeerModel({
        name: req.body.name,
        type: req.body.type,
        alcohol: req.body.alcohol,
        content: req.body.content,
        price: req.body.price,
        brewery: req.body.brewery
    });

    try {
        beer = await beer.save();
        res.status(200).send(beer);
    } catch (err) {
        res.status(400).send(err.message);
    }  
});

router.patch('/:id', async (req, res) => {
/**
 * @swagger
 * /api/beers/{id}:
 *   patch:
 *     summary: Update a beer by ID
 *     description: Update the details of a beer by providing the beer ID.
 *     tags: [Beers]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the Beer to be updated.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated Beer information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               alcohol:
 *                 type: integer
 *               content:
 *                 type: integer
 *               price:
 *                 type: float
 *               brewery:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful update
 *         content:
 *           application/json:
 *             example:
 *               message: 'Beer updated successfully'
 *       404:
 *         description: Beer not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Beer not found'
 */   
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
    /**
 * @swagger
 * /api/beers/{id}:
 *   put:
 *     summary: Update a beer by ID
 *     description: Update the details of a beer by providing the beer ID.
 *     tags: [Beers]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the Beer to be updated.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated Beer information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               alcohol:
 *                 type: integer
 *               content:
 *                 type: integer
 *               price:
 *                 type: float
 *               brewery:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful update
 *         content:
 *           application/json:
 *             example:
 *               message: 'Beer updated successfully'
 *       404:
 *         description: Beer not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Beer not found'
 */
    const { error } = validateBeer(req.body);
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
    /**
 * @swagger
 * /api/beers/{id}:
 *   delete:
 *     summary: Delete a beer by ID
 *     tags: [Beers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the beer
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Beer deleted successfully
 *       404:
 *         description: Beer not found
 */
    try {
        const beer = await BeerModel.findByIdAndDelete(req.params.id);
        if (!beer) return res.status(404).send('Beer not found.');
        res.status(200).send(beer);
    } catch (err) {
        res.status(404).send(err.message);
    }
});

module.exports = router;