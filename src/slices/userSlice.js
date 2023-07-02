import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: "user",
    initialState: {
        isFetchingInfo: false,
        info: null,
        questions: [],
        questionsInFile: []
    },
    reducers: {
        fetchingInfo: (state) => {
            state.isFetchingInfo = true
        },
        setUserInfo: (state, action) => {
            state.info = action.payload
            state.isFetchingInfo = false
        },
        clearUserInfo: (state, action) => {
            state.info = null
            state.isFetchingInfo = false
        },
        updateAvatar: (state, action) => {
            state.info = {
                ...state.info,
                avatar: action.payload
            }
        },
        addQuestion: (state, action) => {
            state.questions = [...state.questions, action.payload]
        },
        replaceListQuestion: (state, action) => {
            state.questions = [...action.payload]
        },
        updateQuestion: (state, action) => {
            const newQuestion = action.payload
            const index = state.questions.findIndex(item => item.id === newQuestion.id)
            if (index >= 0) {
                const newState = [...state.questions]
                newState[index] = action.payload
                state.questions = newState
            }
        },
        deleteQuestion: (state, action) => {
            const questionId = action.payload
            const newQuestions = state.questions.filter(item => item.id !== questionId)

            state.questions = newQuestions
        },
        clearQuestion: (state, action) => {
            state.questions = []
        },
        addQuestionInFile: (state, action) => {
            state.questionsInFile = [...state.questionsInFile, action.payload]
        },
        updateQuestionInFile: (state, action) => {
            const newQuestion = action.payload
            const index = state.questionsInFile.findIndex(item => item.id === newQuestion.id)
            if (index >= 0) {
                const newState = [...state.questionsInFile]
                newState[index] = action.payload
                state.questionsInFile = newState
            }
        },
        deleteQuestionInFile: (state, action) => {
            const questionId = action.payload
            const newQuestions = state.questionsInFile.filter(item => item.id !== questionId)

            state.questionsInFile = newQuestions
        },
        clearQuestionInFile: (state, action) => {
            state.questionsInFile = []
        }
    }
})


export const {
    fetchingInfo,
    addQuestion,
    replaceListQuestion,
    updateQuestion,
    deleteQuestion,
    clearQuestion,
    addQuestionInFile,
    updateQuestionInFile,
    deleteQuestionInFile,
    clearQuestionInFile,
    setUserInfo,
    clearUserInfo,
    updateAvatar
} = userSlice.actions

export default userSlice.reducer