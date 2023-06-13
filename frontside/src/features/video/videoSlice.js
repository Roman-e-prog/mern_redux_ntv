import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import videosService from "./videosService";

const initialState = {
    video:{},
    videos:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:"",
}
export const createVideos = createAsyncThunk("videos/create", async (videosData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await videosService.createVideos(videosData, token);
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
export const updateVideos = createAsyncThunk("videos/update", async (updateData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await videosService.updateVideos(updateData, token);
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
export const deleteVideos = createAsyncThunk("videos/delete", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await videosService.deleteVideos(id, token);
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
export const getVideos = createAsyncThunk("videos/find/", async (id, thunkAPI)=>{
    try{
        return await videosService.getVideos(id);
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
export const getAllVideos = createAsyncThunk("videos/findAll/", async (_, thunkAPI)=>{
    try{
        return await videosService.getAllVideos();
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
export const incrementClicked = createAsyncThunk('videos/increment', async (incrementData, thunkAPI)=>{
    try{
        return await videosService.incrementClicked(incrementData);
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const videosSlice = createSlice({
    name:"videos",
    initialState,
    reducers:{
       reset: (state)=>initialState,
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createVideos.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createVideos.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.videos.push(action.payload);
        })
        .addCase(createVideos.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateVideos.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateVideos.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.video = action.payload;
        })
        .addCase(updateVideos.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteVideos.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteVideos.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.videos = state.videos.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deleteVideos.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getVideos.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getVideos.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.video = action.payload;
        })
        .addCase(getVideos.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllVideos.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllVideos.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.videos = action.payload;
        })
        .addCase(getAllVideos.rejected, (state, action)=>{
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
            state.video = action.payload;
        })
        .addCase(incrementClicked.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});
export const { reset } = videosSlice.actions;
export default videosSlice.reducer;