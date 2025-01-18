import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../utils/slices/user.slice.js';
import adminReducer from '../utils/slices/admin.slice.js';

const store = configureStore({
    reducer:{
        admin:adminReducer,
        user:userReducer
    }
})

export default store;