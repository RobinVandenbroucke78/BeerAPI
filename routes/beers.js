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

//geef alle beers terug
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

//post
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

function validateBeers(beer){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        type: Joi.string().min(3)
    })
    return schema.validate(beer);
}

module.exports = router;