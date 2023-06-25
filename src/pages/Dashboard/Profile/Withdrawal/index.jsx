import React from 'react'
import { useState } from "react";
import { toast } from 'react-toastify';
import {
    Dialog,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    Stack,
    TextField,
} from "@mui/material";
import apiProfile from "apis/apiProfile";
import LoadingButton from 'components/LoadingButton';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { getMessageError } from 'utils';

const listBank = {
    VIETCOMBANK: "Ngân hàng ngoại thương Việt Nam(VietcomBank)",
    BIDV: "Ngân hàng Đầu tư và Phát triển VN (BIDV)",
    VIETINBANK: "NH Công thương VN (Vietinbank)",
    AGRIBANK: "NH Nông nghiệp&PT Nông thôn VNAGribank",
    PVCOMBANK: "Ngân hàng TMCP Đại A",
    NCB: "Ngân hàng TMCP Quốc Dân",
    VIETABANK: "Ngân hàng TMCP Việt Á",
    BAOVIETBANK: "NH BẢO VIỆT (Bao Viet Bank)",
    TECHCOMBANK: "NHTMCP Kỹ thương VN (Techcombank)",
    NAMABANK: "NHTMCP Nam Á (Nam A Bank)",
    HDBANK: "NHTMCP phát triển Tp HCM (HD Bank)",
    OCB: "NHTMCP Phương Đông (OCB)",
    MB: "NHTMCP Quân Đội (MB)",
    VIB: "NHTMCP Quốc Tế (VIB)",
    SCB: "NHTMCP Sài Gòn (SCB)",
    SHB: "NHTMCP Sài Gòn  Hà Nội (SHB)",
    SACOMBANK: "NHTMCP Sài gòn Thương Tín (Sacombank)",
    SAIGONBANK: "NHTMCP SG Công Thương (SaigonBank)",
    VPBANK: "NHTMCP VN Thịnh Vượng (VP Bank)",
    PGBANK: "NHTMCP Xăng dầu Petrolimex (PGBank)",
    EXIMBANK: "NHTMCP Xuất Nhập Khẩu (Eximbank)",
    PVCOMBANK: "NH Đại Chúng (PVcombank)",
    TIENPHONGBANK: "NH Tiên Phong (Tiên Phong Bank)",
    LIENVIETPOSTBANK: "NH TMCP BƯU ĐIỆN LIÊN VIỆT",
    ACB: "NHTMCP Á Châu (ACB)",
    ABBANK: "NHTMCP An Bình (ABBank)",
    BACABANK: "NHTMCP Bắc Á (Bac A bank)",
    OCEANBANK: "NHTMCP Đại Dương (Oceanbank)",
    GPBANK: "NHTMCP Dầu khí Toàn cầu (GPBank)",
    DONGABANK: "NHTMCP Đông Á (Dong A bank)",
    SEABANK: "NHTMCP Đông Nam Á (Seabank)",
    MARITIMEBANK: "NHTMCP Hàng Hải (Maritime Bank)",
    KIENLONGBANK: "NHTMCP Kiên Long (Kien Long bank)",
  }
const Withdrawal = (props) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const [bank, setBank] = React.useState('');
    const [creditNumber, setCreditNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [amount, setAmount] = React.useState(0);

    const handleChange = (event) => {
      setBank(event.target.value);
    };
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)

    const handleChangeAmount = (e) => {
        setAmount(Number(e.target.value))
    }

        const handlePayment = () => {
            setLoading(true)
        const params = {
            creditNumber,
            password,
            amount,
            bank
        }
        apiProfile.Withdrawal(params)
            .then((response) => {
                
                toast.success(response.message)
            })
            .catch((error) => {
                toast.error(getMessageError(error));
            })
            .finally(() => {
                setOpen(false)
                setLoading(false)
            })
    };

    return (
        <>
            <Button endIcon={<UpgradeIcon />}
                size="small" variant="outlined" onClick={handleOpen}>
                Rút tiền
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={"md"}>
                <DialogTitle align='center'>RÚT TIỀN</DialogTitle>
                <DialogContent>
                    <Stack width='500px' p={3} spacing={2}>
                        <TextField placeholder='Nhập số tiền' onChange={handleChangeAmount} />
                       
                            <FormControl >
                                <InputLabel id="demo-simple-select-label">Ngân hàng</InputLabel>
                                <Select
                                    id="demo-simple-select"
                                    value={bank}
                                    label="Ngân hàng"
                                    onChange={handleChange}
                                >
                                    {
                                        Object.entries(listBank).map((item,index)=>
                                            <MenuItem key={index} value={item[0]}>{item[1]}</MenuItem> )
                                    }
                                </Select>
                            </FormControl>
                            <TextField placeholder='Nhập số tài khoản' onChange={(e)=>setCreditNumber(e.target.value)} />
                            <TextField placeholder='Nhập mật khẩu'type="password" onChange={e=>setPassword(e.target.value)} />
                        <Stack alignItems={'center'}>

                            
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose}>Huỷ</Button>
                    <LoadingButton variant='contained' loading={loading} onClick={handlePayment}>Rút tiền</LoadingButton>

                </DialogActions>
            </Dialog>
        </>
    );
}

export default Withdrawal