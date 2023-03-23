import axios from 'axios';
import { parse, stringify } from 'qs';
import jwt_decode from 'jwt-decode';
//const baseURL='http://localhost:5000/api'
const baseURL='https://be-oes.vercel.app/api'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: {
        encode: parse,
        serialize: stringify,
      },
});



const getRefreshToken = async (refreshToken) => {
    const res = await axiosClient.post('/auth/refreshtoken', { refreshToken  })
    return res.data
}

export const axiosClientWithToken = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: {
        encode: parse,
        serialize: stringify,
      },
});

var myInterceptor = null;
export const clearInterceptor = ()=>{
    axiosClientWithToken.interceptors.request.eject(myInterceptor)
}
export const axiosInstance = (accessToken,refreshToken, dispatch, stateSuccess,stateFail) => {
    axiosClientWithToken.interceptors.request.eject(myInterceptor)
    myInterceptor = axiosClientWithToken.interceptors.request.use(
        async (config) => {
            let date = new Date();
            if(!(refreshToken)){
                return config;
            }
            const decodeToken = jwt_decode(accessToken);
            
            if (decodeToken.exp < date.getTime() / 1000) {
                try{
                    const response = await getRefreshToken(refreshToken);

                    const newToken = {
                        accessToken: response.accessToken,
                        refreshToken: response.refreshToken
                    }
                    dispatch(stateSuccess(newToken))
                    config.headers['Authorization'] = `Bearer ${response.accessToken}`;
                }
                catch(err){
                    dispatch(stateFail(null))
                }
            }else{
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config;
        },
        err => {
            return Promise.reject(err)
        }
    );
}
