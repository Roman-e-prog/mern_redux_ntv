import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dropdownWetterService from "./dropdownWetterService";

const initialState = {
    singleDropdownWetter:{},
    dropdownWetter:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
export const createDropdownWetter = createAsyncThunk("dropdownWetter/create", async (dropdownWetterData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownWetterService.createDropdownWetter(dropdownWetterData, token);
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message)
            || error.message
            || error.toString();
            return thunkAPI.rejectWithValue(message);
    }
})
//update
export const updateDropdownWetter = createAsyncThunk("dropdownWetter/update", async (updateDropdownWetterData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownWetterService.updateDropdownWetter(updateDropdownWetterData, token);
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
//delete
export const deleteDropdownWetter = createAsyncThunk("dropdownWetter/delete", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownWetterService.deleteDropdownWetter(id, token);
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
//getOne
export const getDropdownWetter = createAsyncThunk("dropdownWetter/find/", async (id, thunkAPI)=>{
    try{
        return await dropdownWetterService.getDropdownWetter(id);
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
//getall
export const getAllDropdownWetter = createAsyncThunk("dropdownWetter/findAll/", async (_, thunkAPI)=>{
    try{
        return await dropdownWetterService.getAllDropdownWetter();
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const dropdownWetterSlice = createSlice({
    name: "dropdownWetter",
    initialState,
    reducers:{
        reset: (state)=>initialState
    }, 
    extraReducers: (builder)=>{
        builder
        .addCase(createDropdownWetter.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createDropdownWetter.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownWetter.push(action.payload);
        })
        .addCase(createDropdownWetter.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateDropdownWetter.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateDropdownWetter.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.singleDropdownWetter = action.payload;
        })
        .addCase(updateDropdownWetter.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteDropdownWetter.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteDropdownWetter.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownWetter = state.dropdownWetter.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deleteDropdownWetter.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getDropdownWetter.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getDropdownWetter.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.singleDropdownWetter = action.payload;
        })
        .addCase(getDropdownWetter.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllDropdownWetter.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllDropdownWetter.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownWetter = action.payload;
        })
        .addCase(getAllDropdownWetter.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});
export const {reset} = dropdownWetterSlice.actions;
export default dropdownWetterSlice.reducer;