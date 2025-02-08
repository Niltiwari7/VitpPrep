import { createSlice } from "@reduxjs/toolkit";

const topicQuestionSlice = createSlice({
    name: 'subtopicById',
    initialState: {
        subtopicById: {}
    },
    reducers: {
        updateSubtopicsById: (state, action) => {
            console.log(action.payload);

            if (Array.isArray(action.payload)) {
                console.log("UpdatedSubtopic debugger: ", action.payload);
                state.subtopicById = action.payload.reduce((acc, subtopic) => {
                    acc[subtopic._id] = subtopic;  // Ensure consistency in the field name (_id vs. id)
                    return acc;
                }, {}); // Mutating state directly
            } else {
                // If action.payload is an object, ensure it merges correctly
                Object.assign(state.subtopicById, action.payload);
            }
        },

        addSubTopic: (state, action) => {
            // Ensure the payload structure has `id` and `subtopic`
            state.subtopicById[action.payload.id] = action.payload.subtopic;
        },

        deleteSubTopic: (state, action) => {
            // Ensure action.payload has the `id` field
            delete state.subtopicById[action.payload.id];
        },
    }
});

export const { updateSubtopicsById, addSubTopic, deleteSubTopic } = topicQuestionSlice.actions;
export default topicQuestionSlice.reducer;
