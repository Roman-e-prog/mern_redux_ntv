import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userLetterService from "./userLetterService";
const initialState = {
    userLetter: {},
    allUserLetters:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
export const createUserLetter = createAsyncThunk('userLetter/create', async (userLetterData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await userLetterService.createUserLetter(userLetterData, token)
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const deleteUserLetter = createAsyncThunk('userLetter/delete', async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await userLetterService.deleteUserLetter(id, token)
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const getAllUserLetter = createAsyncThunk('/userLetter/findAll', async (_, thunkAPI)=>{
    try{
        return await userLetterService.getAllUserLetter()
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
//increments
export const incrementLike = createAsyncThunk('userLetter/incrementLike', async (likeData, thunkAPI)=>{
    try{
        return await userLetterService.incrementLike(likeData);
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const incrementDisLike = createAsyncThunk('userLetter/incrementDisLike', async (dislikeData, thunkAPI)=>{
    try{
        return await userLetterService.incrementDisLike(dislikeData);
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const userLetterSlice = createSlice({
    name:'userLetter',
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createUserLetter.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createUserLetter.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allUserLetters.push(action.payload);
        })
        .addCase(createUserLetter.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteUserLetter.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteUserLetter.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allUserLetters = state.allUserLetters.filter((item)=>item._id !== action.payload.id);
        })
        .addCase(deleteUserLetter.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllUserLetter.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllUserLetter.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allUserLetters = action.payload;
        })
        .addCase(getAllUserLetter.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(incrementLike.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(incrementLike.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.userLetter = action.payload;
        })
        .addCase(incrementLike.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(incrementDisLike.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(incrementDisLike.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.userLetter = action.payload;
        })
        .addCase(incrementDisLike.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        }) 
    }
})
export const {reset} = userLetterSlice.actions; 
export default userLetterSlice.reducer;