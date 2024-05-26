import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PURGE } from 'redux-persist';

// Action asynchrone pour la connexion
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userCredentiels) => {
        const request = await axios.post('http://localhost:3001/api/v1/user/login', userCredentiels);
        const response = await request.data.body.token;
        return response
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState:{
        loading: false,
        token: null,
        error: null,
        isChecked: false
    },
    reducers: {
        logout: (state) => {
            state.loading = false;
            state.token = null;
            state.error = null;
        },
        isChecked: (state, action) => {
            state.isChecked = action.payload;
    },
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
        .addCase(PURGE, (state)=>{
            state.loading = true;
            state.token = null;
            state.error = null;
            state.isChecked = false
        })        
    }
});

export const {isChecked, logout} = authSlice.actions;
export default authSlice.reducer;