import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import ukraineNewsService from "./ukraineNewsService";
const initialState = {
    ukraineNews: {},
    allUkraineNews:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:"",
}
export const createUkraineNews = createAsyncThunk("ukrainenews/create", async (ukraineNewsData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await ukraineNewsService.createUkraineNews(ukraineNewsData, token);
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
export const updateUkraineNews = createAsyncThunk("ukraineNews/update", async (updateData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await ukraineNewsService.updateUkraineNews(updateData, token);
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
export const deleteUkraineNews = createAsyncThunk("ukraineNews/delete", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await ukraineNewsService.deleteUkraineNews(id, token);
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
export const getUkraineNews = createAsyncThunk("ukraineNews/find/", async (id, thunkAPI)=>{
    try{
        return await ukraineNewsService.getUkraineNews(id);
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
export const getAllUkraineNews = createAsyncThunk("ukraineNews/findAll/", async (_, thunkAPI)=>{
    try{
        return await ukraineNewsService.getAllUkraineNews();
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const ukraineNewsSlice = createSlice({
    name:"ukraineNews",
    initialState,
    reducers: {
        reset: (state)=>initialState
    }, extraReducers: (builder)=>{
        builder
        .addCase(createUkraineNews.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createUkraineNews.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allUkraineNews.push(action.payload);
        })
        .addCase(createUkraineNews.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateUkraineNews.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateUkraineNews.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.ukraineNews = action.payload;
        })
        .addCase(updateUkraineNews.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteUkraineNews.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteUkraineNews.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allUkraineNews = state.allUkraineNews.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deleteUkraineNews.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getUkraineNews.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getUkraineNews.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.ukraineNews = action.payload;
        })
        .addCase(getUkraineNews.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllUkraineNews.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllUkraineNews.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allUkraineNews = action.payload;
        })
        .addCase(getAllUkraineNews.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});
export const {reset} = ukraineNewsSlice.actions
export default ukraineNewsSlice.reducer