const Joi = require('joi-oid');
const mongoose = require('mongoose');
const beers = require('./routes/beers');
const breweries = require('./routes/breweries');
const users = require('./routes/users');
const auth = require('./routes/auth');
const website = require('./middleware/app');
const express = require('express');
const app = express();
const config = require('config');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

mongoose.connect('mongodb+srv://robinvandenbroucke2:MaMTsORgBD24erKY@node.ckpcixi.mongodb.net/Eindproject')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));

/*if (!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR: jwtPrivateKey not defined');
  process.exit(1);
}*/

app.use(express.json());
app.use('/api/beers', beers);
app.use('/api/breweries', breweries);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/', website);
const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Beer API with Swagger',
      version: '1.0.0',
      description: 'covered Create, Read, Update, and Delete operations using a Node.js API',
    },
    servers:[
      {url:`http://localhost:${port}`},
    ],
  },
  apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => console.log(`Listening on port ${port}...`));