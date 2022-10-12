import axios from 'axios';
import queryString from 'query-string';
import jwt_decode from 'jwt-decode';
//const baseURL='https://be-oes-fake.herokuapp.com/api/'
 //const baseURL='http://localhost:5000/api'
const baseURL='https://be-oes.cyclic.app/api'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});


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