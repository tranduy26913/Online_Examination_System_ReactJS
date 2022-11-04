import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: "user",
    initialState:{
        info:null,
        questions:[]
    },
    reducers: {
        setUserInfo:(state,action)=>{
            state.info = action.payload
        },
        clearUserInfo:(state,action)=>{
            state.info = null
        },
        updateAvatar:(state,action) =>{
            state.info = {
                ...state.info,
                avatar:action.payload
            }
        },
        addQuestion: (state, action) => {
            state.questions = [...state.questions, action.payload]
        },
        updateQuestion:(state,action)=>{
            const newQuestion = action.payload
            const index = state.questions.findIndex(item=>item.id===newQuestion.id)
            if(index>=0){
                const newState = [...state.questions]
                newState[index] = action.payload
                state.questions = newState
            }
        },
        deleteQuestion:(state,action)=>{
            const questionId = action.payload
            const newQuestions = state.questions.filter(item=>item.id!==questionId)
           
                state.questions = newQuestions
        },
        clearQuestion: (state, action)=>{
            state.questions = []
        }
    }
})


export const {
    addQuestion,
    updateQuestion,
    deleteQuestion,
    clearQuestion,
    setUserInfo,
    clearUserInfo,
    updateAvatar
} = userSlice.actions

export default userSlice.reducer