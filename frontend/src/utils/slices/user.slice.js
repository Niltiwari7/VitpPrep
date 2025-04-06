import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        isAuthenticated:false,
        userInfo:null,
        role:'user',
    },
    reducers:{
        login:(state,action)=>{
            state.isAuthenticated = true;
            state.userInfo = action.payload;
            state.role = action.payload.role || 'user';
        },
        logout:(state)=>{
            state.isAuthenticated=false;
            state.userInfo = null;
        },
        updateUserInfo:(state,action)=>{
            state.userInfo = {...state.userInfo,...action.payload}
        }
    }
})
export const { login, logout, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;