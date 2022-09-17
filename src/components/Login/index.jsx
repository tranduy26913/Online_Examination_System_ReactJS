import React, { useState } from 'react'
import {
    Box,
    Button,
    Stack,
    Typography,
    Input,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    FormHelperText,
    Checkbox,
    FormControl,
    TextField,
    IconButton,
    FormControlLabel,
    FormGroup
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Login.scss'
import { Link } from 'react-router-dom';
import apiAuth from 'apis/apiAuth';
import { useDispatch } from 'react-redux';
import { loginSuccess } from 'slices/authSlice';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState({
        value: '',
        showPassword: false,
    });
    const dispatch = useDispatch()

    document.title = "Đăng nhập"

    const handleChange =(event) => {
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

    const handleLogin = ()=>{
        const params = {
            username,
            password:password.value
        }
        apiAuth.getUserWithLogin(params)
        .then(res=>{
            dispatch(loginSuccess(res[0]))
        })
        .catch(err=>{
            console.log(err.response.data)
        })
    }
    return (
        <Stack justifyContent='center' direction='row'>
            <Stack className='login' maxWidth='500px' width='500px' bgcolor='#f0f0f0' p='16px' mt={4}>
                <Typography align='center' fontSize='1.75rem' mb={2}>
                    Đăng nhập
                </Typography>
                <Stack spacing={2.5}>
                    <TextField
                    color ='success'
                        size='small'
                        id="outlined-basic"
                        label="Tên đăng nhập"
                        value={username}
                        onChange={e=>setUsername(e.target.value)}
                        variant="outlined" />
                    <FormControl sx={{ m: 1, width: '100%' }} color ='success' variant="outlined" size='small'>
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
                            <FormControlLabel control={<Checkbox color ='success' defaultChecked />} label="Ghi nhớ đăng nhập" />
                        </FormGroup>
                        <Link to='/forgetPassword'>
                            <Typography color='success'>Quên mật khẩu?</Typography>
                        </Link>
                    </Stack>
                    <Stack justifyContent='space-between' alignItems='center' spacing={2}>
                        <Button onClick={handleLogin}
                         sx={{width:'120px'}} color ='success' variant='contained'>Đăng nhập</Button>
                        <Link to='/register'>
                            <Button sx={{width:'120px'}} color ='success' variant='contained'>Đăng ký</Button>
                        </Link>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Login