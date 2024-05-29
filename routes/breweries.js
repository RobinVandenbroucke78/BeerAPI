const express = require('express');
const { BreweryModel, validateBrewery } = require('../models/brewery');
const router = express.Router();

router.get('/', async (req, res) => {
        /**
 * @swagger
 * /api/breweries:
 *   get:
 *     summary: Get a list of all Breweries
 *     tags: [Breweries]
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
        const breweries = await BreweryModel.find();
        res.status(302).send(breweries);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.get('/:id', async (req, res) => {
    /**
 * @swagger
 * /api/breweries/{id}:
 *   get:
 *     summary: Get a brewery by ID
 *     tags: [Breweries]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the beer
 *         schema:
 *           type: string
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
        const brewery = await BreweryModel.findById(req.params.id);
        if (!brewery) return res.status(404).send('Brewery not found.');
        res.status(302).send(brewery);
    } catch (err) {
        res.status(404).send(err.message);
    }
});

router.post('/', async (req, res) => {
    /**
 * @swagger
 * /api/breweries:
 *   post:
 *     summary: Create a new brewery
 *     tags: [Breweries]
 *     requestBody:
 *       description: brewery object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *             example:
 *                name: "Brouwerij VIVES"
 *                location: "Kortrijk"
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

router.patch('/:id', async (req, res) => {
    /**
 * @swagger
 * /api/breweries/{id}:
 *   patch:
 *     summary: Update a brewery by ID
 *     description: Update the details of a brewery by providing the brewery ID.
 *     tags: [Breweries]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the brewery to be updated.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated brewery information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful update
 *         content:
 *           application/json:
 *             example:
 *               message: 'Brewery updated successfully'
 *       404:
 *         description: Brewery not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Brewery not found'
 */
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
    /**
 * @swagger
 * /api/breweries/{id}:
 *   put:
 *     summary: Update a brewery by ID
 *     description: Update the details of a brewery by providing the brewery ID.
 *     tags: [Breweries]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the brewery to be updated.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated brewery information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful update
 *         content:
 *           application/json:
 *             example:
 *               message: 'brewery updated successfully'
 *       404:
 *         description: brewery not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'brewery not found'
 */
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
        /**
 * @swagger
 * /api/breweries/{id}:
 *   delete:
 *     summary: Delete a brewery by ID
 *     tags: [Breweries]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the brewery
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: brewery deleted successfully
 *       404:
 *         description: brewery not found
 */
    try {
        const brewery = await BreweryModel.findByIdAndDelete(req.params.id);
        if (!brewery) return res.status(404).send('Brewery not found.');
        res.status(200).send(brewery);
    } catch (err) {
        res.status(404).send(err.message);
    }
});

module.exports = router;