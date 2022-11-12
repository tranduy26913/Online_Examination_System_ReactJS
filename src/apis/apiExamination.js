import { axiosClientWithToken } from "./axiosClient";
const apiExamination = {

  
    getExaminationBySlug: async (slug) => {
        const res = await axiosClientWithToken.get('/exam/get-exambyslug', { params: { slug } })
        return res.data;
    },
   createExam:async (params) => {
        const res = await axiosClientWithToken.post('/exam/create-exam', params )
        return res.data;
    },
    updateExam:async (params,id) => {
        const res = await axiosClientWithToken.put(`/exam/update-exam`, params )
        return res.data;
    },
    PublishExam:async (params,id) => {
        const res = await axiosClientWithToken.put(`/exam/public-exam`, params )
        return res.data;
    },
    CloseExam:async (params,id) => {
        const res = await axiosClientWithToken.put(`/exam/close-exam`, params )
        return res.data;
    },

}

export default apiExamination
