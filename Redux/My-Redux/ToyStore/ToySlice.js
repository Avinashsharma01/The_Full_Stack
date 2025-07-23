/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

export const ToySlice = createSlice({
    name: 'Toys',
    initialState: {
        cars: 5,
        dolls: 4
    },
    reducers: {
        addCar: (state, action) => {
            state.cars = state.cars + 1
        },
        removeCar: (state, action) => {
            if (state.cars > 0) {
                state.cars = state.cars - 1
            }
        },
        addDolls: (state, action) => {
            state.dolls = state.dolls + 1
        },
        removeDolls: (state, action) => {
            if (state.dolls > 0) {
                state.dolls = state.dolls - 1
            }
        }
    }
})

export const { addCar, removeCar, addDolls, removeDolls } = ToySlice.actions

export default ToySlice.reducer