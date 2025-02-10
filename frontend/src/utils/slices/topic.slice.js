import { createSlice } from "@reduxjs/toolkit";
const topicSlice = createSlice({
    name: 'topic',
    initialState: {
        topics: {}
    },
    reducers: {
        updateTopic: (state, action) => {
            const { _id, name, description } = action.payload;
            if (state.topics[_id]) {
                console.log(typeof(action.payload));
                
                console.log(action.payload);
                
                state.topics = {
                    ...state.topics,
                    [_id]: {
                        ...state.topics[_id],
                        name,
                        description
                    }
                };
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