const axios = require('axios');

const BASE_URL = 'http://localhost:3001/products';

const fetchProduct_Price = async (productName) => {
    try {
        const response = await axios.get(`${BASE_URL}/${productName}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching product price: ' + error.message);
    }
};

module.exports = { fetchProduct_Price };
