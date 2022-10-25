import React, { useState,useRef } from 'react'
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
    Paper,
    Divider
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
import LoginFacebook from './LoginFacebook';
import LoginGoogle from './LoginGoogle';
import { setUserInfo } from 'slices/userSlice';
import { getMessageError } from 'utils';
import RequestActive from './RequestActive';



const Login = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState({
        value: '',
        showPassword: false,
    });
    const passwordRef = useRef()
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

    const handlePasswordKeyDown = (e) => {
        if (e.key === 'Enter')
            handleLogin()
    }
    const handleUsernameKeyDown = (e) => {
        if (e.key === 'Enter')
            passwordRef.current.focus()
    }
    const handleLogin = () => {
        const params = {
            username,
            password: password.value
        }
        setLoading(true)

        apiAuth.login(params)
            .then(res => {
                if (res) {
                    dispatch(loginSuccess(res))
                    dispatch(setUserInfo(res))
                    toast.success("Đăng nhập thành công")
                    navigate('/my/profile')
                }
                else {
                    toast.error("Sai tên đăng nhập hoặc mật khẩu")
                }
            })
            .catch(err => {
                toast.warning(getMessageError(err))
            })
            .finally(() => setLoading(false))
    }
    return (
        <Page title='Đăng nhập'>

            <Stack justifyContent='center' direction='row'>
                <Paper elevation={24} sx={{ maxWidth: '800px', width: '100%', margin: "24px", padding: '16px' }}>
                    <Stack direction={{ xs: 'column', md: 'row' }}>

                        <Stack flex={3}>
                            <Typography color="primary" align='center' fontWeight='600' fontSize='1.75rem' mb={2}>
                                Đăng nhập
                            </Typography>
                            <Stack spacing={2.5}>
                                <TextField
                                
                                    size='small'
                                    id="outlined-basic"
                                    label="Tên đăng nhập"
                                    value={username}
                                    onKeyDown={handleUsernameKeyDown}
                                    onChange={e => setUsername(e.target.value)}
                                    variant="outlined" />
                                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" size='small'>
                                    <InputLabel
                                        htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                                    <OutlinedInput
                                    inputRef={passwordRef}
                                        id="outlined-adornment-password"
                                        type={password.showPassword ? 'text' : 'password'}
                                        value={password.value}
                                        onKeyDown={handlePasswordKeyDown}
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
                                    alignItems='flex-start'
                                >

                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Ghi nhớ đăng nhập" />
                                    </FormGroup>
                                    <Stack alignItems={'flex-end'}>

                                        <RequestActive type='reset-password' />
                                        <RequestActive type='reactive' />
                                    </Stack>
                                </Stack>
                                <Stack justifyContent='space-between' alignItems='center' spacing={2}>
                                    <LoadingButton loading={loading} onClick={handleLogin}
                                        sx={{ width: '136px' }} variant='contained'>Đăng nhập</LoadingButton>
                                    <Link to='/register'>
                                        <Button sx={{ width: '136px' }} variant='contained'>Đăng ký</Button>
                                    </Link>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Divider orientation="vertical" flexItem sx={{ padding: "0 8px" }} />
                        <Stack flex={2} justifyContent="center" spacing={2}>
                            <p style={{ textAlign: "center" }}>Hoặc tiếp tục bằng</p>
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