import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Action asynchrone pour la connexion
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userCredentiels) => {
        const request = await axios.post('http://localhost:3001/api/v1/user/login', userCredentiels);
        const response = await request.data.body.token;
        localStorage.setItem('user', JSON.stringify(response));
        return response
    }
)



const authSlice = createSlice({
    name: 'auth',
    initialState:{
        loading: false,
        user: null,
        error: null,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state, action)=>{
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected,(state, action)=>{
            state.loading = false;
            state.user = null;
            console.log(action.error.message);
            if(action.error.message === 'Request failed with status code 400'){
                state.error = 'Access Denied! Invalid Credentials';
            }
            else{
                state.error = null;

            }
        })
    }
});

export default authSlice.reducer;