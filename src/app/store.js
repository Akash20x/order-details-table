import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../feature/filterSlice";

const store = configureStore({
    reducer: {
        filter: filterReducer,
    }
})

export default store;