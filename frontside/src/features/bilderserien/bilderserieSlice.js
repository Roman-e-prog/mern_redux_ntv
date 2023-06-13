import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bilderserieService from "./bilderserieService";
const initialState = {
    bilderserie: {},
    allBilderserie:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
export const createBilderserie = createAsyncThunk("bilderserie/create", async (bilderserieData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await bilderserieService.createBilderserie(bilderserieData, token);
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
export const updateBilderserie = createAsyncThunk("bilderserie/update", async (updateData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await bilderserieService.updateBilderserie(updateData, token);
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
export const deleteBilderserie = createAsyncThunk("bilderserie/delete", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await bilderserieService.deleteBilderserie(id, token);
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
export const getBilderserie = createAsyncThunk("bilderserie/find/", async (id, thunkAPI)=>{
    try{
        return await bilderserieService.getBilderserie(id);
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
export const getAllBilderserie = createAsyncThunk("bilderserie/findAll/", async (_, thunkAPI)=>{
    try{
        return await bilderserieService.getAllBilderserie();
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const bilderserieSlice = createSlice({
    name:"bilderserie",
    initialState,
    reducers:{
        reset: (state)=>initialState
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createBilderserie.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createBilderserie.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allBilderserie.push(action.payload);
        })
        .addCase(createBilderserie.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateBilderserie.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateBilderserie.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.bilderserie = action.payload;
        })
        .addCase(updateBilderserie.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteBilderserie.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteBilderserie.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allBilderserie = state.allBilderserie.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deleteBilderserie.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getBilderserie.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getBilderserie.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.bilderserie = action.payload;
        })
        .addCase(getBilderserie.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllBilderserie.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllBilderserie.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allBilderserie = action.payload;
        })
        .addCase(getAllBilderserie.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }  
});
export const {reset} = bilderserieSlice.actions;
export default bilderserieSlice.reducer

