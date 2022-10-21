import axios from 'axios';
import queryString from 'query-string';
import jwt_decode from 'jwt-decode';
const baseURL='https://be-oes-fake.herokuapp.com/api/'
 //const baseURL='http://localhost:5000/api'
//const baseURL='https://nhom3-tiki.herokuapp.com/api'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});

 const apiCourse = {

    getCourses: async (params) => {
        const res = await axiosClient.get('/courses', {params})
        return res.data;
    },
    getCourseBySlug: async (slug) => {
        const res = await axiosClient.get('/courses', {params:{slug}})
        return res.data;
    },
    postCourse: async (params) => {
        const res = await axiosClient.post('/courses', params)
        return res.data;
    },
    createCourse: async (params) => {
        const res = await axiosClient.post('/course', params)
        return res.data;
    },
}
export default apiCourse