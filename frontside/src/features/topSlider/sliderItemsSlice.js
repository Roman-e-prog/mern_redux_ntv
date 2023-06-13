import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import sliderItemsService from "./sliderItemsService";
const initialState ={
    sliderItem:{},
    sliderItems:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
export const createSliderItems = createAsyncThunk("sliderItem/create", async (sliderItemsData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await sliderItemsService.createSliderItems(sliderItemsData, token);
    } catch(error){
        const message = (error.response && 
            error.response.data && 
            error.response.data.message)
            || error.message
            || error.toString()
            return thunkAPI.rejectWithValue(message);
    }
})
//update
export const updateSliderItems = createAsyncThunk("sliderItem/update", async (updateData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await sliderItemsService.updateSliderItems(updateData, token);
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
export const deleteSliderItems = createAsyncThunk("sliderItem/delete", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await sliderItemsService.deleteSliderItems(id, token);
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
export const getSliderItems = createAsyncThunk("sliderItem/find/", async (id, thunkAPI)=>{
    try{
        return await sliderItemsService.getSliderItems(id);
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
export const getAllSliderItems = createAsyncThunk("sliderItem/findAll/", async (_, thunkAPI)=>{
    try{
        return await sliderItemsService.getAllSliderItems();
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const sliderItemsSlice = createSlice({
    name:"sliderItems",
    initialState,
    reducers:{
        reset: (state)=>initialState
    }, extraReducers: (builder)=>{
        builder
        .addCase(createSliderItems.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createSliderItems.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.sliderItems.push(action.payload)
        })
        .addCase(createSliderItems.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateSliderItems.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateSliderItems.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.sliderItem = action.payload;
        })
        .addCase(updateSliderItems.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteSliderItems.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteSliderItems.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.sliderItems = state.sliderItems.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deleteSliderItems.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getSliderItems.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getSliderItems.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.sliderItem = action.payload;
        })
        .addCase(getSliderItems.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllSliderItems.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllSliderItems.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.sliderItems = action.payload;
        })
        .addCase(getAllSliderItems.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})
export const {reset} = sliderItemsSlice.actions;
export default sliderItemsSlice.reducer;