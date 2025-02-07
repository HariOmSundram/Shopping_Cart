const Cart = require('../src/cart');
const fs = require('fs');
const path = require('path');

describe('Shopping Cart Tests', () => {
    let cart;

    // Initialize a new instance of ShoppingCart before each test
    beforeEach(() => {
        cart = new Cart({
            fetchProduct_Price: jest.fn((productName) => {
                const productData = fetchProductData(productName); // this will fetch the test_data
                return { price: productData.price };  // returns the price
            })
        });
    });

    function fetchProductData(productName) {
        const testFilePath = path.join(__dirname, './test_data', `${productName}.json`); //path for finding the relevent test_data
        try {
            const data = fs.readFileSync(testFilePath, 'utf8');//used utf8 to ensure the text read is a string
            return JSON.parse(data);
        } catch (error) {
            throw new Error('Product not found');//handling exception if file not found
        }
    }

    test('should add a product to the cart', async () => {
        const productData = fetchProductData("cornflakes");

        const price = cart.apiClient.fetchProduct_Price("cornflakes").price;// using fetchProduct_Price to return request price

        await cart.addProduct("cornflakes", 1);//used await so that asynchronous process completes and then passes the quantity of product 

        expect(cart.items["cornflakes"].quantity).toBe(1);//checking if the quantity of product is 1
        expect(cart.items["cornflakes"].price).toBe(price);//checking if the price of product is same as the price fetched
    });
    test('should update quantity when adding the same product again', async () => {
        const productData = fetchProductData("cornflakes");

        await cart.addProduct("cornflakes", 1);
        await cart.addProduct("cornflakes", 2);

        expect(cart.items["cornflakes"].quantity).toBe(3);
    });

    test('should calculate subtotal correctly', async () => {
        const cornflakesData = fetchProductData("cornflakes");//stores the data of product
        const weetabixData = fetchProductData("weetabix");

        await cart.addProduct("cornflakes", 2); // 4.99 * 2
        await cart.addProduct("weetabix", 1); // 7.29 * 1

        const subtotal = (cornflakesData.price * 2) + (weetabixData.price * 1);//
        expect(cart.getCartState().subtotal).toBe(subtotal);
    });

    test('should calculate tax correctly', async () => {
        const cornflakesData = fetchProductData("cornflakes");
        const weetabixData = fetchProductData("weetabix");

        await cart.addProduct("cornflakes", 2); // 4.99 * 2
        await cart.addProduct("weetabix", 1); // 7.29 * 1

        const subtotal = (cornflakesData.price * 2) + (weetabixData.price * 1);
        let tax = subtotal * 0.125;
        tax = parseFloat(tax.toFixed(2));//tax is 12.5% of subtotal used tofixed to round off to 2 decimal places
        expect(cart.getCartState().tax).toBe(tax);//used parseFloat to convert string to number
    });

    test('should calculate total payable correctly', async () => {
        const cornflakesData = fetchProductData("cornflakes");
        const weetabixData = fetchProductData("weetabix");

        await cart.addProduct("cornflakes", 2); // 4.99 * 2
        await cart.addProduct("weetabix", 1); // 7.29 * 1

        const subtotal = (cornflakesData.price * 2) + (weetabixData.price * 1);
        let tax = subtotal * 0.125;
        tax = parseFloat(tax.toFixed(2)); // Round tax to 2 decimal places
    
        let total = subtotal + tax;
        total = parseFloat(total.toFixed(2)); // Round total to 2 decimal places
        expect(cart.getCartState().total).toBe(parseFloat(total));
    });

    test('should throw an error for invalid product', async () => {
        await expect(cart.addProduct("nonexistent_product", 1)).rejects.toThrow("Product not found");
    });
});