import React from 'react'
import { useState } from "react";
import { toast } from 'react-toastify';
import {
    Dialog,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
} from "@mui/material";
import apiProfile from "apis/apiProfile";
import LoadingButton from 'components/LoadingButton';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'slices/userSlice';
import UpgradeIcon from '@mui/icons-material/Upgrade';

const UpgradeRole = (props) => {
    const [uploading, setUploading] = useState(false);
    const [open, setOpen] = useState(false)

    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)
    const dispatch = useDispatch()
    const handleUpgrade = () => {
        setUploading(true)
        apiProfile.updateRole()
            .then((response) => {
                if(response.user)
                    dispatch(setUserInfo(response.user))
                toast.success(response.message)
            })
            .catch((error) => {
                console.log(error.response)
                toast.error(error.response);
            })
            .finally(() => {
                setOpen(false)
                setUploading(false)
            })
    };

    return (
        <>
            <Button endIcon={<UpgradeIcon />}
            size="small" variant="outlined" onClick={handleOpen}>
                Giáo viên
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Nâng cấp lên tài khoản giáo viên</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn nâng cấp lên tài khoản dành cho Giáo viên?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button  variant='contained' onClick={handleClose}>Huỷ</Button>
                    <LoadingButton variant='contained' loading={uploading} onClick={handleUpgrade}>Nâng cấp</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default UpgradeRole