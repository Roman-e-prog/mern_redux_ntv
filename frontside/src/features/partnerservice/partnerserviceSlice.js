import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import partnerserviceService from "./partnerserviceService";
const initialState = {
    partnerService:{},
    partnerServices:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message: "",
}
//create
export const createPartnerservice = createAsyncThunk("partnerservice/create", async (partnerserviceData, thunkAPI) =>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await partnerserviceService.createPartnerservice(partnerserviceData, token)
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
export const updatePartnerservice = createAsyncThunk("partnerservice/update", async (updateData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await partnerserviceService.updatePartnerservice(updateData, token);
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
export const deletePartnerservice = createAsyncThunk("partnerservice/delete", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await partnerserviceService.deletePartnerservice(id, token);
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
export const getPartnerservice = createAsyncThunk("partnerservice/find/", async (id, thunkAPI)=>{
    try{
        return await partnerserviceService.getPartnerservice(id);
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
export const getAllPartnerservice = createAsyncThunk("partnerservice/findAll/", async (_, thunkAPI)=>{
    try{
        return await partnerserviceService.getAllPartnerservice();
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const partnerserviceSlice = createSlice({
    name:"patnerservice",
    initialState,
    reducers:{
        reset: (state)=>initialState,
    }, 
    extraReducers: (builder)=>{
        builder
        .addCase(createPartnerservice.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createPartnerservice.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.partnerServices.push(action.payload);
        })
        .addCase(createPartnerservice.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updatePartnerservice.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updatePartnerservice.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.partnerService = action.payload;
        })
        .addCase(updatePartnerservice.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deletePartnerservice.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deletePartnerservice.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.partnerServices = state.partnerServices.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deletePartnerservice.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getPartnerservice.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getPartnerservice.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.partnerService = action.payload;
        })
        .addCase(getPartnerservice.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllPartnerservice.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllPartnerservice.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.partnerServices = action.payload;
        })
        .addCase(getAllPartnerservice.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})
export const {reset} = partnerserviceSlice.actions;
export default partnerserviceSlice.reducer;