import { createSlice } from "@reduxjs/toolkit";


export const questionSlice = createSlice({
    name: "question",
    initialState:{value:[]},
    reducers: {
        addQuestion: (state, action) => {
            state.value = [...state.value, action.payload]
        },
        updateQuestion:(state,action)=>{
            const newQuestion = action.payload
            const index = state.value.findIndex(item=>item.id===newQuestion.id)
            if(index>=0){
                const newState = [...state.value]
                newState[index] = action.payload
                state.value = newState
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
} = questionSlice.actions

export default questionSlice.reducer