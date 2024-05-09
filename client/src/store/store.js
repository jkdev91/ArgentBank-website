import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import  updateUserReducer from './editSlice';

const store = configureStore({
  reducer: {
    // manage the login process
      auth: authReducer,
    // manage the user info
      user: userReducer,
    // manage the update user infos
      useredit: updateUserReducer,



  },
});

export default store