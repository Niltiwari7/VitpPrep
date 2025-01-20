import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name:'admin',
    initialState:{
        adminInfo:{},
        isAuthenticated:false,
        dashboardStats:{},
    },
    reducers:{
        updateAdminInfo:(state,action)=>{
            state.adminInfo = action.payload;
        },
        login:(state)=>{
            state.isAuthenticated = true;
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