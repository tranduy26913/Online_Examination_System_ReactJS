import axios from 'axios';
import queryString from 'query-string';
const baseURL='https://be-oes.cyclic.app/api'
 //const baseURL='http://localhost:5000/api'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});
const apiAuth = {
    
    register: async (params) => {
        const res = await axiosClient.post(`/auth/register`,params)
        return res.data;
    },
    login: async (params) => {
        const res = await axiosClient.post(`/auth/login`,params)
        return res.data;
    },
    active: async (params) => {
        const res = await axiosClient.post(`/auth/active`,params)
        return res.data;
    },
    
    
}
export default apiAuth;