import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./CartSlice.js"
import productSlice from "./productsSlice.js"
import ToysReducer from "../../ToyStore/ToySlice.js"
const store = configureStore({
    reducer: {
        cart: cartSlice,
        products: productSlice,
        toys: ToysReducer
    }

})

export default store