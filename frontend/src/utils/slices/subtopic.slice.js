import { createSlice } from "@reduxjs/toolkit";

const subtopicSlice = createSlice({
  name: "subtopic",
  initialState: {
    subtopics: {},
  },
  reducers: {
    updateSubtopics: (state, action) => {
      if (Array.isArray(action.payload)) {
        console.log("UpdatedSubtopic debugger: ", action.payload);
        state.subtopics = action.payload.reduce((acc, subtopic) => {
          acc[subtopic._id] = subtopic;
          return acc;
        }, {}); // ✅ Mutating state directly
      } else {
        Object.assign(state.subtopics, action.payload); // ✅ Merge objects correctly
      }
    },
    

    addSubTopic: (state, action) => {
      state.subtopics[action.payload.id] = action.payload.subtopic;
    },

    deleteSubTopic: (state, action) => {
      delete state.subtopics[action.payload.id];
    },
  },
});

export const { updateSubtopics, addSubTopic, deleteSubTopic } = subtopicSlice.actions;

export default subtopicSlice.reducer;
