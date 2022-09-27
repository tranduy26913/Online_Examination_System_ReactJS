import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    takeExamId:'',
    sheet:[],
}
export const answerSheetSlice = createSlice({
    name: "answerSheet",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload
        },
        logoutSuccess: (state, action) => {
            state.user = null
        },
    }
})


export const {
    loginSuccess,
    logoutSuccess,
} = answerSheetSlice.actions

export default answerSheetSlice.reducer