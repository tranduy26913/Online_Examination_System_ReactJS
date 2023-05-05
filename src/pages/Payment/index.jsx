import { useState } from 'react'
import {
    Stack,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
    TextField,
    Paper,
    Box,
    Typography
} from '@mui/material'
import apiProfile from 'apis/apiProfile'
import { toast } from 'react-toastify'
import LoadingButton from 'components/LoadingButton'
function Payment() {
    const [amount, setAmount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState('vnpay')
    const handleChangeType = (e) => {
        setType(e.target.value)
    }

    const handleChangeAmount = (e) => {
        setAmount(Number(e.target.value))
    }

    const handlePayment = () => {
        const params = {
            amount,
            bankCode: null,
            language: 'vn'
        }
        setLoading(true)
        apiProfile
            .makePayment(type, params)
            .then((response) => {
                console.log(response)
                if (response.payUrl) {
                    window.location.replace(response.payUrl)
                }
                else {
                    toast.success("Lỗi tạo hoá đơn. Vui lòng thử lại");
                }
            })
            .catch((error) => {
                toast.error(error.response);
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
            <Stack width='100%' minHeight='100vh' justifyContent='center' alignItems={'center'}>
                <Paper>

                    <Stack width='500px'p={3} spacing={2}>
                        <Typography fontSize='24px' color='primary' align='center'>Nạp tiền</Typography>
                        <TextField placeholder='Nhập số tiền' onChange={handleChangeAmount} />
                        <FormControl>
                            <FormLabel>Loại hình thanh toán</FormLabel>
                            <RadioGroup
                                name="payment"
                                value={type}
                                onChange={handleChangeType}
                                row
                            >
                                <FormControlLabel value="vnpay" control={<Radio />} label="VNPay" />
                                <FormControlLabel value="momo" control={<Radio />} label="Momo" />
                            </RadioGroup>
                        </FormControl>
                        <Stack alignItems={'center'}>

                        <LoadingButton variant='contained'
                         loading={loading} onClick={handlePayment} 
                         >Thanh toán</LoadingButton>
                        </Stack>
                    </Stack>
                </Paper>



            </Stack>

        </>
    )
}

export default Payment