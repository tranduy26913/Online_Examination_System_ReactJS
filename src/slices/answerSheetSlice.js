import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    takeExamId:'',
    questions:[],
}
export const answerSheetSlice = createSlice({
    name: "answerSheet",
    initialState,
    reducers: {
        changeAnswer: (state, action) => {
            const {id, answerIds} = action.payload
            const duplicate = state.questions.find(item => item.id === id)
            if(duplicate){
                state.questions = delItem(state.questions,duplicate)
            }
            state.questions = [...state.questions,{id,answerIds}]
        },
        clearAnswers: (state, action) => {
            state.questions = []
        },
        deleteAnswer:(state,action) => {
            const {id} = action.payload
            state.questions = delItem(state.questions,{id})
        }
    }
})

const delItem = (arr, item) => arr.filter(e=> e.id !== item.id)


export const {
    changeAnswer,
    clearAnswers,
    deleteAnswer,
} = answerSheetSlice.actions

export default answerSheetSlice.reducer