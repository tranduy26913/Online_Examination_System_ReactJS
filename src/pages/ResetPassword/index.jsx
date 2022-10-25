import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import {
    Typography,
    Stack,
    Button,
    Paper,
    TextField,
    InputAdornment,
    IconButton
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import apiProfile from "apis/apiProfile";
import Loading from "components/Loading";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
import jwtDecode from "jwt-decode";

const INPUTS = [
    {
        id: 0,
        name: 'newPassword',
        label: 'Mật khẩu mới'
    },
    {
        id: 1,
        name: 'cfPassword',
        label: 'Xác nhận mật khẩu mới'
    }
]
function ResetPassword() {
    const { token } = useParams()
    const [isShow, setIsShow] = useState([false, false])
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate()
    const { handleSubmit, control } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        reValidateMode: "onChange",
        defaultValues: {
            newPassword: "",
            cfPassword: ""
        }
    });

    useEffect(() => {
        const checkToken = () => {
            if (!token) {
                toast.error("Đường dẫn đặt lại mật khẩu không hợp lệ")
                navigate('/')
            }
            try{
                const decodeToken = jwtDecode(token);
                if(!decodeToken?.exp){
                    toast.error("Đường dẫn đặt lại mật khẩu không hợp lệ")
                    navigate('/')
                }
                if(decodeToken?.exp < new Date().getTime()/1000){
                    toast.error("Đường dẫn đặt lại mật khẩu đã hết hạn. Vui lòng thực hiện yêu cầu đặt lại mới")
                    navigate('/')
                }
            }
            catch(err){
                toast.error("Đường dẫn đặt lại mật khẩu không hợp lệ")
                    navigate('/')
            }
        }
        checkToken()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])


    const handleShowPassword = (index) => {
        let newArr = [...isShow]
        newArr[index] = !newArr[index]
        setIsShow(newArr)
    }

    const onSaveChange = (data) => {
        const { newPassword, cfPassword } = data
        const params = {
            newPassword, cfPassword, token
        };
        setUploading(true)
        apiProfile
            .putResetPassword(params)
            .then((response) => {
                toast.success(response.message);
                navigate('/login')
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            })
            .finally(() => setUploading(false))
    };

    return (
        <Stack width='100%' height='100vh' >
            <Paper elevation={24} sx={{ m: 'auto',width:'100%',maxWidth:'500px' }}>
                <Stack p={2} spacing={1}  alignItems='center'>
                    <Typography variant='h5' color='primary' mb={1}>Thay đổi mật khẩu</Typography>
                    <Stack width='100%' spacing={3} margin='12px auto !important'>
                        {
                            INPUTS.map((item, index) =>
                                <Controller key={index}
                                    name={item.name}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            type={isShow[index] ? 'text' : 'password'}
                                            label={item.label}
                                            size='small'
                                            error={error !== undefined}
                                            helperText={error ? error.message : ''}
                                            InputProps={{
                                                endAdornment:
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => handleShowPassword(index)}
                                                            edge="end"
                                                        >
                                                            {isShow[index] ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                            }}
                                            variant="outlined" />
                                    )}
                                />
                            )
                        }

                    </Stack>

                    <Button variant="contained" sx={{ width: 200, alignSelf: "center" }}
                        onClick={handleSubmit(onSaveChange)}
                    >
                        {uploading && <Loading color="#fff" />}Đặt lại mật khẩu
                    </Button>
                </Stack>
            </Paper>

        </Stack>

    );
}

export default ResetPassword