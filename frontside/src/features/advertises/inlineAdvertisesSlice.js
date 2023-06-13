import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import inlineAdvertisesService from "./inlineAdvertisesService";
const initialState = {
    inlineAdvertise:{},
    inlineAdvertises: [],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:"",
}
//create
export const createInlineAdvertise = createAsyncThunk("inlineAdvertises/create", async (inlineAdvertisesData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await inlineAdvertisesService.createInlineAdvertise(inlineAdvertisesData, token);
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
export const updateInlineAdvertise = createAsyncThunk("inlineAdvertise/update", async (updateData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await inlineAdvertisesService.updateInlineAdvertise(updateData, token);
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
export const deleteInlineAdvertise = createAsyncThunk("inlineAdvertises/delete", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await inlineAdvertisesService.deleteInlineAdvertise(id, token);
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
export const getInlineAdvertise = createAsyncThunk("inlineAdvertises/find/", async (id, thunkAPI)=>{
    try{
        return await inlineAdvertisesService.getInlineAdvertise(id);
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
export const getAllInlineAdvertise = createAsyncThunk("inlineAdvertises/findAll/", async (_, thunkAPI)=>{
    try{
        return await inlineAdvertisesService.getAllInlineAdvertise();
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
//increment
export const incrementClicked = createAsyncThunk('inlineAdvertises/increment', async (incrementData, thunkAPI)=>{
    try{
        return await inlineAdvertisesService.incrementClicked(incrementData);
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const inlineAdvertisesSlice = createSlice({
    name: "inlineAdvertises",
    initialState,
    reducers:{
        reset: (state)=>initialState
    }, 
    extraReducers: (builder)=>{
        builder
        .addCase(createInlineAdvertise.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createInlineAdvertise.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.inlineAdvertises.push(action.payload);
        })
        .addCase(createInlineAdvertise.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateInlineAdvertise.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateInlineAdvertise.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.inlineAdvertise = action.payload;
        })
        .addCase(updateInlineAdvertise.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteInlineAdvertise.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteInlineAdvertise.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.inlineAdvertises = state.inlineAdvertises.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deleteInlineAdvertise.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getInlineAdvertise.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getInlineAdvertise.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.inlineAdvertise = action.payload;
        })
        .addCase(getInlineAdvertise.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllInlineAdvertise.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllInlineAdvertise.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.inlineAdvertises = action.payload;
        })
        .addCase(getAllInlineAdvertise.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(incrementClicked.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(incrementClicked.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.inlineAdvertise = action.payload;
        })
        .addCase(incrementClicked.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});
export const {reset} = inlineAdvertisesSlice.actions;
export default inlineAdvertisesSlice.reducer;