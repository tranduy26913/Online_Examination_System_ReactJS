import { axiosClientWithToken } from "./axiosClient";

const apiLessons = {

    getListLesson: async (params) => {
        const res = await axiosClientWithToken.get('/lesson/lesson-by-course-of-teacher', { params })
        return res.data;
    },
    deleteLesson: async (params) => {
        const res = await axiosClientWithToken.delete('/lesson/', { params })
        return res.data;
    },
    createLesson: async (params) => {
        const res = await axiosClientWithToken.post('/lesson/create', params, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data;
    },
    updateLesson: async (params) => {
        const res = await axiosClientWithToken.put('/lesson/update', params, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data;
    },

    exitCourse: async (params) => {
        const res = await axiosClientWithToken.post('/course/exit-course', params)
        return res.data;
    },
}
export default apiLessons