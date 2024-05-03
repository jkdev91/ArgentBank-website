import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    // manage the login process
      auth: authReducer,
      // manage the user info
      user: userReducer,
  },
});

export default store