import { useState } from 'react'
import {
    Button,
    Stack,
    Typography,
    TextField,
    Paper,
} from '@mui/material'

import './Login.scss'
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema'
import { useForm, Controller } from 'react-hook-form'
import apiAuth from 'apis/apiAuth';
import { toast } from 'react-toastify';
import Page from 'components/Page';
import LoadingButton from 'components/LoadingButton';
import LoginFacebook from 'components/Login/LoginFacebook';
import LoginGoogle from 'components/Login/LoginGoogle';


const INPUTS = [
    {
        id: 1,
        name: 'fullname',
        label: 'Họ và tên',
        type: 'text'
    },
    {
        id: 2,
        name: 'email',
        label: 'Địa chỉ Email',
        type: 'text'
    },
    {
        id: 3,
        name: 'username',
        label: 'Tên đăng nhập',
        type: 'text'
    },
    {
        id: 4,
        name: 'password',
        label: 'Mật khẩu',
        type: 'password'
    },
    {
        id: 5,
        name: 'cfPassword',
        label: 'Xác nhận mật khẩu',
        type: 'password'
    },
]

const Register = () => {
    const [loading, setLoading] = useState(false)
    const { handleSubmit, control } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        reValidateMode: "onChange"
    });
    const navigate = useNavigate()

    const onSubmit = (data) => {
        const { fullname, username, password, email } = data
        const params = {
            avatar: 'https://1.bp.blogspot.com/-CV8fOXMMw60/YZ-UJ4X9sAI/AAAAAAAACMc/2Svet97exjgNdJ9CeTKUU3OuA-mnCQEzwCLcBGAsYHQ/s595/3a.jpg',
            fullname,
            email,
            username,
            password,
            role: 'teacher'
        }
        setLoading(true)
        apiAuth.postUser(params)
            .then(res => {
                toast.success("Đăng ký tài khoản thành công")
                navigate('/login')
            })
            .catch(err => {
                toast.error("Đăng ký tài khoản không thành công")
            })
            .finally(() => {
                setLoading(false)
            })
    }


    return (
        <Page title='Đăng ký'>

            <Stack justifyContent='center' direction='row' my={2}>
                <Paper elevation={24}>
                    <Stack className='login' maxWidth='500px' width='500px' p='16px'>
                        <Typography align='center' color='primary' fontWeight={600} fontSize='1.75rem' mb={2}>
                            Đăng ký
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <Stack spacing={2.5}>
                                {INPUTS.map(item =>
                                    <Controller
                                        name={item.name}
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <TextField
                                                {...field}
                                                size='small'
                                                type={item.type}
                                                label={item.label}
                                                error={error !== undefined}
                                                helperText={error ? error.message : ''}
                                                // sx={{ backgroundColor: "#fff" }}
                                                variant="outlined" />
                                        )}
                                    />)}


                                <Stack justifyContent='space-between' alignItems='center' spacing={2}>

                                    <LoadingButton loading={loading} type='submit' sx={{ width: '148px' }} variant='contained'>Đăng ký</LoadingButton>
                                    <Link to='/login'>
                                        <Button sx={{ width: '148px' }} variant='contained'>Đăng nhập</Button>
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
