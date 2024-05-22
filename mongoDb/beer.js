const mongoose = require('mongoose');
const Joi = require('joi');

mongoose.connect('mongodb+srv://robinvandenbroucke2:MaMTsORgBD24erKY@node.ckpcixi.mongodb.net/')
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log("Error connecting to DB: " + err));

const beerSchema = new mongoose.Schema({
    name: String,
    type: String,
    alcohol: Number,
    content: Number,
    price: Number,
})

const Beers = mongoose.model('Beers', beerSchema)

const beer = new Beers({
    name: "Heineken",
    type: "Blond",
    alcohol: 5,
    content: 25,
    price: 1.20
})

const beeri = new Beers({
    name: "Stella",
    type: "Blond",
    alcohol: 5,
    content: 25,
    price: 1.20
})

//createBeers
async function createBeer(beer){
    const newBeer = new Beers(beer);
    const result = await newBeer.save();
}

createBeer(beer);
createBeer(beeri);

//Get all Beers
async function getBeers(){
    const beers = await Beers
    .find()
    .limit(2)
    console.log(beers);
}

//Get beers by alocohol
async function getBeersByAlcohol(alcohol){
    const beers = await Beers
    .find({alcohol: {$gte: alcohol}})
    console.log(beers);
}

getBeersByAlcohol(beer.alcohol);


//Get all beers by price
async function getBeersByPrice(price){
    const beers = await Beers
    .find({price: {$gte: price}})
    console.log("--------------------Price---------------" + "\n" + beers);
}

getBeersByPrice(beer.price);

//getBeers();

async function updateBeer(id){
    const beers = await Beers.findByIdAndUpdate(
        {_id: id},
        {
            $set: {
                name: beeri.name,
                type: beeri.type
            }
        },{new: true}
    );
    console.log(beers)
}

//updateBeer(beer._id);

async function deleteCourse(id){
    const result = await Course.findByIdAndDelete(id)
    console.log(result);
}

async function deleteAll(){
    const result = await Course.deleteMany();
    console.log(result);
}