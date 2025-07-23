import { configureStore } from "@reduxjs/toolkit";
import Toyreducers from "./ToySlice.js";
export const store = configureStore({
    reducer: {
        Toys: Toyreducers
    }
})

// export {
//     store
// }