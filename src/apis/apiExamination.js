import { axiosClient, axiosClientWithToken, axiosInstance } from "./axiosClient";
const apiExamination = {

  
    getExaminationBySlug: async (slug) => {
        const res = await axiosClientWithToken.get('/exam/get-exambyslug', { params: { slug } })
        return res.data;
    },
   createExam:async (params) => {
        const res = await axiosClientWithToken.post('/exam/create-exam', params )
        return res.data;
    },
    updateExamination:async (params,id) => {
        const res = await axiosClient.patch(`/examinations/${id}`, params )
        return res.data;
    },

}

export default apiExamination
