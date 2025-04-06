import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name:'admin',
    initialState:{
        adminInfo:{},
        isAuthenticated:false,
        role:'admin',
        dashboardStats:{},
    },
    reducers:{
        updateAdminInfo:(state,action)=>{
            state.adminInfo = action.payload;
        },
        login:(state,action)=>{
            state.isAuthenticated = true;
            state.adminInfo = action.payload;
            state.role = action.payload.role || 'admin';
            
        },
        logout: (state)=>{
            state.isAuthenticated=false;
            state.dashboardStats={};
        },
        setDashboardStats:(state,action)=>{
            state.dashboardStats = action.payload;
        },
    },
});
export const {login,logout,setDashboardStats,updateAdminInfo} = adminSlice.actions;

export default adminSlice.reducer;