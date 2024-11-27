import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: [20, "Name cannot be more than 20 characters"]
    },
    price: {
        type: Number,
        required: [true, "Please provide a price"]
    },
    featued: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    company: {
        type: String,
        enum: {
            values: ["apple", "samsung", "dell", "mi"],
            message: "{VALUE} is not supported"
        }
    }
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;