const express = require('express');
const Joi = require('joi');
const router = express.Router();

const beers = [
    {id:1, name: 'Stella Artois', type: 'Blond'},
    {id:2, name: 'Heineken', type: 'Blond'},
    {id:3, name: 'Leffe', type: 'Blond'},
    {id:4, name: 'Duvel', type: 'Blond'},
    {id:5, name: 'Shimay', type: 'Brown'},
    {id:6, name: 'Guinness', type: 'Brown'},
];

//Read beers
router.get('/', (req, res) => {
    res.send(beers);
});

//geef beers terug met id: ??
router.get('/:id', (req, res) => {
    const beer = beers.find(beer => beer.id === parseInt(req.params.id));
    if (!beer) {
        res.status(404).send('Beer not found');
    }
    res.send(beer);
})

//Create Beer
router.post('/', (req, res) => {
    const result = validateBeers(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        }
    const beer = {
        id: beers.length + 1,
        name: req.body.name,
        type: req.body.type,
    }
    res.send(beer);
});

//Update beer
router.put('/:id', (req, res) => {
    const beer = beers.find(beer => beer.id === parseInt(req.params.id));
    if (!beer) {
        res.status(404).send('Beer not found');
    }
    const result = validateBeers(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    }
    beer.name = req.body.name;
    beer.type = req.body.type;
    beers.push(beer);
    res.send(beer);

});

//Delete beer
router.delete('/:id', (req, res) => {
    const beer = beers.find(beer => beer.id === parseInt(req.params.id));
    if (!beer) {
        res.status(404).send('Beer not found');
    }
    const index = beers.indexOf(beer);
    beers.splice(index, 1);
    res.send(beer);
});

function validateBeers(beer){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        type: Joi.string().min(3)
    })
    return schema.validate(beer);
}

module.exports = router;