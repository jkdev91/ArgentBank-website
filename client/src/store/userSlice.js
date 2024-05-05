import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



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
        console.log(response)
        return response
    },
);


// action pour effacer les données de l'utilisateur
export const clearUserData = createSlice({
    name: 'clearUserData',
    initialState: {},
    reducers: {
        clearUser: (state) => {
            state.user = null;
        }
    }
});

export const { clearUser } = clearUserData.actions;



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
        })
    }
});

export default userSlice.reducer;