import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import inlineNewsService from "./inlineNewsService";

const initialState = {
    inlineNews:{},
    allInlineNews:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:"",
};
//create
export const createInlineNews = createAsyncThunk("inlinenews/create", async (inlineNewsData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await inlineNewsService.createInlineNews(inlineNewsData, token);
    }catch(error){
        const message = (error.response && 
            error.response.data && 
            error.response.data.message)
            || error.message
            || error.toString()
            return thunkAPI.rejectWithValue(message);
    }
})
//update
export const updateInlineNews = createAsyncThunk("inlineNews/update", async (updateData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await inlineNewsService.updateInlineNews(updateData, token);
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
export const deleteInlineNews = createAsyncThunk("inlineNews/delete", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await inlineNewsService.deleteInlineNews(id, token);
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
export const getInlineNews = createAsyncThunk("inlineNews/find/", async (id, thunkAPI)=>{
    try{
        return await inlineNewsService.getInlineNews(id);
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
export const getAllInlineNews = createAsyncThunk("inlineNews/findAll", async (_, thunkAPI)=>{
    try{
        return await inlineNewsService.getAllInlineNews();
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const incrementClicked = createAsyncThunk('inlineNews/increment', async (incrementData, thunkAPI)=>{
    try{
        return await inlineNewsService.incrementClicked(incrementData);
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
        return await inlineNewsService.incrementStars(evaluateData);
    }  catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const inlineNewsSlice = createSlice({
    name:"inlineNews",
    initialState,
    reducers:{
        reset: (state)=>initialState
    }, extraReducers: (builder)=>{
        builder
        .addCase(createInlineNews.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createInlineNews.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allInlineNews.push(action.payload);
        })
        .addCase(createInlineNews.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateInlineNews.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateInlineNews.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.inlineNews = action.payload;
        })
        .addCase(updateInlineNews.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteInlineNews.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteInlineNews.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allInlineNews = state.allInlineNews.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deleteInlineNews.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getInlineNews.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getInlineNews.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.inlineNews = action.payload;
        })
        .addCase(getInlineNews.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllInlineNews.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllInlineNews.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allInlineNews = action.payload;
        })
        .addCase(getAllInlineNews.rejected, (state, action)=>{
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
            state.inlineNews = action.payload;
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
            state.inlineNews = action.payload;
        })
        .addCase(incrementStars.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});
export const {reset} = inlineNewsSlice.actions;
export default inlineNewsSlice.reducer