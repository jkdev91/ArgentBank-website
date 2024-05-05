import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Action asynchrone pour la connexion
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userCredentiels) => {
        const request = await axios.post('http://localhost:3001/api/v1/user/login', userCredentiels);
        const response = await request.data.body.token;
        console.log(response)
        // localStorage.setItem('user', response);
        return response
    }
)


// Action asynchrone pour la deconnexion
export const logout = createAsyncThunk(
    'auth/logout',
    async() => {
        return null;
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState:{
        loading: false,
        token: null,
        error: null,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading = true;
            state.token = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state, action)=>{
            state.loading = false;
            state.token = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected,(state, action)=>{
            state.loading = false;
            state.token = null;
            console.log(action.error.message);
            if(action.error.message === 'Request failed with status code 400'){
                state.error = 'Access Denied! Invalid Credentials';
            }
            else{
                state.error = null;

            }
        })
        .addCase(logout.fulfilled,(state) =>{
            state.token = null
        })        
    }
});

export default authSlice.reducer;