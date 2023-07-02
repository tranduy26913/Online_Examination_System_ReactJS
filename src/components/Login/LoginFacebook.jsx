
import { useNavigate } from 'react-router-dom';
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { toast } from 'react-toastify';
import FacebookLogin from '@greatsumini/react-facebook-login';
import apiSocial from 'apis/apiSocial';
import { useDispatch } from 'react-redux';
import { loginSuccess } from 'slices/authSlice';

function LoginFacebook() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleFacebookLogin = (response) => {
        const id = toast.loading("Đang lấy thông tin...")
        const accessToken = response.accessToken
        apiSocial.loginFacebook({ accessToken })
            .then(res => {
                dispatch(loginSuccess(res.user))
                navigate('/')
                toast.update(id, { render: "Đăng nhập thành công", isLoading: false, type: 'success', autoClose: 1200 })
            })
            .catch(err => {
                toast.update(id, { render: "Đăng nhập không thành công. Vui lòng thử lại", isLoading: false, type: 'warning', autoClose: 1200 })
            })
    }

    const test = () => {
        window.FB.login(function (response) {
            if (response.status === 'connected') {
                const id = toast.loading("Đang lấy thông tin...")
                const accessToken = response.accessToken
                apiSocial.loginFacebook({ accessToken })
                    .then(res => {
                        dispatch(loginSuccess(res.user))
                        navigate('/')
                        toast.update(id, { render: "Đăng nhập thành công", isLoading: false, type: 'success', autoClose: 1200 })
                    })
                    .catch(err => {
                        toast.update(id, { render: "Đăng nhập không thành công. Vui lòng thử lại", isLoading: false, type: 'warning', autoClose: 1200 })
                    })
            } else {
                // The person is not logged into your webpage or we are unable to tell. 
            }
        });
    }
    return (
        <>
            <div class="fb-login-button"
                onClick={test}
                onlogin="checkLoginState();">
                <FacebookRoundedIcon
                    sx={{
                        cursor: 'pointer',
                        color: "#4267b2",
                        fontSize: "4.5rem"
                    }}></FacebookRoundedIcon>
            </div>
            {/* // <FacebookLogin
        //     appId="924184595294405"
        //     onSuccess={handleFacebookLogin}
        //     onFail={(error) => {
                
        //     }}
        //     useCustomerChat={true}
        //     // onProfileSuccess={(response) => {
        //     //     console.log('Get Profile Success!', response);
        //     // }}
        //     render={({ onClick, logout }) => (
        //         <FacebookRoundedIcon
        //             onClick={onClick}
        //             sx={{
        //                 cursor: 'pointer',
        //                 color: "#4267b2",
        //                 fontSize: "4.5rem"
        //             }} />
        //     )}
        // /> */}
        </>

    )
}

export default LoginFacebook