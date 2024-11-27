/* eslint-disable no-unused-vars */

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: []
}
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        fetchProducts(state, action) {
            state.data = action.payload
        }
    }
})

export const { fetchProducts } = productSlice.actions
export default productSlice.reducer


export function getProduct() {
    return async function getProductThunk(dispatch, getState) {
        const data = await fetch("https://fakestoreapi.com/products")
        const result = await data.json()
        dispatch(fetchProducts(result))
    }
}