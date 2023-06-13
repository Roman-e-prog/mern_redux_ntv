import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import dropdownAudioService from "./dropdownAudioService";
const initialState = {
    singleDropdownAudio:{},
    dropdownAudios: [],
    isError: false,
    isSuccess:false,
    isLoading:false,
    message:"",
}
export const createDropdownAudio = createAsyncThunk("dropdownAudio/create", async (dropdownAudioData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownAudioService.createDropdownAudio(dropdownAudioData, token);
    }catch (error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
//update
export const updateDropdownAudio = createAsyncThunk("dropdownAudio/update", async (updateDropdownAudioData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownAudioService.updateDropdownAudio(updateDropdownAudioData, token);
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
export const deleteDropdownAudio = createAsyncThunk("dropdownAudio/delete", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownAudioService.deleteDropdownAudio(id, token);
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
export const getDropdownAudio = createAsyncThunk("dropdownAudio/find/", async (id, thunkAPI)=>{
    try{
        return await dropdownAudioService.getDropdownAudio(id);
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
export const getAllDropdownAudio = createAsyncThunk("dropdownAudio/findAll", async (_, thunkAPI)=>{
    try{
        return await dropdownAudioService.getAllDropdownAudio();
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const dropdownAudioSlice = createSlice({
    name: "dropdownAudio",
    initialState,
    reducers:{
        reset:(state)=> initialState
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createDropdownAudio.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createDropdownAudio.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownAudios.push(action.payload);
        })
        .addCase(createDropdownAudio.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateDropdownAudio.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateDropdownAudio.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.singleDropdownAudio = action.payload;
        })
        .addCase(updateDropdownAudio.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteDropdownAudio.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteDropdownAudio.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownAudios = state.dropdownAudios.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deleteDropdownAudio.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getDropdownAudio.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getDropdownAudio.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.singleDropdownAudio = action.payload;
        })
        .addCase(getDropdownAudio.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllDropdownAudio.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllDropdownAudio.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownAudios = action.payload;
        })
        .addCase(getAllDropdownAudio.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});
export const {reset} = dropdownAudioSlice.actions;
export default dropdownAudioSlice.reducer;