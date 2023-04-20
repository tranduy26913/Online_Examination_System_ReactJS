import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    takeExamId: '',
    result: [],
}
export const answerSheetSlice = createSlice({
    name: "answerSheet",
    initialState,
    reducers: {
        changeAnswer: (state, action) => {
            const { question, answers } = action.payload
            const duplicate = state.result.find(item => item.question === question)

            if (duplicate) {
                duplicate.answers = answers
            }
            //state.result = [...delItem(state.result, duplicate), { question, answers }]
        },
        addAllQuestion: (state, action) => {
            let questions = action.payload

            if (Array.isArray(questions)) {
                questions = questions.map(question => {
                    let questionInSheet = state.result.find(e => e.question === question.question)
                    if (questionInSheet)
                        return {
                            ...question,
                            answers: questionInSheet.answers,
                            type:questionInSheet.type || question.type,
                            isFlag: questionInSheet.isFlag,
                            isDone: questionInSheet.isDone
                        }
                    return question
                })
                // let newSheet = [...state.result, ...questions]
                // newSheet = newSheet.filter((item,index) => newSheet.findIndex(e => e.question === item.question) === index)
                // state.result = newSheet
                state.result = [...questions]
            }
        },
        changeStateFlag: (state, action) => {
            const { questionId } = action.payload
            let question = state.result.find(item => item.question === questionId)
            if (question)
                question.isFlag = !question.isFlag
        },
        changeStateDone: (state, action) => {
            const { questionId, value } = action.payload
            let question = state.result.find(item => item.question === questionId)
            if (question)
                question.isDone = value
        },
        clearAnswerSheet: (state, action) => {
            state.result = []
        },
        deleteAnswer: (state, action) => {
            const { question: questionId } = action.payload
            let question = state.result.find(item => item.question === questionId)
            if (question) {
                question.isDone = false
                question.answers = []
            }

            //state.result = delItem(state.result, { question })
        },
        setTakeExamId: (state, action) => {
            state.takeExamId = action.payload
        },
        clearTakeExamId: (state) => {
            state.takeExamId = ''
        }
    }
})

export const {
    changeAnswer,
    clearAnswerSheet,
    deleteAnswer,
    clearTakeExamId,
    setTakeExamId,
    addAllQuestion,
    changeStateFlag,
    changeStateDone
} = answerSheetSlice.actions

export default answerSheetSlice.reducer