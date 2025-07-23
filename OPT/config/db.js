const mongoose = require("mongoose");

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to the db");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToDb;