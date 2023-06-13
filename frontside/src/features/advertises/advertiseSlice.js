import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import advertisesService from "./advertisesService";


const initialState = {
    advertise:{},
    advertises:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:"",
}
export const createAdvertise = createAsyncThunk("advertises/create", async (advertiseData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await advertisesService.createAdvertises(advertiseData, token);
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
export const updateAdvertise = createAsyncThunk("advertises/update", async (updateData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await advertisesService.updateAdvertise(updateData, token);
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
export const deleteAdvertise = createAsyncThunk("advertises/delete", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await advertisesService.deleteAdvertise(id, token);
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
export const getAdvertise = createAsyncThunk("advertises/find/", async (id, thunkAPI)=>{
    try{
        return await advertisesService.getAdvertise(id);
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
export const getAllAdvertise = createAsyncThunk("advertises/findAll/", async (_, thunkAPI)=>{
    try{
        return await advertisesService.getAllAdvertise();
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
export const incrementClicked = createAsyncThunk('advertises/increment', async (incrementData, thunkAPI)=>{
    try{
        return await advertisesService.incrementClicked(incrementData);
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const advertisesSlice = createSlice({
    name:"advertises",
    initialState,
    reducers:{
       reset: (state)=>initialState
    }, 
    extraReducers: (builder)=>{
        builder
        .addCase(createAdvertise.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createAdvertise.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.advertises.push(action.payload);
        })
        .addCase(createAdvertise.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateAdvertise.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateAdvertise.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.advertise = action.payload;
        })
        .addCase(updateAdvertise.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteAdvertise.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteAdvertise.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.advertises = state.advertises.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deleteAdvertise.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAdvertise.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAdvertise.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.advertise = action.payload;
        })
        .addCase(getAdvertise.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllAdvertise.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllAdvertise.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.advertises = action.payload;
        })
        .addCase(getAllAdvertise.rejected, (state, action)=>{
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
            state.advertise = action.payload;
        })
        .addCase(incrementClicked.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});
export const {reset} = advertisesSlice.actions;
export default advertisesSlice.reducer;