import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderType: [],
    orderStatus: [],
    payment: [],
    search:""
};


const filterData = (state,payload) =>{
    return state.includes(payload) 
    ? state.filter((item)=> item !== payload) 
    : state.concat(payload)
}

const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        setOrderType(state, action){
            state.orderType = filterData(state.orderType, action.payload)
        },
        setOrderStatus(state, action){
            state.orderStatus = filterData(state.orderStatus, action.payload)
        },
        setPayment(state, action){
            state.payment = filterData(state.payment, action.payload)
        },
        searchQuery(state,action){
            state.search = action.payload
        }
    }

})

export const {setOrderStatus, setPayment,setOrderType,searchQuery } = filterSlice.actions;

export default filterSlice.reducer;
