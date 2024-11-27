import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./CartSlice.js"
import productSlice from "./productsSlice.js"
const store = configureStore({
    reducer: {
        cart: cartSlice,
        products: productSlice

    }

})


export default store