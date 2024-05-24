const express = require('express');
const { validateBrewery } = require('../models/brewery');
const router = express.Router();

const breweries = [
    {id: 1, name: 'Brouwer Henk', location: 'Zwevegem'},
    {id: 2, name: 'Brouwerij De Ranke', location: 'Dottignies'},
    {id: 3, name: 'Brouwerij De Struise Brouwers', location: 'Oostvleter'},
    {id: 4, name: 'Brouwerij De Dolle Brouwers', location: 'Esen'},
    {id: 5, name: 'Brouwerij De Leite', location: 'Kortrijk'},
    {id: 6, name: 'Brouwerij De Late', location: 'Kortrijk'}
];

// Get all breweries
router.get('/', (req, res) => {
    res.send(breweries);
});

// Create a new brewery
router.post('/', (req, res) => {
    const result = validateBrewery(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        }
    const brewery = {
        id: breweries.length + 1,
        name: req.body.name,
        location: req.body.type,
    }
    breweries.push(brewery);
    res.send(brewery);
});

//Update brewery
router.put('/:id', (req, res) => {
    const brewery = breweries.find(brewery => brewery.id === parseInt(req.params.id));
    if (!brewery) {
        res.status(404).send('brewery not found');
    }
    const result = validateBrewery(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    }
    brewery.name = req.body.name;
    brewery.location = req.body.type;
    res.send(brewery);

});

//Delete brewery
router.delete('/:id', (req, res) => {
    const brewery = breweries.find(brewery => brewery.id === parseInt(req.params.id));
    if (!brewery) {
        res.status(404).send('brewery not found');
    }
    const index = breweries.indexOf(brewery);
    breweries.splice(index, 1);
    res.send(brewery);
});

//Delete all beers
router.delete('/', (req, res) => {
    breweries.splice(0, breweries.length);
    res.send(breweries);
});

// Export the router
module.exports = router;