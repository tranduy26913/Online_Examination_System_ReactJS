import { axiosClientWithToken } from "./axiosClient";
const apiStatistic = {

  
    getStatisticExamByTeacher: async (params) => {
        const res = await axiosClientWithToken.get('/statistic/take-exam-by-teacher', { params })
        return res.data;
    },
    getStatisticExamByStudent: async (params) => {
        const res = await axiosClientWithToken.get('/statistic/take-exam-by-student', { params })
        return res.data;
    },
    getDetailOfCourse: async (params) => {
        const res = await axiosClientWithToken.get('/statistic/detail-of-course', { params })
        return res.data;
    },
    getDetailOfStudent: async (params) => {
        const res = await axiosClientWithToken.get('/statistic/detail-of-student', { params })
        return res.data;
    },
    getDetailOfTeacher: async (params) => {
        const res = await axiosClientWithToken.get('/statistic/detail-of-teacher', { params })
        return res.data;
    },
    getDetailQuestionOfExam: async (params) => {
        const res = await axiosClientWithToken.get('/takeexam/view-accuracy-rate-of-exam-questions', { params })
        return res.data;
    },
  

}

export default apiStatistic
