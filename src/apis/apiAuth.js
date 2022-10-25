import {  axiosClient} from "./axiosClient";
const apiAuth = {
    
    register: async (params) => {
        const res = await axiosClient.post(`/auth/register`,params)
        return res.data;
    },
    login: async (params) => {
        const res = await axiosClient.post(`/auth/login`,params)
        return res.data;
    },
    reActive: async (params) => {
        const res = await axiosClient.post(`/auth/reactive`,params)
        return res.data;
    },
    forgotPassword: async (params) => {
        const res = await axiosClient.get(`/auth/reset-password`,{params})
        return res.data;
    },
    resetPassword: async (params) => {
        const res = await axiosClient.post(`/auth/reset-password`,params)
        return res.data;
    },
    active: async (params) => {
        const res = await axiosClient.post(`/auth/active`,params)
        return res.data;
    },
    checkEmail: async (params) => {
        const res = await axiosClient.post(`/auth/checkemail`,params)
        return res.data;
    },
    checkUsername: async (params) => {
        const res = await axiosClient.post(`/auth/checkusername`,params)
        return res.data;
    },
    
    
}
export default apiAuth;