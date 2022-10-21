import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info:null,
    takeExamId:'',
    questions:[],
}
export const answerSheetSlice = createSlice({
    name: "answerSheet",
    initialState,
    reducers: {
        setUserInfo:(state,action)=>{
            state.info = action.payload
        },
        clearUserInfo:(state,action)=>{
            state.info = null
        },
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
    deleteAnswer
} = answerSheetSlice.actions

export default answerSheetSlice.reducer