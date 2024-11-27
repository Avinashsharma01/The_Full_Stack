import mongoose from 'mongoose';

// Define the schema for the Product model
const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true // Ensuring that each product has a unique ID
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        rate: {
            type: Number,
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    }
});

// Create the Product model using the schema
const fakeProduct = mongoose.model('fakeAPI', productSchema);

export default fakeProduct;
