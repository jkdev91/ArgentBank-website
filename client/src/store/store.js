import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    // manage the login process
      auth: authReducer,

    // manage the user info



  },
});

export default store