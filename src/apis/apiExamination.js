import { axiosClient, axiosClientWithToken, axiosInstance } from "./axiosClient";
const apiExamination = {

    getExaminationsById: async (id) => {
        const res = await axiosClient.get('/examinations', { params: { id } })
        return res.data;
    },
    getExaminationBySlug: async (slug) => {
        const res = await axiosClient.get('/examinations', { params: { slug } })
        return res.data;
    },
    getExaminations: async (params) => {
        const res = await axiosClient.get('/examinations', { params })
        return res.data;
    },
    getCategoryFilterById: async (params) => {
        const res = await axiosClient.get('/categories', { params })
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
