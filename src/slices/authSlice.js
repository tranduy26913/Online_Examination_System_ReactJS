import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user:null,
}
export const authSlice = createSlice({
    name: "auth",
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
} = authSlice.actions

export default authSlice.reducer