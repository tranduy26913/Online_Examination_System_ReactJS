import React from 'react'
import { useState } from "react";
import { toast } from 'react-toastify';
import {
    Dialog,
    Button,
    DialogTitle,
    DialogContent,
    RadioGroup,
    Radio,
    DialogActions,
    FormControlLabel,
} from "@mui/material";
import apiProfile from "apis/apiProfile";
import LoadingButton from 'components/LoadingButton';
import ConfirmButton from 'components/ConfirmDialog';

const UpgradeAccount = (props) => {
    const [uploading, setUploading] = useState(false);
    const [method, setMethod] = useState('Momo')
    const [open, setOpen] = useState(false)

    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)
    const handleChange = (e) => {
        setMethod(e.target.value)
    }
    const handlePayment = () => {
        // if(method==='Momo'){
        //     toast.warning("Chức năng thanh toán với Momo tạm thòi đóng vì bảo trì. Vui lòng chọn hình thức thanh toán khác")
        //     return
        // }
        const params = {
            amount:50000,
            bankCode:null,
            language :'vn'
        }
        setUploading(true)
        apiProfile
            .upgradeAccount(method,params)
            .then((response) => {
                console.log(response)
                if(response.payUrl){
                    window.location.replace(response.payUrl)
                }
                else{
                    toast.success("Lỗi tạo hoá đơn. Vui lòng thử lại");
                }
            })
            .catch((error) => {
                console.log(error.response)
                toast.error(error.response);
            })
            .finally(() => setUploading(false))
    };

    return (
        <>
            <ConfirmButton title="Nâng cấp tài khoản"
            textConfirm='Nâng cấp'
                description="Xác nhận dùng 50.000 xu để nâng cấp tài khoản?"
                size="small" variant="outlined" onClick={handlePayment}>
            </ConfirmButton>
            {/* <Dialog open={open} onClose={handleClose}>
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
                    <Button  variant='contained' onClick={handleClose}>Huỷ</Button>
                    <LoadingButton variant='contained' loading={uploading} onClick={handlePayment}>Thanh toán</LoadingButton>
                </DialogActions>
            </Dialog> */}
        </>
    );
}

export default UpgradeAccount