import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dropdownSportService from "./dropdownSportService";

const initialState = {
    singleDropdownSport:{},
    dropdownSport:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
export const createDropdownSport = createAsyncThunk("dropdownSport/create", async (dropdownSportData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownSportService.createDropdownSport(dropdownSportData, token);
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
export const updateDropdownSport = createAsyncThunk("dropdownSport/update", async (updateDropdownSportData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownSportService.updateDropdownSport(updateDropdownSportData, token);
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
export const deleteDropdownSport = createAsyncThunk("dropdownSport/delete", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownSportService.deleteDropdownSport(id, token);
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
export const getDropdownSport = createAsyncThunk("dropdownSport/find/", async (id, thunkAPI)=>{
    try{
        return await dropdownSportService.getDropdownSport(id);
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
export const getAllDropdownSport = createAsyncThunk("dropdownSport/findAll/", async (_, thunkAPI)=>{
    try{
        return await dropdownSportService.getAllDropdownSport();
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
 export const dropdownSportSlice = createSlice({
    name:"dropdownSport",
    initialState,
    reducers:{
       reset: (state)=>initialState,
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createDropdownSport.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createDropdownSport.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownSport.push(action.payload);
        })
        .addCase(createDropdownSport.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateDropdownSport.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateDropdownSport.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.singleDropdownSport = action.payload;
        })
        .addCase(updateDropdownSport.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteDropdownSport.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteDropdownSport.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownSport = state.dropdownSport.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deleteDropdownSport.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getDropdownSport.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getDropdownSport.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.singleDropdownSport = action.payload;
        })
        .addCase(getDropdownSport.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllDropdownSport.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllDropdownSport.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownSport = action.payload;
        })
        .addCase(getAllDropdownSport.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});
export const {reset} = dropdownSportSlice.actions;
export default dropdownSportSlice.reducer;