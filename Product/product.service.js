const connection = require('../database');

getAllProducts = async () => {
    try {
        const [rows] = await connection.promise().query("SELECT * FROM product_list");
        return rows; 
    } catch (error) {
        throw error;
    }
}

getProductById = async (productId) => {
    try {
        const [rows] = await connection.promise().query("SELECT * FROM product_list WHERE id = ?",[productId]);
        return rows; 
    } catch (error) {
        throw error;
    }
}

createProduct = async (name, price, description) => {
    try {
        const result = await connection.promise().query('INSERT INTO product_list (name, price, description) VALUES (?, ?, ?)', [name, price, description]);
        const newProductId = result[0].insertId;
        return { id: newProductId, name, price, description };
    } catch (error) {
        throw error;
    }
};

updateProduct = async (productId, newData) => {
    try {
        const result = await connection.promise().query('UPDATE product_list SET name = ?, price = ?, description = ? WHERE id = ?', [newData.name, newData.price, newData.description, productId]);

        if (result.affectedRows === 0) {
            throw new Error('Product not found or no changes made.');
        }

        return { message: 'Product updated successfully' };
    } catch (error) {
        throw error;
    }
};

deleteProduct = async (productId)  => {
    try{
        const deletedProduct = await connection.promise().query('DELETE FROM product_list WHERE id = ?', [productId]);

        return { message: 'Product Deleted Successfully'};
    }catch (error) {
        throw error;
    }
}

module.exports = {getAllProducts, getProductById, createProduct,deleteProduct, updateProduct }