import { createSlice } from "@reduxjs/toolkit";

const topicSlice = createSlice({
    name: 'topic',
    initialState: {
        topics: {}
    },
    reducers: {
        updateTopic: (state, action) => {
            // Ensure topics are stored correctly
            if (Array.isArray(action.payload)) {
                state.topics = action.payload.reduce((acc, topic) => {
                    acc[topic._id] = topic;
                    return acc;
                }, {});
            } else {
                state.topics = { ...state.topics, ...action.payload };
            }
        },
        
        addTopic: (state, action) => {
            state.topics[action.payload.id] = action.payload.topic;
        },
        removeTopic: (state, action) => {
            delete state.topics[action.payload.id];
        }
    }
});

export const { updateTopic, addTopic, removeTopic } = topicSlice.actions;

export default topicSlice.reducer;
