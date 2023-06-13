import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newsletterService from "./newsletterService";
const initialState = {
    newsletter:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
export const createNewsletterOrder = createAsyncThunk('newsletter/create', async (newsletterData, thunkAPI)=>{
    try{
        return await newsletterService.createNewsletterOrder(newsletterData)
    }
    catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const getAllNewsletterOrder = createAsyncThunk('newsletter/findAll', async (_, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await newsletterService.getAllNewsletterOrder(token);
    }
    catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const deleteNewsletterOrder = createAsyncThunk('newsletter/delete', async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return newsletterService.deleteNewsletterOrder(id, token);
    }
    catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const newsletterSlice = createSlice({
    name:"newsletter",
    initialState,
    reducers:{
        reset:(state)=>initialState,
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createNewsletterOrder.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createNewsletterOrder.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.newsletter.push(action.payload);
        })
        .addCase(createNewsletterOrder.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllNewsletterOrder.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllNewsletterOrder.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.newsletter = action.payload;
        })
        .addCase(getAllNewsletterOrder.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteNewsletterOrder.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteNewsletterOrder.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.newsletter = state.newsletter.filter((item)=>item._id !== action.payload.id);
        })
        .addCase(deleteNewsletterOrder.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})
export const {reset} = newsletterSlice.actions;
export default newsletterSlice.reducer;