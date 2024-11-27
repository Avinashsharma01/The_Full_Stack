import fakeProduct from '../models/fakeProduct.js'; // Importing the fakeProduct model
import the_product from '../models/the_product.js'; // Importing the the_product model

// Controller function for the home route
const home = (req, res) => {
    res.status(200).json({
        message: 'Hello World' // Sending a JSON response with a message
    });
}

// Controller function to get all data based on query parameters
const getAlldata = async (req, res) => {
    const query = req.query; // Extracting query parameters from the request
    const queryOBJ = {}; // Initializing an empty query object

    // Adding conditions to the query object based on the query parameters
    if (query.price) {
        queryOBJ.price = { $regex: query.price, $options: 'i' }; // Adding a regex condition for price
    }
    if (query.rating) {
        queryOBJ.rating = query.rating; // Adding a condition for rating
    }
    if (query.rate) {
        queryOBJ['rating.rate'] = query.rate; // Adding a condition for rating rate
    }
    if (query.count) {
        queryOBJ['rating.count'] = query.count; // Adding a condition for rating count
    }
    if (query.id) {
        queryOBJ.id = query.id; // Adding a condition for id
    }

    const allData = await fakeProduct.find(queryOBJ); // Fetching data from the fakeProduct model based on the query object
    console.log(queryOBJ); // Logging the query object to the console
    res.status(200).json({ allData }); // Sending the fetched data as a JSON response
}

// Controller function to get product data with a specific price
const the_productData = async (req, res) => {
    const allData = await the_product.find({ price: 699 }); // Fetching data from the the_product model where price is 699
    res.status(200).json({ allData }); // Sending the fetched data as a JSON response
}

// Exporting the controller functions
export {
    home,
    getAlldata,
    the_productData
};