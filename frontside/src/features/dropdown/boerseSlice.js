import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dropdownBoerseService from "./dropdownBoerseService";

const initialState = {
    singleDropdownBoerse:{},
    dropdownBoerse:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:"",
}
export const createDropdownBoerse = createAsyncThunk("dropdownBoerse/create", async (dropdownBoerseData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownBoerseService.createDropdownBoerse(dropdownBoerseData, token);
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
export const updateDropdownBoerse = createAsyncThunk("dropdownBoerse/update", async (updateDropdownBoerseData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownBoerseService.updateDropdownBoerse(updateDropdownBoerseData, token);
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
export const deleteDropdownBoerse = createAsyncThunk("dropdownBoerse/delete", async (id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.accessToken;
        return await dropdownBoerseService.deleteDropdownBoerse(id, token);
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
export const getDropdownBoerse = createAsyncThunk("dropdownBoerse/find/", async (id, thunkAPI)=>{
    try{
        return await dropdownBoerseService.getDropdownBoerse(id);
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
export const getAllDropdownBoerse = createAsyncThunk("dropdownBoerse/findAll/", async (_, thunkAPI)=>{
    try{
        return await dropdownBoerseService.getAllDropdownBoerse();
    } catch(error){
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message 
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const dropdownBoerseSlice = createSlice({
    name:"dropdownBoerse",
    initialState,
    reducers: {
            reset:(state)=>initialState,
        },
    extraReducers: (builder)=>{
        builder
        .addCase(createDropdownBoerse.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createDropdownBoerse.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownBoerse.push(action.payload);
        })
        .addCase(createDropdownBoerse.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateDropdownBoerse.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateDropdownBoerse.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.singleDropdownBoerse = action.payload;
        })
        .addCase(updateDropdownBoerse.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteDropdownBoerse.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteDropdownBoerse.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownBoerse = state.dropdownBoerse.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deleteDropdownBoerse.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getDropdownBoerse.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getDropdownBoerse.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.singleDropdownBoerse = action.payload;
        })
        .addCase(getDropdownBoerse.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllDropdownBoerse.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllDropdownBoerse.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.dropdownBoerse = action.payload;
        })
        .addCase(getAllDropdownBoerse.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});
export const {reset} = dropdownBoerseSlice.actions;
export default dropdownBoerseSlice.reducer;