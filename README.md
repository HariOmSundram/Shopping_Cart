# Shopping Cart Assignment

## Description
This project implements a simple shopping cart system in Node.js, allowing users to add products, update quantities, and calculate totals including tax. The application retrieves product prices from a local API and provides a structured way to manage cart operations.

## Features
- Add products to the cart
- Update product quantities
- Fetch product prices from a mock API
- Calculate subtotal, tax (12.5%), and total payable amount
- Error handling for invalid product requests

## Installation
### Prerequisites
Ensure you have Node.js installed on your system. Then, install the required dependencies using npm.

### Steps
1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd shopping-cart-assignment
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the mock API server:
   ```sh
   json-server --watch db.json --port 3001
   ```

## Dependencies
The project requires the following npm packages:
- **axios**: For making HTTP requests to fetch product prices.
- **jest**: For testing the shopping cart functionality.
- **json-server**: For running a mock API server.

To install the required packages, run:
```sh
npm install axios jest json-server
```

## Usage
### Running the Application
The application does not have a UI but works through API calls and tests. You can run the test cases to validate the functionality.

### Running Tests
To execute the test cases, use the following command:
```sh
npm test
```

## Assumptions & Tradeoffs
- **Mocking API Calls**: The product price retrieval is mocked using Jest, meaning actual API calls are not made during testing.
- **Tax Calculation**: Tax is calculated at 12.5% of the subtotal. Rounding off was attempted but not fully implemented as expected.
- **Error Handling**: If a product is not found, an error is thrown to indicate the issue.

## File Structure
```
shopping-cart-assignment/
│-- src/
│   ├── cart.js  # Shopping cart logic
│-- test/
│   ├── cart.test.js  # Test cases
│   ├── test_data/  # JSON files for test products
│-- apiClient.js  # Handles API requests using axios
│-- package.json  # Project dependencies
│-- db.json  # Mock database for json-server
│-- README.md  # Documentation
```

## Future Improvements
- Implement better rounding methods for tax and total calculations.
- Add a user-friendly interface for interacting with the cart.
- Improve error handling and logging mechanisms.

## Author
Hari Om Sundram

