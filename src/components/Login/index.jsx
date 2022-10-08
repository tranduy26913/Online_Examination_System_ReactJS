import React, { useState } from 'react'
import {
    Button,
    Stack,
    Typography,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    Checkbox,
    FormControl,
    TextField,
    IconButton,
    FormControlLabel,
    FormGroup,
    Paper
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Login.scss'
import { Link, useNavigate } from 'react-router-dom';
import apiAuth from 'apis/apiAuth';
import { useDispatch } from 'react-redux';
import { loginSuccess } from 'slices/authSlice';
import { toast } from 'react-toastify';
import Page from 'components/Page';
import LoadingButton from 'components/LoadingButton';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginFacebook from './LoginFacebook';
import LoginGoogle from './LoginGoogle';



const Login = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState({
        value: '',
        showPassword: false,
    });
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (event) => {
        setPassword({ ...password, value: event.target.value });
    };

    const handleClickShowPassword = () => {
        setPassword({
            ...password,
            showPassword: !password.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = () => {
        const params = {
            username,
            password: password.value
        }
        setLoading(true)

        apiAuth.getUserWithLogin(params)
            .then(res => {
                if (res.length !== 0) {
                    dispatch(loginSuccess(res[0]))
                    toast.success("Đăng nhập thành công")
                    navigate('/')
                }
                else {
                    toast.error("Sai tên đăng nhập hoặc mật khẩu")
                }
            })
            .catch(err => {
                console.log(err.response.data)
            })
            .finally(() => setLoading(false))
    }
    return (
        <Page title='Đăng nhập'>

            <Stack justifyContent='center' direction='row'>
                <Paper elevation={24}>

                <Stack className='login' maxWidth='500px' width='500px' p='16px' mt={4}>
                    <Typography color="primary" align='center' fontWeight='600' fontSize='1.75rem' mb={2}>
                        Đăng nhập
                    </Typography>
                    <Stack spacing={2.5}>
                        <TextField
                            size='small'
                            id="outlined-basic"
                            label="Tên đăng nhập"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            variant="outlined" />
                        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" size='small'>
                            <InputLabel
                                htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={password.showPassword ? 'text' : 'password'}
                                value={password.value}

                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {password.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Mật khẩu"
                            />
                        </FormControl>
                        <Stack
                            direction="row"
                            justifyContent='space-between'
                            alignItems='center'
                        >

                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Ghi nhớ đăng nhập" />
                            </FormGroup>
                            <Link to='/forgetPassword'>
                                <Typography>Quên mật khẩu?</Typography>
                            </Link>
                        </Stack>
                        <Stack justifyContent='space-between' alignItems='center' spacing={2}>
                            <LoadingButton loading={loading} onClick={handleLogin}
                                sx={{ width: '136px' }} variant='contained'>Đăng nhập</LoadingButton>
                            <Link to='/register'>
                                <Button sx={{ width: '136px' }} variant='contained'>Đăng ký</Button>
                            </Link>
                        </Stack>
                        <p style={{ textAlign: "center", marginTop: "3rem" }}>Tiếp tục bằng</p>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <LoginFacebook />
                            <LoginGoogle />

                        </Stack>
                    </Stack>
                </Stack>
                </Paper>
            </Stack>
        </Page>
    )
}

export default Login