import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from 'axios';


// const token = localStorage.getItem('user');
// const token = useSelector((state) => state.auth.token)


// action asynchrome pour récuperer les infos du user
export const getUserProfile = createAsyncThunk(
    'user/getUserProfile',
    async (token) => {
        const request = await axios.post('http://localhost:3001/api/v1/user/profile', {} , {
            headers: {
                'content-type': "application/json",
                'Authorization': `Bearer ${token}`,
            }
        });
        console.log('Request:', request);
        const response = await request.data.body
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
        .addCase(getUserProfile.pending, (state) => {
            state.loading = true;
            state.user = null;
        })

        .addCase(getUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(getUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            console.error(action.error.message)
        });
    },
});

export default userSlice.reducer;