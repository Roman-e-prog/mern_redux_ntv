import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dropdownVideosService from "./dropdownVideosService";

const initialState = {
    singleDropdownVideos:{},
    dropdownVideos:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
}
export const createDropdownVideos = createAsyncThunk("dropdownVideos/create", async (dropdownVideosData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownVideosService.createDropdownVideos(dropdownVideosData, token);
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
export const updateDropdownVideos = createAsyncThunk("dropdownVideos/update", async (updateDropdownVideoData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownVideosService.updateDropdownVideos(updateDropdownVideoData, token);
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
export const deleteDropdownVideos = createAsyncThunk("dropdownVideos/delete", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownVideosService.deleteDropdownVideos(id, token);
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
export const getDropdownVideos = createAsyncThunk("dropdownVideos/find/", async (id, thunkAPI)=>{
    try{
        return await dropdownVideosService.getDropdownVideos(id);
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
export const getAllDropdownVideos = createAsyncThunk("dropdownVideos/findAll/", async (_, thunkAPI)=>{
    try{
        return await dropdownVideosService.getAllDropdownVideos();
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const dropdownVideosSlice = createSlice({
    name:"dropdownVideos",
    initialState,
    reducers:{
       reset: (state)=>initialState
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createDropdownVideos.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createDropdownVideos.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownVideos.push(action.payload);
        })
        .addCase(createDropdownVideos.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateDropdownVideos.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateDropdownVideos.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.singleDropdownVideos = action.payload;
        })
        .addCase(updateDropdownVideos.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteDropdownVideos.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteDropdownVideos.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownVideos = state.dropdownVideos.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deleteDropdownVideos.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getDropdownVideos.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getDropdownVideos.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.singleDropdownVideos = action.payload;
        })
        .addCase(getDropdownVideos.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllDropdownVideos.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllDropdownVideos.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownVideos = action.payload;
        })
        .addCase(getAllDropdownVideos.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});
export const {reset} = dropdownVideosSlice.actions;
export default dropdownVideosSlice.reducer;