import { axiosClientWithToken } from "./axiosClient";

const apiLessons = {

    getListLesson: async (params,role) => {
        const res = await axiosClientWithToken.get(`/lesson/lesson-by-course-of-${role}`, { params })
        return res.data;
    },
    getCalendar: async (params) => {
        const res = await axiosClientWithToken.get(`/lesson/calendar`, { params })
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
    seenLesson: async (params) => {
        const res = await axiosClientWithToken.post('/lesson/seen-lesson',params)
        return res.data;
    },
    unseenLesson: async (params) => {
        const res = await axiosClientWithToken.delete('/lesson/unseen-lesson',{params})
        return res.data;
    },

    exitCourse: async (params) => {
        const res = await axiosClientWithToken.post('/course/exit-course', params)
        return res.data;
    },
}
export default apiLessons