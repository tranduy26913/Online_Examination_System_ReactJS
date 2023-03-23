import { axiosClientWithToken } from "./axiosClient";

 const apiCourse = {

    getCourseToEnroll: async (params) => {
        const res = await axiosClientWithToken.get('/course/info-to-enroll', {params})
        return res.data;
    },
    EnrollIntoCourse: async (params) => {
        const res = await axiosClientWithToken.post('/course/enroll-in-course',params)
        return res.data;
    },
    getCourseByCourseID: async (params,role) => {
        const res = await axiosClientWithToken.get(`/course/by-courseid-${role}`, {params})
        return res.data;
    },
    getListCourseByTeacher: async (params) => {
        const res = await axiosClientWithToken.get('/course/by-teacher')
        return res.data;
    },
    getListCourseByStudent: async (params) => {
        const res = await axiosClientWithToken.get('/course/student-course')
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
    getListExamOfCourseByStudent: async (params) => {
        const res = await axiosClientWithToken.get('/course/by-student',{params})
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
    deleteExamInCourse: async (params) => {
        const res = await axiosClientWithToken.delete('/course/delete-exam',{data:params})
        return res.data;
    },
    
    createCourse: async (params) => {
        const res = await axiosClientWithToken.post('/course', params,{headers: {
            'Content-Type': 'multipart/form-data'
          }})
        return res.data;
    },
    updateCourse: async (params) => {
        const res = await axiosClientWithToken.post('/course/update-course', params,{headers: {
            'Content-Type': 'multipart/form-data'
          }})
        return res.data;
    },
    updateFile: async (params) => {
        const res = await axiosClientWithToken.post('/course/update-file', params,{headers: {
            'Content-Type': 'multipart/form-data'
          }})
        return res.data;
    },
    exitCourse: async (params) => {
        const res = await axiosClientWithToken.post('/course/exit-course', params)
        return res.data;
    },
}
export default apiCourse