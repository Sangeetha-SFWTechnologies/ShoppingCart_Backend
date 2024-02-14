const express = require('express');
const router = express.Router();
const productService = require('./product.service')

router.use(express.json());

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     description: Retrieve a list of all products
 *     responses:
 *       '200':
 *         description: A list of products
 *   post:
 *     summary: Create a new product
 *     description: Create a new product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *               description:
 *                 type: string
 *                 description: The description of the product.
 *     responses:
 *       '201':
 *         description: Product created successfully
 *       '400':
 *         description: Invalid request body
 */

// To get all products
router.get('/', async (req, res) => {
    try {
        const productList = await productService.getAllProducts();
        res.json(productList); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// To get a specific product by its id
router.get('/:id', async (req,res) => {
    try {
        const productId = req.params.id;
        const productList = await productService.getProductById(productId);
        res.json(productList); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

// To add new product
router.post('/', async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const newProduct = await productService.createProduct(name, price, description);
        // res.status(201).json(newProduct);
        res.status(201).send("Product Created Successfully!!!")
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Update a product by id
router.put('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const newData = req.body;
        const result = await productService.updateProduct(productId, newData);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete Product
router.delete('/:id', function(req, res){
    res.send('Delete product by ID');
});

module.exports = router;