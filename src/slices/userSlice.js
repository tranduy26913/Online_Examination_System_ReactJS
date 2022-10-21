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
            state.value = [...state.questions, action.payload]
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
        clearQuestion: (state, action)=>{
            state.value = []
        }
    }
})


export const {
    addQuestion,
    updateQuestion,
    clearQuestion,
    setUserInfo,
    clearUserInfo,
    updateAvatar
} = userSlice.actions

export default userSlice.reducer