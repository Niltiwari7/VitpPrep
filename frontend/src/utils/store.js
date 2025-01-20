import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../utils/slices/user.slice.js';
import adminReducer from '../utils/slices/admin.slice.js';
import themeReducer from './slices/theme.slice.js';

const store = configureStore({
    reducer:{
        admin:adminReducer,
        user:userReducer,
        theme: themeReducer, 
    }
})

export default store;