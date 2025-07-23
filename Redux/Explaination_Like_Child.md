# Redux Toolkit Explained Simply

Imagine you have a toy box where you keep all your favorite toys. But there's a problem - everyone in the family wants to play with these toys, and sometimes they forget to put them back properly!

## The Toy Box (Redux Store)

Redux Toolkit is like having a special toy box with rules:

1. **One Big Toy Box**: All your toys (data) are kept in one place.
2. **Toy Manager**: Only the "toy manager" (reducer) can change how toys are arranged.
3. **Request Forms**: If you want to change something, you need to fill out a form (action).

## How It Works

Let's say we have a toy box that tracks your toy cars:

### Step 1: Set Up Your Toy Box

```javascript
// This creates your special toy box
import { configureStore } from "@reduxjs/toolkit";
import toysReducer from "./toysSlice";

const store = configureStore({
    reducer: {
        toys: toysReducer,
    },
});
```

### Step 2: Make Rules for Your Toys (Create a Slice)

```javascript
// This creates rules for handling your toys
import { createSlice } from "@reduxjs/toolkit";

const toysSlice = createSlice({
    name: "toys",
    initialState: {
        cars: 3,
        dolls: 2,
    },
    reducers: {
        // When someone wants to add a car
        addCar: (state) => {
            state.cars = state.cars + 1;
        },
        // When someone wants to remove a car
        removeCar: (state) => {
            if (state.cars > 0) {
                state.cars = state.cars - 1;
            }
        },
    },
});

// These are the "forms" people fill out to request changes
export const { addCar, removeCar } = toysSlice.actions;

export default toysSlice.reducer;
```

### Step 3: Connect Your Toy Box to Your Room (App)

```javascript
// This connects your toy box to your app
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
    return (
        <Provider store={store}>
            <ToyCounter />
        </Provider>
    );
}
```

### Step 4: Using Your Toys

```javascript
// This is how you use your toys
import { useSelector, useDispatch } from "react-redux";
import { addCar, removeCar } from "./toysSlice";

function ToyCounter() {
    // Check how many cars are in the toy box
    const carCount = useSelector((state) => state.toys.cars);

    // Get a special phone to call the toy manager
    const dispatch = useDispatch();

    return (
        <div>
            <h2>You have {carCount} cars</h2>
            <button onClick={() => dispatch(addCar())}>Get New Car</button>
            <button onClick={() => dispatch(removeCar())}>Give Away Car</button>
        </div>
    );
}
```

## The Simple Flow

Here's how it works:

1. **Start**: You set up a toy box (store) and make rules about how toys can be organized (slices).

2. **When you want a new toy**:

    - You fill out a form (dispatch an action): "I want a new car!"
    - You give this form to the toy manager (dispatch)
    - The toy manager checks the rules and adds a new car to the box

3. **When you want to see your toys**:

    - You look in the toy box (useSelector) to count how many cars you have

4. **Everyone sees the same toy box**:
    - If your sister adds a car, you'll see that the number has changed
    - If mom takes away a car, everyone will see the new count

## When Getting Toys From The Store

Sometimes getting new toys isn't instant - like when mom orders them online:

```javascript
// For toys that need to be ordered from the store
import { createAsyncThunk } from "@reduxjs/toolkit";

// This is like ordering a toy online
export const orderNewCar = createAsyncThunk("toys/orderNewCar", async () => {
    // Wait 2 seconds like waiting for delivery
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // The car has arrived!
    return { color: "red", type: "sports car" };
});

// Adding this to your rules
const toysSlice = createSlice({
    name: "toys",
    initialState: {
        cars: 3,
        dolls: 2,
        waitingForDelivery: false,
        newCar: null,
    },
    reducers: {
        // ... other reducers
    },
    extraReducers: (builder) => {
        builder
            // When you just placed the order
            .addCase(orderNewCar.pending, (state) => {
                state.waitingForDelivery = true;
            })
            // When the toy arrives
            .addCase(orderNewCar.fulfilled, (state, action) => {
                state.waitingForDelivery = false;
                state.cars = state.cars + 1;
                state.newCar = action.payload;
            });
    },
});
```

## Remember This!

1. **One Toy Box**: All your app's important information is in one place
2. **Fill Out Forms**: To change anything, you send an action (like a form)
3. **Toy Manager Handles Changes**: Only the reducer can change the state
4. **Everyone Sees The Same Toys**: All parts of your app see the same data

That's it! Redux Toolkit is just a way to keep all your app's stuff organized so everyone knows where things are and how they can be changed. No more lost toys!
