import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dropdownProgrammService from "./dropdownProgrammService";

const initialState ={
    singleDropdownProgramm:{},
    dropdownProgramm:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
};
export const createDropdownProgramm = createAsyncThunk("dropdownProgramm/create", async (dropdownProgrammData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownProgrammService.createDropdownProgramm(dropdownProgrammData, token);
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
export const updateDropdownProgramm = createAsyncThunk("dropdownProgramm/update", async (updateDropdownProgrammData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownProgrammService.updateDropdownProgramm(updateDropdownProgrammData, token);
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
export const deleteDropdownProgramm = createAsyncThunk("dropdownProgramm/delete", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownProgrammService.deleteDropdownProgramm(id, token);
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
export const getDropdownProgramm = createAsyncThunk("dropdownProgramm/find/", async (id, thunkAPI)=>{
    try{
        return await dropdownProgrammService.getDropdownProgramm(id);
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
export const getAllDropdownProgramm = createAsyncThunk("dropdownProgramm/findAll/", async (_, thunkAPI)=>{
    try{
        return await dropdownProgrammService.getAllDropdownProgramm();
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const dropdownProgrammSlice = createSlice({
    name:"dropdownProgramm",
    initialState,
    reducers:{
            reset: (state)=>initialState,
        }, 
    extraReducers: (builder)=>{
        builder
        .addCase(createDropdownProgramm.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createDropdownProgramm.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownProgramm.push(action.payload);
        })
        .addCase(createDropdownProgramm.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateDropdownProgramm.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateDropdownProgramm.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.singleDropdownProgramm =action.payload;
        })
        .addCase(updateDropdownProgramm.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteDropdownProgramm.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteDropdownProgramm.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownProgramm = state.dropdownProgramm.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deleteDropdownProgramm.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getDropdownProgramm.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getDropdownProgramm.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.singleDropdownProgramm = action.payload;
        })
        .addCase(getDropdownProgramm.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllDropdownProgramm.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllDropdownProgramm.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownProgramm = action.payload;
        })
        .addCase(getAllDropdownProgramm.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }   
});
export const {reset} = dropdownProgrammSlice.actions;
export default dropdownProgrammSlice.reducer;
