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
            const id = toast.loading("Đang lấy thông tin...")
            apiSocial.loginGoogle({ accessToken: tokenResponse.access_token })
                .then(res => {
                    dispatch(loginSuccess(res.user))
                    toast.update(id,{render:"Đăng nhập thành công",isLoading:false,type:'success',autoClose:1200})
                    navigate('/')
                })
                .catch(err=>{
                    toast.update(id,{render:"Đăng nhập không thành công. Vui lòng thử lại",isLoading:false,type:'warning',autoClose:1200})
                })
        },
        onError: errorResponse => console.log(errorResponse),
    });
    return (
        <GoogleIcon onClick={handleGoogleLogin} />
    )
}

export default LoginGoogle