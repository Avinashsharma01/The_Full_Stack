import fakeProduct from "../models/fakeProduct.js";

const home = async (req, res) => {
    const data = await fakeProduct.find({}).sort("title");
    res.send(data)
}

export {
    home
}