import React from 'react'
import { useState } from "react";
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

const INPUTS = [
    {
        id: 0,
        name: 'password',
        label: 'Mật khẩu hiện tại'
    },
    {
        id: 1,
        name: 'newPassword',
        label: 'Mật khẩu mới'
    },
    {
        id: 2,
        name: 'cfPassword',
        label: 'Xác nhận mật khẩu mới'
    }
]
const ChangePassword = (props) => {
    const [isShow, setIsShow] = useState([false,false,false])
    const [uploading, setUploading] = useState(false);
    const { handleSubmit, control } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        reValidateMode: "onChange",
        defaultValues: {
            password:"",
            newPassword:"",
            cfPassword:""
        }
    });
    
    const handleShowPassword = (index)=>{
        let newArr = [...isShow]
        newArr[index] = !newArr[index]
        setIsShow(newArr)
    }

    const onSaveChange = (data) => {
        const { password,newPassword,cfPassword } = data
        const params = {
            password,newPassword,cfPassword
        };
        setUploading(true)
        apiProfile
            .putChangePassword(params)
            .then((response) => {
                toast.success("Thay đổi thành công");
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            })
            .finally(() => setUploading(false))
    };

    return (
       
                <Paper elevation={24} sx={{ flex: 2 }}>
                    <Stack p={2} height='100%' spacing={2} >
                        <Typography>Thay đổi mật khẩu</Typography>
                        <Stack maxWidth={'500px'} width='100%' spacing={2} alignItems='center' margin='12px auto !important'>
                            {
                                INPUTS.map((item,index)=>
                                    <Controller key={index}
                                    name={item.name}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            type={isShow[index]?'text':'password'}
                                            label={item.label}
                                            size='small'
                                            error={error !== undefined}
                                            helperText={error ? error.message : ''}
                                            InputProps={{ 
                                                endAdornment:
                                                <InputAdornment position="end">
                                                  <IconButton
                                                    onClick={()=>handleShowPassword(index)}
                                                    edge="end"
                                                  >
                                                    {isShow[index] ?  <VisibilityOff />:<Visibility /> }
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
                            {uploading && <Loading color="#fff" />}Lưu thay đổi
                        </Button>
                    </Stack>
                </Paper>

    );
}

export default ChangePassword