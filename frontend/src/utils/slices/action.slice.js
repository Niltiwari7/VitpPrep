export const setUser = (user) => ({
    type:'SET_USER',
    payload:user,
})


const initialState = {
    user:{
        isAuthenticated:false,
        role:null,
    }
}


const userReducer = (state = initialState,action)=>{
    switch(action.type){
        case 'SET_USER':
            return {...state,user:action.payload};
            default:return state;
    };
}

export default userReducer;