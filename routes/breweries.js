const express = require('express');
const router = express.Router();

const brewery = [
    {id: 1, name: 'Brouwer Henk', location: 'Zwevegem'},
    {id: 2, name: 'Brouwerij De Ranke', location: 'Dottignies'},
    {id: 3, name: 'Brouwerij De Struise Brouwers', location: 'Oostvleter'},
    {id: 4, name: 'Brouwerij De Dolle Brouwers', location: 'Esen'},
    {id: 5, name: 'Brouwerij De Leite', location: 'Kortrijk'},
    {id: 6, name: 'Brouwerij De Late', location: 'Kortrijk'}
]

// Create a new brewery
router.post('/', (req, res) => {
    const result = validateBrewery(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        }
    const breweries = {
        id: brewery.length + 1,
        name: req.body.name,
        location: req.body.type,
    }
    brewery.push(breweries);
    res.send(breweries);
});

// Get all breweries
router.get('/', (req, res) => {
  const breweries = brewery.find();
  res.send(breweries);
});

// Update a brewery by ID
router.put('/:id', async (req, res) => {
  // Validate the brewery object using Joi
  const { error } = Joi.validate(req.body, brewerySchema);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Update the brewery in the database
  const brewery = await Breweries.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!brewery) {
    return res.status(404).send('Brewery not found');
  }
  res.send(brewery);
});

// Delete a brewery by ID
router.delete('/:id', async (req, res) => {
  const brewery = await Breweries.findByIdAndRemove(req.params.id);
  if (!brewery) {
    return res.status(404).send('Brewery not found');
  }
  res.send(brewery);
});

// Export the router
module.exports = router;