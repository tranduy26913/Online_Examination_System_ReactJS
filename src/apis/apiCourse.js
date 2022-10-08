import { axiosClient } from "./axiosClient";
 const apiCourse = {

    getCourses: async (params) => {
        const res = await axiosClient.get('/courses', {params})
        return res.data;
    },
    getCourseBySlug: async (params) => {
        const res = await axiosClient.get('/courses', {params})
        return res.data;
    },
    postCourse: async (params) => {
        const res = await axiosClient.post('/courses', params)
        return res.data;
    },
}
export default apiCourse