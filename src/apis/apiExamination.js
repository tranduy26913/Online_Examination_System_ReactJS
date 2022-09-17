
//import { axiosClient, axiosInstance } from "./axiosClient";
import axios from 'axios';
import queryString from 'query-string';
const baseURL = 'https://playerhostedapitest.herokuapp.com/api/'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});

export default apiExamination = {

    getExaminationsById: async (id) => {
        const res = await axiosClient.get('/examinations', { params: { id } })
        return res.data;
    },
    getExaminationBySlug: async (slug) => {
        const res = await axiosClient.get('/examinations', { params: { slug } })
        return res.data;
    },
    getExaminations: async (params) => {
        const res = await axiosClient.get('/examinations', { params })
        return res.data;
    },
    getCategoryFilterById: async (params) => {
        const res = await axiosClient.get('/categories', { params })
        return res.data;
    },

    getProductsBySearch: async (params) => {
        const res = await axiosClient.get('/examinations' + params)
        return res.data
    }

}
