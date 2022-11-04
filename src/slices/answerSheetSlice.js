import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    takeExamId:'',
    result:[],
}
export const answerSheetSlice = createSlice({
    name: "answerSheet",
    initialState,
    reducers: {
        changeAnswer: (state, action) => {
            const {question, answers} = action.payload
            const duplicate = state.result.find(item => item.question === question)
            if(duplicate){
                state.result = delItem(state.result,duplicate)
            }
            state.result = [...state.result,{question,answers}]
        },
        clearAnswerSheet: (state, action) => {
            state.result = []
        },
        deleteAnswer:(state,action) => {
            const {question} = action.payload
            state.result = delItem(state.result,{question})
        },
        setTakeExamId:(state,action)=>{
            state.takeExamId = action.payload
        },
        clearTakeExamId :(state) =>{
            state.takeExamId = ''
        }
    }
})

const delItem = (arr, item) => arr.filter(e=> e.question !== item.question)


export const {
    changeAnswer,
    clearAnswerSheet,
    deleteAnswer,
    clearTakeExamId,
    setTakeExamId
} = answerSheetSlice.actions

export default answerSheetSlice.reducer