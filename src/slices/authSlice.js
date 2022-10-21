import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    accessToken:'',
    refreshToken:'',
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },
        logoutSuccess: (state, action) => {
            state.accessToken = ''
            state.refreshToken = ''
        },
    }
})


export const {
    loginSuccess,
    logoutSuccess,
} = authSlice.actions

export default authSlice.reducer