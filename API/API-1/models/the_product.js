import mongoose from 'mongoose';

// Define the schema for the Product model
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company', // Assuming you have a Company model to reference
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    colors: {
        type: [String], // Array of strings for color values
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Assuming you have a Category model to reference
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
});

// Create the Product model using the schema
const Product = mongoose.model('THE_PRODUCT', productSchema);

export default Product;
