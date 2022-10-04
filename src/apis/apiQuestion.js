import { axiosClient } from "./axiosClient";
const apiQuestion = {
    getQuestionsById: async (id) => {
        const myReview = await axiosClient.get(`/questions/${id}`)
        return myReview.data;
    },
    postQuestion: async (params) =>{
        const res = await axiosClient.post('/questions', params)
        return res.data;
    },
    postAnswers: async (params) =>{
        const res = await axiosClient.post('/answers', params)
        return res.data;
    },
    updateQuestion: async (params,id) =>{
        const res = await axiosClient.patch('/questions/'+id, params)
        return res.data;
    },
    getMyRevPurchaseds: async (params) =>{
        const myRevPurchaseds = await axiosClient.get('', {params})
        return myRevPurchaseds.data;
    },

    getRevProduct: async (params) => {
        const revProduct = await axiosClient.get('', {params})
        return revProduct.data;
    },    
}
export default apiQuestion; 