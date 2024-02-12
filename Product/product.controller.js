const express = require('express');
const router = express.Router();

// To get all products
router.get('/products', function(req, res){
    res.send('Get all Products');
});

// To get a specific product by its id
router.get('/products/:id', function(req,res){
    res.send('Get product by id');
})

// To add new product
router.post('/products', function(req, res){
    res.status(201).send('Product Added');
});

// Update a product by id
router.put('/users/:id', function(req, res){
    res.send('Update produc by ID');
});

// Delete Product
router.delete('/users/:id', function(req, res){
    res.send('Delete product by ID');
});

module.exports = router;