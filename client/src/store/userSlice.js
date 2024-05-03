import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const token = localStorage.getItem('user');


// action asynchrome pour récuperer les infos du user
export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async () => {
        if (!token) {
            throw new Error('no token found in localstorage');
        }
        const request = await axios.post('http://localhost:3001/api/v1/user/profile', {} , {
            headers: {
                'content-type': "application/json",
                'Authorization': `bearer ${token}`,
            }
        });
        console.log('Request:', request);
        const response = await request.data
        console.log(response)
        return response
    },
);



const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,

    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserInfo.pending, (state) => {
            state.loading = true;
            state.user = null;
        })

        .addCase(getUserInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(getUserInfo.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            console.error(action.error.message)
        });
    },
});

export default userSlice.reducer;