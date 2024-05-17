import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import  updateUserReducer from './editSlice';
import {persistStore, persistReducer} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';


const sessionStorage = createWebStorage('session');

const persistConfig = {
  key:'root',
  storage: sessionStorage,
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedUpdateUserReducer = persistReducer(persistConfig, updateUserReducer); 


const store = configureStore({
  reducer: {
    // manage the login process
      auth: persistedAuthReducer,
    // manage the user info
      user: persistedUserReducer,
    // manage the update user infos
      useredit: persistedUpdateUserReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor }