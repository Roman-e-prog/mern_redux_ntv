import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import breakingNewsService from "./breakingNewsService";
const initialState = {
    breakingNews: {},
    allBreakingNews:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:"",
}
export const createBreakingNews = createAsyncThunk("breakingNews/create", async (breakingNewsData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await breakingNewsService.createBreakingNews(breakingNewsData, token);
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
export const updateBreakingNews = createAsyncThunk("breakingNews/update", async (updateData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await breakingNewsService.updateBreakingNews(updateData, token);
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
export const deleteBreakingNews = createAsyncThunk("breakingNews/delete", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await breakingNewsService.deleteBreakingNews(id, token);
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
export const getBreakingNews = createAsyncThunk("breakingNews/find/", async (id, thunkAPI)=>{
    try{
        return await breakingNewsService.getBreakingNews(id);
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
export const getAllBreakingNews = createAsyncThunk("breakingNews/findAll/", async (_, thunkAPI)=>{
    try{
        return await breakingNewsService.getAllBreakingNews();
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const breakingNewsSlice = createSlice({
    name:"breakingNews",
    initialState,
    reducers: {
        reset: (state)=>initialState
    }, extraReducers: (builder)=>{
        builder
        .addCase(createBreakingNews.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createBreakingNews.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allBreakingNews.push(action.payload);
        })
        .addCase(createBreakingNews.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateBreakingNews.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateBreakingNews.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.breakingNews = action.payload;
        })
        .addCase(updateBreakingNews.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteBreakingNews.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteBreakingNews.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allBreakingNews = state.allBreakingNews.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deleteBreakingNews.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getBreakingNews.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getBreakingNews.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.breakingNews = action.payload;
        })
        .addCase(getBreakingNews.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllBreakingNews.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllBreakingNews.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allBreakingNews = action.payload;
        })
        .addCase(getAllBreakingNews.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});
export const {reset} = breakingNewsSlice.actions
export default breakingNewsSlice.reducer