import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from './GoogleIcon';
import apiSocial from 'apis/apiSocial';
import { loginSuccess } from 'slices/authSlice';
import { useDispatch } from 'react-redux';

function LoginGoogle() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            apiSocial.loginGoogle({ accessToken: tokenResponse.access_token })
                .then(res => {
                    dispatch(loginSuccess(res.user))
                    toast.success("Đăng nhập thành công")
                    navigate('/')
                })
                .catch(err=>{
                    toast.error("Đăng nhập không thành công. Vui lòng thử lại")
                })
        },
        onError: errorResponse => console.log(errorResponse),
    });
    return (
        <GoogleIcon onClick={handleGoogleLogin} />
    )
}

export default LoginGoogle