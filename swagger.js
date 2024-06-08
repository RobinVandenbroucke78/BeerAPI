const swaggerAutogen = require('swagger-autogen')()
//import { port } from '.'

const endpointsFiles = ['./index.js']
const doc = {
    info: {
        title: "SnookerPocket API with Swagger",
        description: "api description",
    },
    host: `localhost:3000`,
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