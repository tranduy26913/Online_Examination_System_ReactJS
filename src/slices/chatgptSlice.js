import { createSlice } from "@reduxjs/toolkit";


export const chatgptSlice = createSlice({
    name: "chatgpt",
    initialState:{
        chats:[]
    },
    reducers: {
        addChat:(state,action)=>{
            state.chats = [action.payload,...state.chats]
        },
        clearChats:(state,action)=>{
            state.chats = []
        },
       
    }
})


export const {
    addChat,
    clearChats
} = chatgptSlice.actions

export default chatgptSlice.reducer