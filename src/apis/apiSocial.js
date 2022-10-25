import { axiosClient } from "./axiosClient"
const apiSocial = {
    loginFacebook: async (params) => {
        const res = await axiosClient.post("/social/login-facebook",params)
        return res.data
    },
    loginGoogle: async (params) => {
        const res = await axiosClient.post("/social/login-google",params)
        return res.data
    },

}
export default apiSocial;