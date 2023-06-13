import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import boersenwerteService from "./boersenwerteService";
const initialState = {
    boersenwert: {},
    boersenwerte: [],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
export const createBoersenwerte = createAsyncThunk("boersenwerte/create", async (boersenwerteData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await boersenwerteService.createBoersenwerte(boersenwerteData, token);
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
export const updateBoersenwerte = createAsyncThunk("boersenwerte/update", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await boersenwerteService.updateBoersenwerte(id, token);
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
export const deleteBoersenwerte = createAsyncThunk("boersenwerte/delete", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await boersenwerteService.deleteBoersenwerte(id, token);
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
export const getBoersenwerte = createAsyncThunk("boersenwerte/find/", async (id, thunkAPI)=>{
    try{
        return await boersenwerteService.getBoersenwerte(id);
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
export const getAllBoersenwerte = createAsyncThunk("boersenwerte/findAll", async (_, thunkAPI)=>{
    try{
        return await boersenwerteService.getAllBoersenwerte();
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})


export const boersenwerteSlice = createSlice({
    name:"boersenwerte",
    initialState,
    reducers:{
        reset: (state)=>initialState,
    }, 
    extraReducers: (builder)=>{
        builder
        .addCase(createBoersenwerte.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createBoersenwerte.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.boersenwerte.push(action.payload);
        })
        .addCase(createBoersenwerte.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateBoersenwerte.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateBoersenwerte.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.boersenwert = action.payload;
        })
        .addCase(updateBoersenwerte.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteBoersenwerte.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteBoersenwerte.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.boersenwerte = state.boersenwerte.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deleteBoersenwerte.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getBoersenwerte.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getBoersenwerte.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.boersenwert = action.payload;
        })
        .addCase(getBoersenwerte.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllBoersenwerte.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllBoersenwerte.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.boersenwerte = action.payload;
        })
        .addCase(getAllBoersenwerte.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})
export const {reset} = boersenwerteSlice.actions;
export default boersenwerteSlice.reducer;