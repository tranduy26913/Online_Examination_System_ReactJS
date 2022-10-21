import React from 'react'
import { useState } from "react";
import { toast } from 'react-toastify';
import {
    Dialog,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    RadioGroup,
    Radio,
    DialogActions,
    FormControlLabel,
} from "@mui/material";
import apiProfile from "apis/apiProfile";
import Loading from "components/Loading";
import { useNavigate } from 'react-router-dom';

const UpgradeAccount = (props) => {
    const [uploading, setUploading] = useState(false);
    const [method, setMethod] = useState('Momo')
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)
    const handleChange = (e) => {
        setMethod(e.target.value)
    }
    const handlePayment = () => {
        setUploading(true)
        apiProfile
            .makePayment(method)
            .then((response) => {
                if(response.payUrl){
                    navigate(response.payUrl)
                }
                else{
                    toast.success("Lỗi tạo hoá đơn. Vui lòng thử lại");
                }
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            })
            .finally(() => setUploading(false))
    };

    return (
        <>
            <Button size="small" variant="outlined" onClick={handleOpen}>
                Nâng cấp
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Nâng cấp tài khoản</DialogTitle>
                <DialogContent>
                    <RadioGroup
                        name="upgrade-account"
                        value={method}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="Momo" control={<Radio />}
                            label="Thanh toán bằng MoMo" />
                        <FormControlLabel value="VNPay" control={<Radio />}
                            label="Thanh toán bằng VNPay" />
                    </RadioGroup>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Huỷ</Button>
                    <Button onClick={handlePayment}>Thanh toán</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default UpgradeAccount