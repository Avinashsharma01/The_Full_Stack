import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for the API
const BASE_URL = 'https://fakestoreapi.com/products';

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(BASE_URL); // API call to fetch all products
            return response.data; // Return the fetched data
        } catch (error) {
            return rejectWithValue(error.message); // Handle errors
        }
    }
);

// Async thunk to fetch a single product by ID
export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`); // API call to fetch product by ID
            return response.data; // Return the fetched product
        } catch (error) {
            return rejectWithValue(error.message); // Handle errors
        }
    }
);

// Async thunk to add a new product
export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (productData, { rejectWithValue }) => {
        try {
            const response = await axios.post(BASE_URL, productData); // API call to add a product
            return response.data; // Return the added product
        } catch (error) {
            return rejectWithValue(error.message); // Handle errors
        }
    }
);

// Async thunk to update an existing product
export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, productData); // API call to update a product
            return response.data; // Return the updated product
        } catch (error) {
            return rejectWithValue(error.message); // Handle errors
        }
    }
);

// Async thunk to delete a product
export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`); // API call to delete a product
            return id; // Return the deleted product's ID
        } catch (error) {
            return rejectWithValue(error.message); // Handle errors
        }
    }
);

// Initial state for the products slice
const initialState = {
    products: [], // List of all products
    selectedProduct: null, // Currently selected product
    status: 'idle', // Status of API calls: idle, loading, succeeded, failed
    error: null, // Error message, if any
};

// Create the products slice
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // Reducer to clear the selected product
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchProducts lifecycle
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'; // Set status to loading
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set status to succeeded
                state.products = action.payload; // Update products list
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'; // Set status to failed
                state.error = action.payload; // Store error message
            })

            // Handle fetchProductById lifecycle
            .addCase(fetchProductById.pending, (state) => {
                state.status = 'loading'; // Set status to loading
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set status to succeeded
                state.selectedProduct = action.payload; // Update selected product
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = 'failed'; // Set status to failed
                state.error = action.payload; // Store error message
            })

            // Handle addProduct lifecycle
            .addCase(addProduct.pending, (state) => {
                state.status = 'loading'; // Set status to loading
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set status to succeeded
                state.products.push(action.payload); // Add new product to the list
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = 'failed'; // Set status to failed
                state.error = action.payload; // Store error message
            })

            // Handle updateProduct lifecycle
            .addCase(updateProduct.pending, (state) => {
                state.status = 'loading'; // Set status to loading
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set status to succeeded
                const index = state.products.findIndex(
                    product => product.id === action.payload.id
                ); // Find the product to update
                if (index !== -1) {
                    state.products[index] = action.payload; // Update the product
                }
                state.selectedProduct = action.payload; // Update selected product
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = 'failed'; // Set status to failed
                state.error = action.payload; // Store error message
            })

            // Handle deleteProduct lifecycle
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'loading'; // Set status to loading
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set status to succeeded
                state.products = state.products.filter(
                    product => product.id !== action.payload
                ); // Remove the deleted product from the list
                if (state.selectedProduct && state.selectedProduct.id === action.payload) {
                    state.selectedProduct = null; // Clear selected product if it was deleted
                }
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed'; // Set status to failed
                state.error = action.payload; // Store error message
            });
    },
});

// Export the clearSelectedProduct action
export const { clearSelectedProduct } = productsSlice.actions;

// Export the reducer
export default productsSlice.reducer;