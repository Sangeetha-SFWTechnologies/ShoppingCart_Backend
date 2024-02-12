const express = require('express')
const app = express();
const connection = require('./database')
const dotenv = require('dotenv').config()
const path = require('path');

// const api = require('./api')

const swaggerJsDoc = require('swagger-jsdoc'),
      swaggerUi = require('swagger-ui-express')
const bodyparser = require('body-parser')

const apiRouter = require('./api');

app.listen(process.env.DB_PORT, function(){
    console.log("App listening on port", process.env.DB_PORT);
    connection.connect(function(error){
        if(error){
            console.log(error.stack);
            throw error;
        }
        else{
            console.log("Database Connected!!!");
        }
    })
})

app.use('/', apiRouter); 

const options = {
    definition:{
        openapi: '3.0.0',
        info: {
            title : 'Node JS API project for MySQL',
            description: 'This is a sample swagger application',
            version: '1.0.6'
        },
        servers : [
            {
                url: process.env.LOCAL_URL
            }
        ]
    },

    apis: ['./api.js']
}

const swaggerSpec = swaggerJsDoc(options)
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
if (swaggerSpec instanceof Error) {
    console.error('Error generating Swagger documentation:', swaggerSpec);
} else {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// console.log("Resolved path:", path.resolve('./api.js'));

// /**
//  * @swagger
//  * /:
//  * get:
//  *      summary: Check if get method is working or not
//  *      description: Check if get method is working or not
//  *      responses: 
//  *          200:
//  *              description: Hey There
//  */

// app.get('/', function(req,res){
//     res.send('Hey There')
// })