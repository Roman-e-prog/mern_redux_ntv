import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import dayLinksService from "./dayLinksService";
const initialState = {
    dayLink:{},
    dayLinks: [],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:"",
}
export const createDayLinks = createAsyncThunk("dayLinks/create", async (dayLinksData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dayLinksService.createDayLinks(dayLinksData, token);
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
export const updateDayLinks = createAsyncThunk("dayLinks/update", async (updateData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dayLinksService.updateDayLinks(updateData, token);
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
export const deleteDayLinks = createAsyncThunk("dayLinks/delete", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dayLinksService.deleteDayLinks(id, token);
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
export const getDayLinks = createAsyncThunk("dayLinks/find/", async (id, thunkAPI)=>{
    try{
        return await dayLinksService.getDayLinks(id);
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
export const getAllDayLinks = createAsyncThunk("dayLinks/findAll/", async (_, thunkAPI)=>{
    try{
        return await dayLinksService.getAllDayLinks();
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const dayLinksSlice = createSlice({
    name:"dayLinks",
    initialState,
    reducers:{
        reset: (state)=>initialState,
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createDayLinks.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createDayLinks.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dayLinks.push(action.payload);
        })
        .addCase(createDayLinks.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateDayLinks.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateDayLinks.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dayLink = action.payload;
        })
        .addCase(updateDayLinks.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteDayLinks.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteDayLinks.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dayLinks = state.dayLinks.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deleteDayLinks.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getDayLinks.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getDayLinks.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dayLink = action.payload;
        })
        .addCase(getDayLinks.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllDayLinks.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllDayLinks.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dayLinks = action.payload;
        })
        .addCase(getAllDayLinks.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})
export const {reset} = dayLinksSlice.actions
export default dayLinksSlice.reducer