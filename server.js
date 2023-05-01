const express = require('express'),
    bodyParser = require('body-parser'),
    swaggerJsdoc = require('swagger-jsdoc'),
    swaggerUi = require('swagger-ui-express');

const app = express();
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Simple Express Application -  Swagger Test',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3000/books',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/books', require('./routes/books'));

const PORT = process.env.PORT || 3000;
app.listen(PORT);

console.debug('Server listening on port: ' + PORT);
