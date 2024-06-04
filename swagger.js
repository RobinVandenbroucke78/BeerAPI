const swaggerAutogen = require('swagger-autogen')()
//import { port } from '.'

const endpointsFiles = ['./index.js']
const doc = {
    info: {
        title: "SnookerPocket API with Swagger",
        description: "api description",
    },
    host: `https://beerapi-wgf2.onrender.com`,
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: "Beers"
        }
    ]
}

swaggerAutogen(endpointsFiles, doc)