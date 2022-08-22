import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import {User} from '../interfaces'

export interface authState {
    user:User | null;
}

const initialState: authState = {
    user:null,
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action:PayloadAction<User>) => {
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

export const selectUser = (state : RootState) => state.auth.user

export default authSlice.reducer