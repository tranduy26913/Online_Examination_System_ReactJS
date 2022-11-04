import { axiosClient, axiosClientWithToken } from "./axiosClient";
const apiQuestion = {
   
    createQuestion: async (params) =>{
        const res = await axiosClientWithToken.post('question/create-question', params)
        return res.data;
    },
    deleteQuestion: async (params) =>{
        const res = await axiosClientWithToken.delete('question', {params})
        return res.data;
    },
   
   
}
export default apiQuestion; 