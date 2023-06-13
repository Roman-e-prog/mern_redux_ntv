import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mainnewsService from "./mainnewsService";

const initialState = {
    mainNews:{},
    allMainNews: [],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:"",
};
export const createMainNews = createAsyncThunk("mainnews/create", async (mainnewsData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await mainnewsService.createMainNews(mainnewsData, token);
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
export const updateMainNews = createAsyncThunk("mainnews/update", async (updateData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await mainnewsService.updateMainNews(updateData, token);
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
export const deleteMainNews = createAsyncThunk("mainnews/delete", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await mainnewsService.deleteMainNews(id, token);
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
export const getMainNews = createAsyncThunk("mainnews/find/", async (id, thunkAPI)=>{
    try{
        return await mainnewsService.getMainNews(id);
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
export const getAllMainNews = createAsyncThunk("mainnews/findAll/", async (_, thunkAPI)=>{
    try{
        return await mainnewsService.getAllMainNews();
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
export const incrementClicked = createAsyncThunk('mainnews/increment', async (incrementData, thunkAPI)=>{
    try{
        return await mainnewsService.incrementClicked(incrementData);  
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const incrementStars = createAsyncThunk("inlineNews/incrementStars", async (evaluateData, thunkAPI)=>{
    try{
        return await mainnewsService.incrementStars(evaluateData);
    }  catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const mainnewsSlice = createSlice({
    name: "mainnews",
    initialState,
    reducers:{
       reset: (state)=>initialState
        },
        extraReducers: (builder)=>{
            builder
            .addCase(createMainNews.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(createMainNews.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.allMainNews.push(action.payload);
            })
            .addCase(createMainNews.rejected, (state,action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateMainNews.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(updateMainNews.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.mainNews = action.payload;
            })
            .addCase(updateMainNews.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteMainNews.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(deleteMainNews.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.allMainNews = state.allMainNews.filter((item)=> item._id !== action.payload.id);
            })
            .addCase(deleteMainNews.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getMainNews.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(getMainNews.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.mainNews = action.payload;
            })
            .addCase(getMainNews.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllMainNews.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(getAllMainNews.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.allMainNews = action.payload;
            })
            .addCase(getAllMainNews.rejected, (state, action)=>{
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
                state.mainNews = action.payload;
            })
            .addCase(incrementClicked.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(incrementStars.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(incrementStars.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.mainNews = action.payload;
            })
            .addCase(incrementStars.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
        }
});
export const {reset} = mainnewsSlice.actions;
export default mainnewsSlice.reducer;