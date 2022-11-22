import { axiosClientWithToken } from "./axiosClient";
const apiAssignment = {
    getAssignmentBySlug: async (params) => {
        const res = await axiosClientWithToken.get('/assignment/by-slug', { params})
        return res.data;
    },
    getAssignmentBySlugOfStudent: async (params) => {
        const res = await axiosClientWithToken.get('/assignment/by-slug-of-student', { params})
        return res.data;
    },
    getAssignmentsByCourseOfTeacher: async (params) => {
        const res = await axiosClientWithToken.get('/assignment/assignment-by-course-of-teacher', { params })
        return res.data;
    },
    getAssignmentsByCourseOfStudent: async (params) => {
        const res = await axiosClientWithToken.get('/assignment/assignment-by-course-of-student', { params })
        return res.data;
    },
    createAssignment: async (params) => {
        const res = await axiosClientWithToken.post('/assignment/create', params)
        return res.data;
    },
    updateAssignment: async (params, id) => {
        const res = await axiosClientWithToken.put(`/assignment/update`, params)
        return res.data;
    },
    deleteAssignment: async (params, id) => {
        const res = await axiosClientWithToken.delete(`/assignment/`, {params})
        return res.data;
    },
    PublishAssignment: async (params, id) => {
        const res = await axiosClientWithToken.put(`/assignment/public`, params)
        return res.data;
    },
    CloseAssignment: async (params, id) => {
        const res = await axiosClientWithToken.put(`/assignment/close`, params)
        return res.data;
    },

}

export default apiAssignment
