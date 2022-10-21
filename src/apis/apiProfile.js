import {  axiosClientWithToken} from "./axiosClient";

const apiProfile = {

    ///authentication
    putChangePassword: async (params) => {
        const res = await axiosClientWithToken.put('/user/change-password', params)
        return res.data;
    },
    putUploadAvatar: async (params) => {
        const res = await axiosClientWithToken.put('/user/update-avatar', params,{headers: {
            'Content-Type': 'multipart/form-data'
          }})
        return res.data;
    },
    resetAvatar:async() =>{
        const res = await axiosClientWithToken.put('/user/reset-avatar',)
        return res.data;
    },
    putChangeInfo: async (params) => {
        const res = await axiosClientWithToken.put('/user/update-profile', params)
        return res.data;
    },
    getUserProfile: async () => {
        const res = await axiosClientWithToken.get(`/user/info`)
        return res.data;
    },
    getUserInfo: async () => {
        const res = await axiosClientWithToken.get(`/user/info-short`)
        return res.data;
    },
    makePayment: async (method) => {

        const res = await axiosClientWithToken.get(`/payment/create-payment/${method.toLowerCase()}`)
        return res.data;
    },

    getAllUser: async (params) => {
        const res = await axiosClientWithToken.get('admin/user/all', params)
        return res.data;
    },

    

}
    
export default apiProfile;