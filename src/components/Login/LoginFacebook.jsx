
import {  useNavigate } from 'react-router-dom';
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { toast } from 'react-toastify';
import FacebookLogin from '@greatsumini/react-facebook-login';
import apiSocial from 'apis/apiSocial';
import { useDispatch } from 'react-redux';
import { loginSuccess } from 'slices/authSlice';

function LoginFacebook() {
const navigate = useNavigate()
const dispatch = useDispatch()
    const handleFacebookLogin = (response)=>{
        const accessToken = response.accessToken
       apiSocial.loginFacebook({accessToken})
       .then(res => {
        dispatch(loginSuccess(res.user))
        toast.success("Đăng nhập thành công")
        navigate('/')
    })
    .catch(err=>{
        toast.error("Đăng nhập không thành công. Vui lòng thử lại")
    })
    }
    return (
        <FacebookLogin
            appId="811103459901244"
            onSuccess={handleFacebookLogin}
            onFail={(error) => {
                console.log('Login Failed!', error);
            }}
            // onProfileSuccess={(response) => {
            //     console.log('Get Profile Success!', response);
            // }}
            render={({ onClick, logout }) => (
                <FacebookRoundedIcon
                    onClick={onClick} 
                    sx={{
                        cursor: 'pointer',
                        color: "#4267b2",
                        fontSize: "4.5rem"
                    }} />
            )}
        />

    )
}

export default LoginFacebook