import { createSlice } from "@reduxjs/toolkit";

const subtopicSlice = createSlice({
  name: 'subtopic',
  initialState: {
    subtopics: {}
  },
  reducers: {
 
    updateSubtopics: (state, action) => {
      if (Array.isArray(action.payload)) {
        console.log('UpdatedSubtopic debuger: ',action.payload);
        state.subtopics = action.payload.reduce((acc, subtopic) => {
            console.log('mere bharat mahan',subtopic);
            
          acc[subtopic._id] = subtopic; 
          return acc; 
        }, {});
      } else {
        state.subtopics = { ...state.subtopics, ...action.payload };
      }
    },

    // Add a single subtopic
    addSubTopic: (state, action) => {
      state.subtopics[action.payload.id] = action.payload.subtopic;
    },

    // Delete a subtopic by id
    deleteSubTopic: (state, action) => {
      delete state.subtopics[action.payload.id];
    }
  }
});

export const { updateSubtopics, addSubTopic, deleteSubTopic } = subtopicSlice.actions;

export default subtopicSlice.reducer;
