import { useEffect, useState } from 'react'
import {
    Button,
    Stack,
    Typography,
    TextField,
    Paper,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    RadioGroup,
    Box,
    Divider,
    InputAdornment,
    IconButton
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
import { useSelector } from 'react-redux';
import { getMessageError } from 'utils';



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
    // {
    //     id: 4,
    //     name: 'password',
    //     label: 'Mật khẩu',
    //     type: 'password'
    // },
    // {
    //     id: 5,
    //     name: 'cfPassword',
    //     label: 'Xác nhận mật khẩu',
    //     type: 'password'
    // },
]

const Register = () => {
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState('STUDENT');
    const [isShowPassword,setIsShowPassword] = useState(false)
    const [isShowCfPassword,setIsShowCfPassword] = useState(false)
    const user = useSelector(state => state.user?.info)

    const { handleSubmit, control } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        reValidateMode: "onChange"
    });
    const navigate = useNavigate()

    const onSubmit = (data) => {
        const { fullname, username, password, email } = data
        const params = {
            fullname,
            email,
            username,
            password,
            role: type
        }
        setLoading(true)
        apiAuth.register(params)
            .then(res => {
                toast.success("Đăng ký tài khoản thành công")
                navigate('/login')
            })
            .catch(err => {
                toast.warning(getMessageError(err) || "Đăng ký không thành công")
            })
            .finally(() => {
                setLoading(false)
            })
    }


    const handleChangeType = (event) => {
        setType(event.target.value);
    };

    useEffect(() => {
        if (user) {
            navigate('/my/profile')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <Page title='Đăng ký'>

            <Stack justifyContent='center' direction='row'>
                <Paper elevation={24} sx={{ maxWidth: '800px', width: '100%', margin: "24px" }}>
                    <Stack className='login' p='16px'>

                        <Stack direction={{ xs: 'column', md: 'row' }}>
                            <Box flex={3}>
                                <Typography align='center' color='primary' fontWeight={600} fontSize='1.75rem' mb={2}>
                                    Đăng ký
                                </Typography>
                                <form onSubmit={handleSubmit(onSubmit)} >
                                    <Stack spacing={1.5}>
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
                                            <Controller
                                                name={'password'}
                                                control={control}
                                                render={({ field, fieldState: { error } }) => (
                                                    <TextField
                                                        {...field}
                                                        size='small'
                                                        type={isShowPassword?'text':'password'}
                                                        label={'Mật khẩu'}
                                                        error={error !== undefined}
                                                        helperText={error ? error.message : ''}
                                                        InputProps={{ 
                                                            endAdornment:
                                                            <InputAdornment position="end">
                                                              <IconButton
                                                                onClick={()=>setIsShowPassword(pre=>!pre)}
                                                                edge="end"
                                                              >
                                                                {isShowPassword ?  <VisibilityOff />:<Visibility /> }
                                                              </IconButton>
                                                            </InputAdornment>
                                                          }}
                                                        variant="outlined" />
                                                )}
                                            />
                                            <Controller
                                                name={'cfPassword'}
                                                control={control}
                                                render={({ field, fieldState: { error } }) => (
                                                    <TextField
                                                        {...field}
                                                        size='small'
                                                        type={isShowCfPassword?'text':'password'}
                                                        label={'Mật khẩu xác nhận'}
                                                        error={error !== undefined}
                                                        helperText={error ? error.message : ''}
                                                        InputProps={{ 
                                                            endAdornment:
                                                            <InputAdornment position="end">
                                                              <IconButton
                                                                onClick={()=>setIsShowCfPassword(pre=>!pre)}
                                                                edge="end"
                                                              >
                                                                {isShowCfPassword ? <VisibilityOff /> : <Visibility />}
                                                              </IconButton>
                                                            </InputAdornment>
                                                          }}
                                                        variant="outlined" />
                                                )}
                                            />

                                        <FormControl>
                                            <FormLabel id="demo-controlled-radio-buttons-group">Loại tài khoản</FormLabel>
                                            <RadioGroup
                                                name="controlled-radio-buttons-group"
                                                value={type}
                                                onChange={handleChangeType}
                                                row
                                            >
                                                <FormControlLabel value="STUDENT" control={<Radio />} label="Học sinh" />
                                                <FormControlLabel value="TEACHER" control={<Radio />} label="Giáo viên" />
                                            </RadioGroup>
                                        </FormControl>
                                        <Stack justifyContent='space-between' alignItems='center' spacing={2}>

                                            <LoadingButton loading={loading} type='submit' sx={{ width: '148px' }} variant='contained'>Đăng ký</LoadingButton>
                                            <Link to='/login'>
                                                <Button sx={{ width: '148px' }} variant='contained'>Đăng nhập</Button>
                                            </Link>
                                        </Stack>

                                        <p style={{ textAlign: "center" }}>
                                            Bằng việc tiếp tục, bạn đã chấp nhận{" "}
                                            <a href="/">điều khoản sử dụng</a>
                                        </p>

                                    </Stack>
                                </form>
                            </Box>
                            <Divider orientation="vertical" flexItem sx={{ padding: "0 8px" }} />
                            <Stack flex={2} justifyContent="center" spacing={2}>
                                <p style={{ textAlign: "center", marginTop: "3rem" }}>Hoặc tiếp tục bằng</p>
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

                    </Stack>
                </Paper>
            </Stack >
        </Page>
    )
}

export default Register
