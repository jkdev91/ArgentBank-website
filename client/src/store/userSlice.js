import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserProfile } from '../store/editSlice';
import axios from 'axios';
import { PURGE } from 'redux-persist';



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
        const response = await request.data.body
        return response
    },
);


const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
    },
    reducers: {
        clearUser: (state) => {
            state.loading = false;
            state.user = null;
        }
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
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.user = action.payload
        })
        .addCase(PURGE, (state) => {
            state.loading = false;
            state.user = null;
        })
    }
});

export default userSlice.reducer;
export const { clearUser } = userSlice.actions;

