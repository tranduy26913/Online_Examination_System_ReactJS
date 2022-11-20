import { axiosClientWithToken } from "./axiosClient";
const apiSubmitAssignment = {
    CreateSubmitAssignment: async (params) => {
        const res = await axiosClientWithToken.post('/submitassignment/create', params)
        return res.data;
    },
    UpdateSubmitAssignment: async (params) => {
        const res = await axiosClientWithToken.put('/submitassignment/update', params)
        return res.data;
    },
    ChangePointSubmitAssignment: async (params) => {
        const res = await axiosClientWithToken.put('/submitassignment/mark', params)
        return res.data;
    },
    DeleteSubmitAssignment: async (params) => {
        const res = await axiosClientWithToken.delete('/submitassignment/', {params})
        return res.data;
    },
    getSubmitAssignmentById: async (params) => {
        const res = await axiosClientWithToken.get('/submitassignment/by-id', { params })
        return res.data;
    },
    getSubmitAssignmentBySlug: async (params) => {
        const res = await axiosClientWithToken.get('/submitassignment/by-assignment-slug', { params })
        return res.data;
    },
    
}

export default apiSubmitAssignment
