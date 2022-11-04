import { axiosClientWithToken } from "./axiosClient";
const apiStatistic = {

  
    getStatisticExamByTeacher: async (params) => {
        const res = await axiosClientWithToken.get('/statistic/exam-by-teacher', { params })
        return res.data;
    },
    getStatisticExamByStudent: async (params) => {
        const res = await axiosClientWithToken.get('/statistic/exam-by-student', { params })
        return res.data;
    },
  

}

export default apiStatistic
