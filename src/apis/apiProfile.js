import { axiosClient, axiosClientWithToken} from "./axiosClient";

const apiProfile = {

    ///authentication
    putChangePassword: async (params) => {
        const res = await axiosClientWithToken.put('/user/change-password', params)
        return res.data;
    },
    putResetPassword: async (params) => {
        const res = await axiosClient.post('/auth/reset-password', params)
        return res.data;
    },
    putUploadAvatar: async (params) => {
        const res = await axiosClientWithToken.put('/user/update-avatar', params, {headers: {
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
    updateDeviceToken: async (params) => {
        const res = await axiosClientWithToken.put('/user/update-device-token', params)
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
    makePayment: async (method,params) => {

        const res = await axiosClientWithToken.post(`/payment/create-payment/${method.toLowerCase()}`,params)
        return res.data;
    },


    

}
    
export default apiProfile;