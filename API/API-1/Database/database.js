import mongoose from "mongoose";

const connectDB = async (url) => {
    try {
        const conn = await mongoose.connect(url);
        console.log(`Database Connected successfully ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;