import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import "./Info.scss";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";


import {
    Avatar,
    Typography,
    Stack,
    ListItemText,
    Button,
    FormControl,
    MenuItem,
    RadioGroup,
    Radio,
    FormControlLabel,
    Modal,
    Box,
    IconButton,
    Paper,
    TextField,
    Divider,
    Badge,
    ClickAwayListener,
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockIcon from "@mui/icons-material/Lock";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import CloseIcon from "@mui/icons-material/Close";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useSelector } from "react-redux";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import apiProfile from "../../../apis/apiProfile";
import Loading from "../../../components/Loading";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema'
import { useForm, Controller } from 'react-hook-form'
import { setUserInfo, updateAvatar } from 'slices/userSlice';
import moment from 'moment';
import UpgradeAccount from './UpgradeAccount';
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
    const [image, setImage] = useState([]);
    const [gender, setGender] = useState(user ? user.gender : "")

    const [modalDeleteAvatar, setModalDeleteAvatar] = useState(false);
    const [modalViewAvatar, setModalViewAvatar] = useState(false);
    const [modalUploadAvatar, setModalUploadAvatar] = useState(false);
    const [openAvatar, setOpenAvatar] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [updating, setUpdating] = useState(false);

    const openModalViewAvatar = () => setModalViewAvatar(true);
    const closeModalViewAvatar = () => setModalViewAvatar(false);

    const openModalUploadAvatar = () => setModalUploadAvatar(true);
    const closeModalUploadAvatar = () => setModalUploadAvatar(false);

    const openModalDeleteAvatar = () => setModalDeleteAvatar(true);
    const closeModalDeleteAvatar = () => setModalDeleteAvatar(false);
    const handleBirthday = (newValue) => {
        setBirthday(newValue)
    }
    const handleClickAvatar = () => {
        setOpenAvatar((prev) => !prev);
    };
    const handleClickAwayAvatar = () => {
        setOpenAvatar(false);
    };
    const onChange = (imageList, addUpdateIndex) => {
        setImage(imageList);
    };

    const handleUploadAvatar = () => {
        if (image.length === 0) {
            toast.warning("Vui lòng chọn ảnh")
            return
        }
        if (uploading) {
            toast.warning("Hình ảnh đang được cập nhật, vui lòng không thao tác quá nhiều lần")
            return
        }
        setUploading(true)
        let param = { file: image[0].file }

        apiProfile.putUploadAvatar(param)
            .then(res => {
                toast.success("Cập nhật ảnh đại diện thành công")
                if (res.avatar) {
                    dispatch(updateAvatar(res.avatar))
                }
            })
            .catch(error => {
                toast.error("Cập nhật ảnh đại diện thất bại")
            })
            .finally(() => {
                setModalUploadAvatar(false);
                setUploading(false)
            })
    }

    const handleDeleteAvatar = () => {
        apiProfile.resetAvatar()
            .then(res => {
                toast.success("Xoá ảnh đại diện thành công")
                if (res.avatar) {
                    dispatch(updateAvatar(res.avatar))
                }
            })
            .catch(error => {
                toast.error("Xoá ảnh đại diện thất bại")
            })
        setModalDeleteAvatar(false);
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
                <Paper elevation={24} sx={{ flex: 2 }}>
                    <Stack p={2} height='100%' spacing={2} >

                        <Typography>Thông tin cá nhân</Typography>
                        <Stack direction="row" spacing={4} justifyContent='center'>
                            <ClickAwayListener onClickAway={handleClickAwayAvatar}>
                                <Box sx={{ position: "relative" }} onClick={handleClickAvatar}>
                                    <Badge
                                        badgeContent={<EditRoundedIcon sx={{ fontSize: "18px", color: "white" }} />}
                                        overlap="circular"
                                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                        color="primary"
                                    >
                                        <Avatar
                                            sx={{
                                                width: 110,
                                                height: 110,
                                                border: "3px solid aquamarine",
                                            }}
                                            src={image.length === 0 ? user?.avatar : image[0].data_url}
                                        />
                                    </Badge>
                                    {openAvatar ? (

                                        <Box className="avatar-control">
                                            <Paper elevation={24} sx={{ overflow: 'hidden' }}>
                                                <Stack>
                                                    {/* <Stack autofocusitem={openAvatar.toString()}> */}
                                                    <MenuItem onClick={openModalViewAvatar}>
                                                        <WallpaperIcon sx={{ mr: 2 }} color="disabled" />
                                                        Xem ảnh đại diện
                                                    </MenuItem>

                                                    <MenuItem onClick={openModalUploadAvatar}>
                                                        <VisibilityOutlinedIcon
                                                            sx={{ mr: 2 }}
                                                            color="disabled"
                                                        />
                                                        Cập nhật ảnh đại diện
                                                    </MenuItem>

                                                    <MenuItem onClick={openModalDeleteAvatar}>
                                                        <DeleteIcon sx={{ mr: 2 }} color="disabled" />
                                                        Xóa ảnh đại diện hiện tại
                                                    </MenuItem></Stack>
                                            </Paper>
                                        </Box>

                                    ) : null}
                                </Box>
                            </ClickAwayListener>


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
                                        inputFormat="MM/DD/YYYY"
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
                                    <label>Loại tài khoản</label>
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





                        <Button variant="contained" sx={{ width: 200, alignSelf: "center" }}
                            onClick={handleSubmit(onSaveChange)}
                        >
                            {updating && <Loading color="#fff" />}Lưu thay đổi
                        </Button>
                    </Stack>
                </Paper>

                <Paper elevation={24} sx={{ flex: 1 }}>
                    <Stack spacing={4} p={2}>
                        <Typography>Số điện thoại và Email</Typography>

                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Stack direction="row" spacing={1}>
                                <LocalPhoneOutlinedIcon color="disabled" />
                                <ListItemText
                                    sx={{ '& span': { fontSize: "13px" } }}
                                    primary="Loại tài khoản" secondary={user?.premium?"PREMIUM":"FREE"} />
                            </Stack>
                            {
                                !user?.premium &&
                           <UpgradeAccount/>
                            }
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={15}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Stack direction="row" spacing={1}>
                                <EmailOutlinedIcon color="disabled" />

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
                                <LockIcon color="disabled" />
                                <ListItemText primary="Đổi mật khẩu" />
                            </Stack>
                            <Link to={{
                                pathname:"/my/profile/change-password",
                                param1:"ee"
                            }}>
                                <Button size="small" variant="outlined">
                                    Đổi mật khẩu
                                </Button>
                            </Link>
                        </Stack>


                    </Stack>

                </Paper>
            </Stack>



            {/* Modal view avatar */}
            <Modal
                sx={{ overflowY: "scroll" }}
                open={modalViewAvatar}
                onClose={closeModalViewAvatar}
            >
                <Stack className="modal-info" spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h6" component="h2">
                            Xem ảnh đại diện
                        </Typography>
                        <IconButton onClick={closeModalViewAvatar}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Divider />
                    <img
                        style={{ width: "24rem", height: "24rem", alignSelf: "center" }}
                        src={user?.img}
                        alt="ảnh đại diện"
                    />
                </Stack>
            </Modal>

            {/* Modal upload avatar */}
            <Modal
                sx={{ overflowY: "scroll" }}
                open={modalUploadAvatar}
                onClose={closeModalUploadAvatar}
            >
                <Stack sx={{ padding: "2rem" }} className="modal-info" spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h6" component="h2">
                            Cập nhật ảnh đại diện
                        </Typography>

                        <IconButton onClick={closeModalUploadAvatar}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>

                    <Divider />

                    <Box>
                        <ImageUploading
                            value={image}
                            onChange={onChange}
                            dataURLKey="data_url"
                            acceptType={["jpg"]}
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                            }) => (
                                // write your building UI
                                <Box className="upload__image-wrapper">
                                    {imageList.length === 0 ? (
                                        <Stack
                                            sx={{
                                                width: "100%",
                                                height: "30rem",
                                                border: "2px dashed grey",
                                                borderRadius: "5px",
                                            }}
                                            // style={isDragging ? { color: "red" } : null}
                                            justifyContent="center"
                                            alignItems="center"
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            <Typography
                                                sx={{ ml: "auto", mr: "auto", color: "blue" }}
                                            >
                                                Nhấn để chọn hoặc kéo thả hình ảnh vào khung này.
                                            </Typography>
                                        </Stack>
                                    ) : null}

                                    {imageList.map((image, i) => (
                                        <Stack
                                            key={i}
                                            sx={{
                                                width: "100%",
                                                height: "30rem",
                                                borderRadius: "5px",
                                            }}
                                            spacing={3}
                                            className="image-item"
                                        >
                                            <img
                                                style={{
                                                    width: "25rem",
                                                    height: "25rem",
                                                    alignSelf: "center",
                                                }}
                                                src={image.data_url}
                                                alt=""
                                            />
                                            <Stack
                                                direction="row"
                                                className="image-item__btn-wrapper"
                                                justifyContent="center"
                                                spacing={5}
                                            >
                                                <Button
                                                    sx={{ width: "50%" }}
                                                    variant="outlined"
                                                    onClick={() => onImageRemove(0)}
                                                >
                                                    Hủy bỏ
                                                </Button>
                                                <Button
                                                    sx={{ width: "50%" }}
                                                    variant="contained"
                                                    onClick={handleUploadAvatar}
                                                >
                                                    {uploading && <Loading color="#fff" />} Lưu thay đổi
                                                </Button>
                                            </Stack>
                                        </Stack>
                                    ))}
                                </Box>
                            )}
                        </ImageUploading>
                    </Box>
                </Stack>
            </Modal>

            {/* Modal delete avatar */}
            <Modal
                sx={{ overflowY: "scroll" }}
                open={modalDeleteAvatar}
                onClose={closeModalDeleteAvatar}
            >
                <Stack
                    className="modal-info"
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    width="26rem"
                >
                    <Stack>
                        <InfoOutlinedIcon color="primary" />
                    </Stack>

                    <Stack spacing={3}>
                        <Stack>
                            <Typography sx={{ fontWeight: "bold" }}>
                                Bạn có chắc muốn xoá ảnh đại diện ?
                            </Typography>
                            <Typography>
                                Hình ảnh đại diện sẽ quay về mặc định
                            </Typography>
                        </Stack>

                        <Stack direction="row" justifyContent="flex-end" spacing={1}>
                            <Button onClick={closeModalDeleteAvatar} variant="outlined">
                                Hủy
                            </Button>
                            <Button onClick={handleDeleteAvatar} variant="contained">Xóa bỏ</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Modal>
        </Stack>
    );
}

export default Profile