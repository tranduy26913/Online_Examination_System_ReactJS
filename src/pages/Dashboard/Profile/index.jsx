import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import "./Info.scss";
//Material UI
import {
    Typography,
    Stack,
    ListItemText,
    Button,
    FormControl,
    RadioGroup,
    Radio,
    FormControlLabel,
    Paper,
    TextField,
} from "@mui/material";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DiamondIcon from '@mui/icons-material/Diamond';
import Grid from '@mui/material/Unstable_Grid2';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from "@mui/icons-material/Lock";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

//library
import { useSelector, useDispatch } from "react-redux";
import apiProfile from "../../../apis/apiProfile";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema'
import { useForm, Controller } from 'react-hook-form'
import { setUserInfo } from 'slices/userSlice';
import moment from 'moment';
import UpgradeAccount from './UpgradeAccount';
import LoadingButton from "components/LoadingButton";
import ToolAvatar from "./ToolAvatar";

const Profile = () => {
    const user = useSelector(state => state.user.info);
    const dispatch = useDispatch();
    const { handleSubmit, control } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        reValidateMode: "onChange",
        defaultValues: {
            fullname: user?.fullname || "",
            phone: user?.phone || "",
            address: user?.address || "",
            school: user?.school || ""
        }
    });
   

    const [birthday, setBirthday] = useState(moment(user?.birthday))
    const [gender, setGender] = useState(user ? user.gender : "")
    const [updating, setUpdating] = useState(false);

    const handleBirthday = (newValue) => {
        setBirthday(newValue)
    }


    const onChangeGender = (event) => {
        setGender(event.target.value); 
    }
    const onSaveChange = (data) => {
        const { fullname, address, phone, school } = data
        const params = {
            gender, fullname, address, phone, school,
            birthday: birthday.toDate()
        };
        setUpdating(true)
        apiProfile
            .putChangeInfo(params)
            .then((response) => {
                toast.success("Thay đổi thành công");
                getUserProfile();
            })
            .catch((error) => {
                toast.error(error.response.data.message);
                console.log(error)
            })
            .finally(() => setUpdating(false))
    };
    const getUserProfile = () => {
        apiProfile.getUserProfile()
            .then((res) => {
                let newUser = res
                setBirthday(moment(res.birthday))
                dispatch(setUserInfo(newUser))
            })
    }
   
    return (
        <Stack className="customer-info" spacing={3}>
            <Stack direction="row" spacing={2}>
                <Paper elevation={12} sx={{ flex: 2 }}>
                    <Stack p={2} height='100%' spacing={2} >

                        <Typography>Thông tin cá nhân</Typography>
                        <Stack direction="row" spacing={4} justifyContent='center'>
                            <ToolAvatar/>


                        </Stack>
                        <Grid container spacing={2} width='100%'>
                            <Grid md={6} xs={12}>
                                <Controller
                                    name={'fullname'}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Họ và tên"
                                            size='small'
                                            error={error !== undefined}
                                            helperText={error ? error.message : ''}
                                        />)}
                                />
                            </Grid>
                            <Grid md={6} xs={12}>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DesktopDatePicker
                                        inputFormat="DD/MM/YYYY"
                                        label="Ngày sinh"
                                        value={birthday}
                                        onChange={handleBirthday}
                                        renderInput={(params) =>
                                            <TextField {...params} size='small' fullWidth />
                                        }
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid md={6} xs={12}>
                                <Controller
                                    name={'phone'}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            size='small'
                                            label="Số điện thoại"
                                            error={error !== undefined}
                                            helperText={error ? error.message : ''}
                                        //InputLabelProps={{ shrink: true }}
                                        />)}
                                />
                            </Grid>
                            <Grid md={6} xs={12}>
                                <Controller
                                    name={'address'}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            size='small'
                                            label="Địa chỉ"
                                        />)}
                                />
                            </Grid>
                            <Grid xs={12}>
                                <Controller
                                    name={'school'}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            size='small'
                                            label="Trường học"
                                        />)}
                                />
                            </Grid>
                            <Grid xs={12}>
                                <FormControl sx={{ width: '100%' }}>
                                    <label>Giới tính</label>
                                    <RadioGroup
                                        row
                                        name="row-radio-buttons-group"
                                        value={gender}
                                        onChange={onChangeGender}
                                    >
                                        <FormControlLabel value="Male" control={<Radio />} label="Nam" />
                                        <FormControlLabel value="Female" control={<Radio />} label="Nữ" />

                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                        </Grid>

                        <LoadingButton loading={updating} variant="contained" sx={{ width: 200, alignSelf: "center" }}
                            onClick={handleSubmit(onSaveChange)}
                        >
                            Lưu thay đổi
                        </LoadingButton>
                    </Stack>
                </Paper>

                <Paper elevation={12} sx={{ flex: 1 }}>
                    <Stack spacing={4} p={2}>
                        <Typography>Số điện thoại và Email</Typography>

                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Stack direction="row" spacing={1}>
                                <DiamondIcon color="primary" />
                                <ListItemText
                                    sx={{ '& span': { fontSize: "13px" } }}
                                    primary="Loại tài khoản" secondary={user?.premium ? "PREMIUM" : "FREE"} />
                            </Stack>
                            {
                                !user?.premium &&
                                <UpgradeAccount />
                            }
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={15}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Stack direction="row" spacing={1}>
                                <EmailIcon color="primary" />

                                <ListItemText
                                    sx={{ '& span': { fontSize: "13px" } }}
                                    primary="Địa chỉ email"
                                    secondary={user?.email}
                                />
                            </Stack>

                        </Stack>

                        <Typography>Bảo mật</Typography>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Stack direction="row" spacing={1}>
                                <LockIcon color="primary" />
                                <ListItemText primary="Đổi mật khẩu" />
                            </Stack>
                            <Link to={{
                                pathname: "/my/profile/change-password",
                                param1: "ee"
                            }}>
                                <Button size="small" variant="outlined">
                                    Đổi mật khẩu
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>

        </Stack>
    );
}

export default Profile