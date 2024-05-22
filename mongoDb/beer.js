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

//createBeer(beer);
//createBeer(beeri);

//Get all Beers
async function getBeers(){
    const beers = await Beers
    .find()
    .limit(2)
    console.log(beers);
}

//Get beers by alocohol
async function getBeersByAlcohol(alcohols){
    if (typeof alcohols!== 'number') {
        throw new Error('alcohol must be a number');
      }
    
      const beers = await Beers.find({ alcohol: alcohols });
      if (beers.length === 0) {
        console.log('No beers found with alcohol level greater than or equal to ' + alcohols);
      }
      console.log("------------------Alcohol--------------" + "\n" + beers);
}

//getBeersByAlcohol(5);


//Get all beers by price
async function getBeersByPrice(prices){
    if (typeof prices!== 'number') {
        throw new Error('price must be a number');
      }
    
      const beers = await Beers.find({ price: prices });
      if (beers.length === 0) {
        console.log('No beers found with price greater than or equal to ' + prices);
      }
    console.log("--------------------Price---------------" + "\n" + beers);
}

//getBeersByPrice(1.2);

//getBeers();

async function updateBeer(nameBeer, Newname, Newtype, Newalcohol, Newcontent, Newprice){
    const beers = await Beers.findOneAndUpdate(
        { name: nameBeer},
        {
            $set: {
                name: Newname,
                type: Newtype,
                alcohol: Newalcohol,
                content: Newcontent,
                price: Newprice
            }
        },{new: true}
    );
    console.log(beers)
}

updateBeer("Heineken", "Leffe", "Bruin", 6, 33, 1.50);

//Update price van beer
async function updatePrice(nameBeer,newPrice){
    if (typeof newPrice!== 'number') {
        throw new Error('newPrice must be a number');
      }
    
      const beer = await Beers.findOneAndUpdate(
        { name: nameBeer },
        {
          $set: {
            price: newPrice
          }
        },
        { new: true }
      );
      console.log("Update price: " + beer);
      return beer;
}

updatePrice("Stella", 1.40)

//updateBeer(beer._id);

async function deleteCourse(id){
    const result = await Course.findByIdAndDelete(id)
    console.log(result);
}

async function deleteAll(){
    const result = await Course.deleteMany();
    console.log(result);
}