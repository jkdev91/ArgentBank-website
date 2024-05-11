import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




// action asynchrome pour modifier le username de l'utilisateur
export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async (editUsername, thunkapi) => {
        const token = thunkapi.getState().auth.token
        const request = await axios.put('http://localhost:3001/api/v1/user/profile', editUsername, {
            headers: {
                'content-type': "application/json",
                'Authorization': `Bearer ${token}`,
            }
        });
        const response = await request.data
        console.log(response)
        return response
    },
);


const updateUserSlice = createSlice({
    name: 'useredit',
    initialState: {
        user: null,
        isModalOpen: false,
        updateUserNameStatus: 'idle',
        updateUserNameError: null,
    },
    reducers: {
        openModal: (state) => {
            state.isModalOpen = true
        },
        closeModal: (state) => {
            state.isModalOpen = false
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(updateUserProfile.pending, (state) => {
            state.updateUserNameStatus = 'loading';
            state.updateUserNameError = null;
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.updateUserNameStatus = 'succeded';
            state.user = action.payload;
            state.updateUserNameError = null;
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
            state.updateUserNameStatus = 'failed';
            state.updateUserNameError = action.error.message;
        });

    },
});

export const {openModal, closeModal} = updateUserSlice.actions;
export default updateUserSlice.reducer;