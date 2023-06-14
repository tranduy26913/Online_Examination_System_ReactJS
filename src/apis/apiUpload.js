import { axiosClientWithToken } from "./axiosClient";

 const apiUpload = {
    updateImage: async (params) => {
        const res = await axiosClientWithToken.post('/upload/image', params,{headers: {
            'Content-Type': 'multipart/form-data'
          }})
        return res.data;
    },
    updateFile: async (params) => {
        const res = await axiosClientWithToken.post('/upload/file', params,{headers: {
            'Content-Type': 'multipart/form-data'
          }})
        return res.data;
    },
    updateFileDeta: async (params) => {
        const res = await axiosClientWithToken.post('/upload/up-file', params,{headers: {
            'Content-Type': 'multipart/form-data'
          }})
        return res.data;
    },
}
export default apiUpload