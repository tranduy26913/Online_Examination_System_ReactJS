import { axiosClient } from "./axiosClient"
const apiAuth = {
    postUser: async (params) => {
        const res = await axiosClient.post("/users",params)
        return res.data
    },

    getUserWithLogin: async (params) => {
        const res = await axiosClient.get('/users', {params})
        return res.data
    },
    changeSeenProp: async (params,id) => {
        const res = await axiosClient.patch(`/notifications/${id}`,params)
        return res.data;
    },
    deleteNotifyById: async (params) => {
        const res = await axiosClient.delete(`/notifications/${params.id}`)
        return res.data;
    },
}
export default apiAuth;