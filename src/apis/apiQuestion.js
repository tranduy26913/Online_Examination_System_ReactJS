import {  axiosClientWithToken } from "./axiosClient";
const apiQuestion = {
   
    createQuestion: async (params) =>{
        const res = await axiosClientWithToken.post('question/create-question', params)
        return res.data;
    },
    updateQuestion: async (params) =>{
        const res = await axiosClientWithToken.post('question/update-question-in-exam', params)
        return res.data;
    },
    createQuestionByFile: async (params) =>{
        const res = await axiosClientWithToken.post('question/create-question-by-file', params)
        return res.data;
    },
    deleteQuestion: async (params) =>{
        const res = await axiosClientWithToken.delete('question', {data:params})
        return res.data;
    },
    deleteQuestionInQuestionBank: async (params) =>{
        const res = await axiosClientWithToken.delete('question/question-bank', {data:params})
        return res.data;
    },
   
   
}
export default apiQuestion; 