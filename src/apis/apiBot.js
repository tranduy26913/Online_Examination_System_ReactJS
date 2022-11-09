import axios from 'axios';
import queryString from 'query-string';
import jwt_decode from 'jwt-decode';

const baseURL='https://api.telegram.org/bot/5684898171:AAH2OsGKaWNllMyA7QmGcleN9V3Gd78aDxU'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});

const apiBot = {

  
   uploadFile:async (params) => {
        const res = await axiosClient.post('/sendPhoto', params,{headers: {
            'Content-Type': 'multipart/form-data'
          }} )
        return res.data;
    },
    

}

export default apiBot
