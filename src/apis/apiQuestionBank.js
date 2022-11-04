import { axiosClientWithToken } from "./axiosClient";
const apiQuestionBank = {

  
    getQuestionBanks: async () => {
        const res = await axiosClientWithToken.get('/questionbank/by-teacher')
        return res.data;
    },
    getQuestionBankBySlug: async (params) => {
        const res = await axiosClientWithToken.get('/questionbank',{params})
        return res.data;
    },
   getQuestionsByQB:async (params) => {
        const res = await axiosClientWithToken.get('/questionbank/questions', {params} )
        return res.data;
    },
   getQuestionsByListQB:async (params) => {
        const res = await axiosClientWithToken.post('/questionbank/questions-by-slugs', params )
        return res.data;
    },
   createQuestionBank:async (params) => {
        const res = await axiosClientWithToken.post('/questionbank', params )
        return res.data;
    },
    editQuestionBank:async (params) => {
        const res = await axiosClientWithToken.put('/questionbank', params )
        return res.data;
    },
    createQuestionIntoQuestionBank:async (params) => {
         const res = await axiosClientWithToken.post('/question-bank/add-question', params )
         return res.data;
     },
   deleteQuestionBank:async (params) => {
        const res = await axiosClientWithToken.delete('/question-bank', params )
        return res.data;
    },

}

export default apiQuestionBank
