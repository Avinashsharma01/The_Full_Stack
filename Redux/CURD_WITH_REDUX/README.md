# CRUD Application with Redux Toolkit

This project demonstrates a complete CRUD (Create, Read, Update, Delete) application using React and Redux Toolkit. It showcases modern state management practices and API integration.

## Project Structure

```
CURD_WITH_REDUX/
├── src/
│   ├── components/
│   │   ├── ProductList.jsx      # Displays list of products
│   │   ├── ProductDetail.jsx    # Shows product details
│   │   └── ProductForm.jsx      # Form for adding/editing products
│   ├── redux/
│   │   ├── features/
│   │   │   └── productsSlice.js # Redux slice for product management
│   │   └── store.js            # Redux store configuration
│   ├── App.jsx                 # Main application component
│   └── main.jsx                # Application entry point
```

## Redux Flow Explanation

### 1. Store Configuration
The Redux store is configured in `store.js` using Redux Toolkit's `configureStore`. It combines all reducers into a single store:

```javascript
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/productsSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
});
```

### 2. State Management (productsSlice.js)
The `productsSlice.js` file implements the core Redux logic:

#### Initial State
```javascript
const initialState = {
    products: [],          // List of all products
    selectedProduct: null, // Currently selected product
    status: 'idle',       // API call status
    error: null,          // Error messages
};
```

#### Async Thunks
The application uses several async thunks for API operations:
- `fetchProducts`: Retrieves all products
- `fetchProductById`: Gets a single product
- `addProduct`: Creates a new product
- `updateProduct`: Modifies an existing product
- `deleteProduct`: Removes a product

Each thunk follows this pattern:
```javascript
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
```

#### Reducers
The slice includes:
- Regular reducers for synchronous actions
- Extra reducers for handling async thunk states (pending, fulfilled, rejected)

### 3. Component Integration

Components interact with Redux using hooks:
- `useSelector`: To access state
- `useDispatch`: To dispatch actions

Example from ProductList.jsx:
```javascript
const dispatch = useDispatch();
const { products, status } = useSelector((state) => state.products);

useEffect(() => {
    dispatch(fetchProducts());
}, [dispatch]);
```

## Application Flow

1. **Initial Load**
   - App mounts and initializes Redux store
   - ProductList component dispatches `fetchProducts`
   - Products are loaded and displayed

2. **Create Operation**
   - User fills ProductForm
   - Form submission dispatches `addProduct`
   - New product is added to state and displayed

3. **Read Operation**
   - User clicks on product
   - `fetchProductById` is dispatched
   - ProductDetail shows selected product

4. **Update Operation**
   - User edits product in ProductForm
   - Form submission dispatches `updateProduct`
   - Product is updated in state and UI

5. **Delete Operation**
   - User clicks delete button
   - `deleteProduct` is dispatched
   - Product is removed from state and UI

## Error Handling

The application implements comprehensive error handling:
- Each async thunk includes try-catch blocks
- Errors are stored in Redux state
- UI components display error messages when needed

## Best Practices Implemented

1. **State Management**
   - Single source of truth
   - Immutable state updates
   - Normalized state structure

2. **API Integration**
   - Centralized API calls
   - Loading states
   - Error handling

3. **Component Design**
   - Separation of concerns
   - Reusable components
   - Container/presenter pattern

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Access the application at `http://localhost:5173`

## Dependencies

- React
- Redux Toolkit
- Axios
- React Router (if implemented)
- Material-UI (if used for styling)

## API Integration

The application uses the Fake Store API (`https://fakestoreapi.com`) for demonstration purposes. In a production environment, you would replace this with your actual API endpoints.
