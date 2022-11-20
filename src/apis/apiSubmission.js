import { axiosClientWithToken } from "./axiosClient";
const apiSubmission = {
    getSubmissionBySlug: async (slug) => {
        const res = await axiosClientWithToken.get('/submission/get-submission', { params: { slug } })
        return res.data;
    },
    getListSubmissionByAssignment: async (slug) => {
        const res = await axiosClientWithToken.get('/submission/by-assignment', { params: { slug } })
        return res.data;
    },
    createSubmission: async (params) => {
        const res = await axiosClientWithToken.post('/submission/create-submission', params)
        return res.data;
    },
    updateSubmission: async (params, id) => {
        const res = await axiosClientWithToken.put(`/submission/update-submission`, params)
        return res.data;
    },
    updateSubmissionPoint: async (params, id) => {
        const res = await axiosClientWithToken.put(`/submission/update-point`, params)
        return res.data;
    },
   deleteSubmission: async (params, id) => {
        const res = await axiosClientWithToken.delete(`/submission`, params)
        return res.data;
    },

}

export default apiSubmission