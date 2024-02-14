const express = require('express')
const app = express();
const connection = require('./database')
const dotenv = require('dotenv').config()

const swaggerJsDoc = require('swagger-jsdoc'),
      swaggerUi = require('swagger-ui-express')

const productRoutes = require('./Product/product.controller')

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

app.use('/products',productRoutes);

const options = {
    definition:{
        openapi: '3.0.0',
        info: {
            title : 'Node JS API project',
            description: 'This is a sample swagger application',
            version: '1.0.6'
        },
        servers : [
            {
                url: process.env.LOCAL_URL
            }
        ]
    },

    apis: ['./product/product.controller.js']
}

const swaggerSpec = swaggerJsDoc(options)
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
if (swaggerSpec instanceof Error) {
    console.error('Error generating Swagger documentation:', swaggerSpec);
} else {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
