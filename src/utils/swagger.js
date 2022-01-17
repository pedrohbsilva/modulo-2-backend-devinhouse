const swaggerAutogen = require('swagger-autogen')()
const outputFile  = './src/swagger_output.json';

const endpointsFiles = ['./src/server.js'];
    
const doc = {
    info: {
    title: 'My API',
    description: 'Description',
    },
    host: 'localhost:3333'
};

swaggerAutogen(outputFile , endpointsFiles, doc)
