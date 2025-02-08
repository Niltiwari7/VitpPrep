import { createSlice } from "@reduxjs/toolkit";

const questionByIdSlice = createSlice({
    name: 'questionById',
    initialState: {
        data: {},  // Renamed from questionById to data for clarity
       
    },
    reducers: {
        updateQuestionById: (state, action) => {    
            if (Array.isArray(action.payload)) {
                console.log("UpdatedSubtopic debugger: ", action.payload);

                state.data = action.payload.reduce((acc, question) => {
                    acc[question._id] = question;
                    return acc;
                }, {});
            } else if (typeof action.payload === 'object' && action.payload !== null) {
                state.data = { ...state.data, ...action.payload };
            } else {
                console.error("Invalid payload format for updateQuestionById:", action.payload);
            }

            state.loading = false;  // Ensure loading is set to false after update
        },

      
    }
});

export const { updateQuestionById } = questionByIdSlice.actions;

export default questionByIdSlice.reducer;
