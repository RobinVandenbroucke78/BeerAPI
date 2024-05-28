const assert = require('assert');
const { saveBeer } = require('../models/beer');

describe('Test on beer not in Db', function () {
  describe('check on beer', function () {
    it('should succesfully save a Beer', async function () {
      const beerData = {
        name: 'Stella',
        type: 'Blond',
        alcohol: 5,
        content: 25,
        price: 1.4
      }
      saveBeer(beerData, (savedBeer) => {
        assert.equal(savedBeer.name, beerData.name);
        assert.equal(savedBeer.type, beerData.type);
        assert.equal(savedBeer.alcohol, beerData.alcohol);
        assert.equal(savedBeer.content, beerData.content);
        assert.equal(savedBeer.price, beerData.price);
        done();
      });
    });
  });
});


