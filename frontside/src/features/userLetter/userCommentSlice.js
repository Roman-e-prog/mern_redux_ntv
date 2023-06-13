import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import userCommentService from './userCommentService';
const initialState = {
    userLetterComment:{},
    allUserLetterComments:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:false,
}
export const createComment = createAsyncThunk('userLetterComments/create', async (userLetterCommentData, thunkAPI)=>{
    try{
        console.log(userLetterCommentData)
        const token = thunkAPI.getState().auth.user.accessToken;
        return await userCommentService.createComment(userLetterCommentData, token)
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const deleteUserComment = createAsyncThunk('/userLetterComments/deleteComment', async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await userCommentService.deleteUserComment(id, token)
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const getAllComments = createAsyncThunk("userLetterComments/getAllComments", async (_, thunkAPI)=>{
    try{
        return await userCommentService.getAllComments();
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const incrementCommentLike = createAsyncThunk('userLetterComments/incrementCommentLike', async (commentLikeData, thunkAPI)=>{
    try{
        return await userCommentService.incrementCommentLike(commentLikeData);
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const incrementCommentDisLike = createAsyncThunk('userLetterComments/incrementCommentDisLike', async (commentDislikeData, thunkAPI)=>{
    try{
        return await userCommentService.incrementCommentDisLike(commentDislikeData);
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const userCommentSlice = createSlice({
    name:'userLetterComments',
    initialState,
    reducers:{
        resetComment: (state)=>initialState
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createComment.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createComment.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allUserLetterComments.push(action.payload);
        })
        .addCase(createComment.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteUserComment.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteUserComment.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allUserLetterComments = state.allUserLetterComments.filter((item)=>item._id !== action.payload.id);
        })
        .addCase(deleteUserComment.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllComments.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllComments.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allUserLetterComments = action.payload;
        })
        .addCase(getAllComments.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(incrementCommentLike.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(incrementCommentLike.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.userLetterComment = action.payload;
        })
        .addCase(incrementCommentLike.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(incrementCommentDisLike.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(incrementCommentDisLike.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.userLetterComment = action.payload;
        })
        .addCase(incrementCommentDisLike.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})
export const {resetComment} = userCommentSlice.actions;
export default userCommentSlice.reducer;