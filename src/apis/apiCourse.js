import { axiosClient,axiosClientWithToken } from "./axiosClient";

 const apiCourse = {

    getCourses: async (params) => {
        const res = await axiosClient.get('/courses', {params})
        return res.data;
    },
    getCourseBySlug: async (slug) => {
        const res = await axiosClient.get('/courses', {params:{slug}})
        return res.data;
    },
    getCourseByCourseID: async (params) => {
        const res = await axiosClient.get('/course/by-courseid', {params})
        return res.data;
    },
    getListCourseByTeacher: async (params) => {
        const res = await axiosClientWithToken.get('/course/by-teacher')
        return res.data;
    },
    getListStudentToAdd: async (params) => {
        const res = await axiosClientWithToken.get('/course/search-student',{params})
        return res.data;
    },
    getListStudentOfCourse: async (params) => {
        const res = await axiosClientWithToken.get('/course/get-students',{params})
        return res.data;
    },
    getListExamOfCourse: async (params) => {
        const res = await axiosClientWithToken.get('/course/get-exams',{params})
        return res.data;
    },
    addStudentIntoCourse: async (params) => {
        const res = await axiosClientWithToken.post('/course/add-student',params)
        return res.data;
    },
    deleteStudentInCourse: async (params) => {
        const res = await axiosClientWithToken.delete('/course/delete-student',{params})
        return res.data;
    },
    
    createCourse: async (params) => {
        const res = await axiosClient.post('/course', params,{headers: {
            'Content-Type': 'multipart/form-data'
          }})
        return res.data;
    },
}
export default apiCourse