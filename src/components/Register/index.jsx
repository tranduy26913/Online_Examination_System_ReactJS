import React from 'react'
import {
    Button,
    Stack,
    Typography,
    TextField,
    Paper,
} from '@mui/material'

import './Login.scss'
import { Link, useNavigate } from 'react-router-dom';
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema'
import { useForm, Controller } from 'react-hook-form'
import apiAuth from 'apis/apiAuth';
import { toast } from 'react-toastify';
import Page from 'components/Page';


const Register = () => {
    const { handleSubmit, control } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        reValidateMode: "onChange"
    });
    const navigate = useNavigate()

    const client_url = "https://tiki-web.vercel.app/"

    const onSubmit = (data) => {
        const {fullname,username, password} = data
        const params = {
            avatar:'https://1.bp.blogspot.com/-CV8fOXMMw60/YZ-UJ4X9sAI/AAAAAAAACMc/2Svet97exjgNdJ9CeTKUU3OuA-mnCQEzwCLcBGAsYHQ/s595/3a.jpg',
            fullname,
            username,
            password,
            role:'teacher'
        }
        apiAuth.postUser(params)
        .then(res=>{
            toast.success("Đăng ký tài khoản thành công")
            navigate('/login')
        })
        .catch(err=>{
            toast.error("Đăng ký tài khoản không thành công")
        })
    }

    return (
        <Page title='Đăng ký'>

        <Stack justifyContent='center' direction='row'>
            <Paper>

            <Stack className='login' maxWidth='500px' width='500px'  p='16px' mt={4}>
                <Typography align='center' color='primary' fontSize='1.75rem' mb={2}>
                    Đăng ký
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <Stack spacing={2.5}>
                        <Controller
                            name={"fullname"}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    
                                    size='small'
                                    type='text'
                                    label="Họ và tên"
                                    error={error !== undefined}
                                    helperText={error ? error.message : ''}
                                   // sx={{ backgroundColor: "#fff" }}
                                    variant="outlined" />
                            )}
                        />
                        <Controller
                            name={"username"}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    
                                    size='small'
                                    type='text'
                                    label="Tên đăng nhập"
                                    error={error !== undefined}
                                    helperText={error ? error.message : ''}
                                    //sx={{ backgroundColor: "#fff" }}
                                    variant="outlined" />
                            )}
                        />

                        <Controller
                            name={"password"}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    
                                    size='small'
                                    type='password'
                                    label="Mật khẩu"
                                    error={error !== undefined}
                                    helperText={error ? error.message : ''}
                                   // sx={{ backgroundColor: "#fff" }}
                                    variant="outlined" />
                            )}
                        />
                        <Controller
                            name={"cfPassword"}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    
                                    size='small'
                                    type='password'
                                    label="Mật khẩu"
                                    error={error !== undefined}
                                    helperText={error ? error.message : ''}
                                    //sx={{ backgroundColor: "#fff" }}
                                    variant="outlined" />
                            )}
                        />
                        <Stack justifyContent='space-between' alignItems='center' spacing={2}>

                            <Button type='submit' sx={{ width: '148px' }}  variant='contained'>Đăng ký</Button>
                            <Link to='/login'>
                                <Button sx={{ width: '148px' }}  variant='contained'>Đăng nhập</Button>
                            </Link>
                        </Stack>
                        <p style={{ textAlign: "center", marginTop: "3rem" }}>Tiếp tục bằng</p>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <a href={`https://nhom3-tiki.herokuapp.com/oauth2/authorization/facebook?redirect_uri=${client_url}oauth2/redirect`} className="hre">
                                <FacebookRoundedIcon
                                    sx={{
                                        cursor: 'pointer',
                                        color: "#4267b2",
                                        fontSize: "3rem"
                                    }} />
                            </a>

                            <a href={`https://nhom3-tiki.herokuapp.com/oauth2/authorization/google?redirect_uri=${client_url}oauth2/redirect`} className="hre">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                    width="48" height="48"
                                    viewBox="0 0 48 48"
                                    style={{ fill: "#000000" }}><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                            </a>
                        </Stack>
                        <p style={{ textAlign: "center" }}>
                            Bằng việc tiếp tục, bạn đã chấp nhận{" "}
                            <a href="/">điều khoản sử dụng</a>
                        </p>

                    </Stack>
                </form>

            </Stack>
            </Paper>
        </Stack >
        </Page>
    )
}

export default Register
