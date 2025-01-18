import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name:'admin',
    initialState:{
        isAuthenticated:false,
        dashboardStats:{},
    },
    reducers:{
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
export const {login,logout,setDashboardStats} = adminSlice.actions;

export default adminSlice.reducer;