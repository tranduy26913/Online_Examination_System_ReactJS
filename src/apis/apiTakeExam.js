
import { axiosClientWithToken } from "./axiosClient";

const apiTakeExam = {

    CheckTakeExam: async (params) => {
        const res = await axiosClientWithToken.post('/takeexam/check-takeexamid',params)
        return res.data;
    },
    CheckExam: async (params) => {
        const res = await axiosClientWithToken.post('/takeexam/check-exam',params)
        return res.data;
    },
    CreateTakeExam: async (params) => {
        const res = await axiosClientWithToken.post('/takeexam/take-exam',params)
        return res.data;
    },
    submitAnswerSheet: async (params) => {
        const res = await axiosClientWithToken.post('/takeexam/submit-exam',params)
        return res.data;
    },
    getReviewExam: async (params) => {
        const res = await axiosClientWithToken.get('/takeexam/get-preview-exam',{params})
        return res.data;
    },
    getResultExam: async (params) => {
        const res = await axiosClientWithToken.get('/takeexam/get-result-takeexam',{params})
        return res.data;
    },
    createLog: async (params) => {
        const res = await axiosClientWithToken.post('/takeexam/create-log',params)
        return res.data;
    },
    getLogs: async (params) => {
        const res = await axiosClientWithToken.get('/takeexam/get-logs',{params})
        return res.data;
    },


}
export default apiTakeExam;