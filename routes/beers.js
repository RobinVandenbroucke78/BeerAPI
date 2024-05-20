const express = require('express');
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