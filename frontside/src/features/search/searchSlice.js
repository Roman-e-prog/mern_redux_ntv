import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    searchValue:[],
}

const searchSlice = createSlice({
    name:"seachValue",
    initialState,
    reducers:{
        createSearch:(state, action)=>{
            state.searchValue.push(action.payload)
        }
    }
})
export const {createSearch} = searchSlice.actions;
export default searchSlice.reducer