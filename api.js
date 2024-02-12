const express = require('express')
const router = express.Router();

/**
 * @swagger
 * /:
 * get:
 *      summary: Check if get method is working or not
 *      description: Check if get method is working or not
 *      responses: 
 *          200:
 *              description: Hey There
 */

router.get('/', function(req, res){
    res.send('Hey There!!!');
});

module.exports = router;