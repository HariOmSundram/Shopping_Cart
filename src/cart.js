const { fetchProduct_Price } = require('./apiClient');  

class ShoppingCart {
    constructor(apiClient = { fetchProduct_Price }) {
        this.apiClient = apiClient; // Use the passed apiClient or default to the default mock fetchProduct_Price
        this.items = {}; // Initializes cart as empty
    }

    // Method to add a product to the cart
    async addProduct(productName, quantity) {
        if (!this.items[productName]) {
            this.items[productName] = { quantity: 0, price: 0 };
        }
        this.items[productName].quantity += quantity;

        // Fetch the price and update it
        const productData = await this.apiClient.fetchProduct_Price(productName);
        if (productData) {
            this.items[productName].price = productData.price;
        } else {
            throw new Error("Product not found");
        }
    }

    // Method to get cart state (totals, etc.)
    getCartState() {
        let subtotal = 0;
        for (const product in this.items) {
            const item = this.items[product];
            subtotal += item.price * item.quantity;
        }

        // Calculate tax (12.5%) and total payable amount
        const tax = parseFloat((subtotal * 0.125).toFixed(2));  // Round tax up
        const total = parseFloat((subtotal + tax).toFixed(2));  // Round total up

        return {
            cart: this.items,
            subtotal,
            tax,
            total
        };
    }
}

module.exports = ShoppingCart;
