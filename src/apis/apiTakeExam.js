
import { axiosClient, axiosClientWithToken } from "./axiosClient";

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


}
export default apiTakeExam;