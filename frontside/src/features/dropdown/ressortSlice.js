import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dropdownRessortService from "./dropdownRessortService";

const initialState = {
    singleDropdownRessort: {},
    dropdownRessort:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
export const createDropdownRessort = createAsyncThunk("dropdownRessort/create", async (ressortdata, thunkAPI)=>{
    try{
        console.log(ressortdata);
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownRessortService.createDropdownRessort(ressortdata, token);
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
export const updateDropdownRessort = createAsyncThunk("dropdownRessort/update", async (updateDropdownRessortData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownRessortService.updateDropdownRessort(updateDropdownRessortData, token);
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
export const deleteDropdownRessort = createAsyncThunk("dropdownRessort/delete", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownRessortService.deleteDropdownRessort(id, token);
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
export const getDropdownRessort = createAsyncThunk("dropdownRessort/find/", async (id, thunkAPI)=>{
    try{
        return await dropdownRessortService.getDropdownRessort(id);
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
export const getAllDropdownRessort = createAsyncThunk("dropdownRessort/findAll/", async (_, thunkAPI)=>{
    try{
        return await dropdownRessortService.getAllDropdownRessort();
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const dropdownRessortSlice = createSlice({
    name:"dropdownRessort",
    initialState,
    reducers:{
        reset: (state)=>initialState,
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createDropdownRessort.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createDropdownRessort.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownRessort.push(action.payload);
        })
        .addCase(createDropdownRessort.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateDropdownRessort.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateDropdownRessort.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.singleDropdownRessort = action.payload;
        })
        .addCase(updateDropdownRessort.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteDropdownRessort.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteDropdownRessort.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownRessort = state.dropdownRessort.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deleteDropdownRessort.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getDropdownRessort.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getDropdownRessort.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.singleDropdownRessort = action.payload;
        })
        .addCase(getDropdownRessort.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllDropdownRessort.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllDropdownRessort.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownRessort = action.payload;
        })
        .addCase(getAllDropdownRessort.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});
export const {reset} = dropdownRessortSlice.actions;
export default dropdownRessortSlice.reducer;