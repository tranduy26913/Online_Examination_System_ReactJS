import { useState } from "react";
import ImageUploading from "react-images-uploading";
import { toast } from 'react-toastify';
import premium from 'assets/img/premium.png'
//Material UI
import {
    Avatar,
    Typography,
    Stack,
    Button,
    MenuItem,
    Box,
    IconButton,
    Paper,
    Divider,
    Badge,
    ClickAwayListener,
    Tooltip,
    Dialog
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

//library
import { useSelector, useDispatch } from "react-redux";
import apiProfile from "apis/apiProfile";
import Loading from "components/Loading";
import { updateAvatar } from 'slices/userSlice';

const premiumStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '36%',
    width: '54%',
    transform: 'translate(-38%, -38%) rotate(-45deg)'
}
function ToolAvatar() {
    const user = useSelector(state => state.user.info);
    const dispatch = useDispatch();

    const [image, setImage] = useState([]);

    const [modalDeleteAvatar, setModalDeleteAvatar] = useState(false);
    const [modalViewAvatar, setModalViewAvatar] = useState(false);
    const [modalUploadAvatar, setModalUploadAvatar] = useState(false);
    const [openAvatar, setOpenAvatar] = useState(false);
    const [uploading, setUploading] = useState(false);

    const openModalViewAvatar = () => setModalViewAvatar(true);
    const closeModalViewAvatar = () => setModalViewAvatar(false);

    const openModalUploadAvatar = () => {
        if (uploading) {
            return
        }
        setImage([])
        setModalUploadAvatar(true);
    }
    const closeModalUploadAvatar = () => setModalUploadAvatar(false);

    const openModalDeleteAvatar = () => setModalDeleteAvatar(true);
    const closeModalDeleteAvatar = () => setModalDeleteAvatar(false);
   
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
        setUploading(false)

        let param = { file: image[0].file }
        const id = toast.loading("Đang tải ảnh lên...")
        setModalUploadAvatar(false);
        apiProfile.putUploadAvatar(param)
            .then(res => {
                toast.update(id, { render: "Cập nhật ảnh đại diện thành công", type: "success", isLoading: false,autoClose:"1200" })
                if (res.avatar) {
                    dispatch(updateAvatar(res.avatar))
                }
            })
            .catch(error => {
                toast.update(id, { render: "Cập nhật ảnh đại diện thất bại", type: "warning", isLoading: false })
            })
            .finally(() => {
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
    return (
        <>
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
                        {user?.premium &&
                            <Tooltip title="Tài khoản Premium">
                                <Avatar src={premium} variant="rounded" sx={premiumStyle} />
                            </Tooltip>}
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
            {/* Modal view avatar */}
            <Dialog open={modalViewAvatar} sx={{ overflowY: "scroll" }}
                onClose={closeModalViewAvatar}>
                {/* <DialogTitle>Xem ảnh đại diện</DialogTitle> */}
                <Stack spacing={1} p={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems={'center'}>
                        <Typography variant="h6">
                            Xem ảnh đại diện
                        </Typography>
                        <IconButton onClick={closeModalViewAvatar}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Divider />
                    <Avatar
                        variant="rounded"
                        sx={{ width: '24rem', height: '24rem' }}
                        src={user?.avatar}
                        alt="ảnh đại diện"
                    />
                </Stack>
            </Dialog>

            {/* Modal upload avatar */}
            <Dialog sx={{ overflowY: "scroll" }}
                fullWidth={true}
                maxWidth={'md'}
                open={modalUploadAvatar}
                onClose={closeModalUploadAvatar} >

                <Stack sx={{ padding: "2rem" }} spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems={'center'}>
                        <Typography variant="h6">
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
                                                height: "26rem",
                                                border: "2px dashed grey",
                                                borderRadius: "5px",
                                            }}
                                            // style={isDragging ? { color: "red" } : null}
                                            justifyContent="center"
                                            alignItems="center"
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            <Typography color="primary"
                                                sx={{ ml: "auto", mr: "auto", }}
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
            </Dialog>

            {/* Modal delete avatar */}
            <Dialog
                sx={{ overflowY: "scroll" }}
                open={modalDeleteAvatar}
                onClose={closeModalDeleteAvatar} >
                <Stack spacing={3}
                    p={2}>
                    <Stack spacing={1}>
                        <Stack direction='row' spacing={1} alignItems='center'>
                            <InfoOutlinedIcon color="primary" />
                            <Typography sx={{ fontWeight: "bold" }}>
                                Bạn có chắc muốn xoá ảnh đại diện ?
                            </Typography>
                        </Stack>

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
            </Dialog>
        </>
    )
}

export default ToolAvatar