import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "",
    description: "easy",
    difficulty: "",
    tags: [],
    miscellaneous: false,
    url: "",
    examples: [{ input: "", output: "" }],
    constraints: [],
    hints: [],
    topicId: "",
    subtopicId: ""
};


const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        setQuestionDetails: (state, action) => {
            return { ...state, ...action.payload }
        },
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload
        },
        setDifficulty: (state, action) => {
            state.difficulty = action.payload
        },
        setTags: (state, action) => {
            state.tags = action.payload
        },
        setMiscellaneous: (state, action) => {
            state.miscellaneous = action.payload
        },
        setUrl: (state, action) => {
            state.url = action.payload
        },

        addExample: (state) => {
            state.examples.push({ input: "", output: "" })
        },
        updateExample: (state, action) => {
            const { index, field, value } = action.payload;
            if (state.examples[index]) {
                state.examples[index][field] = value;
            }
        },
        removeExample:(state,action)=>{
            state.examples = state.examples.filder((_,i)=>i!==action.payload);
        },
        
        addHint:(state)=>{
            state.hints.push("")
        },
        updateHint:(state,action)=>{
            const {index,value} = action.payload;
            if(state.hints[index]!==undefined){
                state.hints[index] = value;
            }
        },

        removeHints:(state,action)=>{
            state.hints = state.hints.filter((_,i)=>i!==action.payload);
        },
        setContraints:(state,action)=>{
            state.constraints = action.payload
        },
        setTopicId:(state,action)=>{
            state.topicId = action.payload
        },
        setSubTopicId:(state,action)=>{
            state.subtopicId = action.payload
        },
        resetQuestion:()=>initialState
    }
});


export const {
    setQuestionDetails,
    setTitle,
    setDescription,
    setDifficulty,
    setTags,
    setMiscellaneous,
    setUrl,
    addExample,
    updateExample,
    removeExample,
    addHint,
    updateHint,
    removeHints,
    setContraints,
    setTopicId,
    setSubTopicId,
    resetQuestion
} = questionSlice.actions;
export default questionSlice.reducer;

