import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import  updateUserReducer from './editSlice';
import {persistStore, persistReducer} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';


const rootReducer = combineReducers({
  // manage the login process
    auth: authReducer,
  // manage the user info
    user: userReducer,
  // manage the update user infos
    useredit: updateUserReducer,
});

const persistConfig = {
  key:'root',
  storage: createWebStorage('session'),
  blacklist: ['auth'] 
};

const getPersistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
 reducer: getPersistedReducer
});

const persistor = persistStore(store);

export { store, persistor };