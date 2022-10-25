import { Stack, Paper, TextField, Typography, Modal } from '@mui/material'
import apiAuth from 'apis/apiAuth'
import LoadingButton from 'components/LoadingButton'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { getMessageError } from 'utils'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    p: 2,
};

function RequestActive({type}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [email, setEmail] = useState('')
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = e => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        setEmail(e.target.value)
        if (regex.test(e.target.value)) {
            setErr(false)
        }
        else
            setErr(true)
    }
    const handleSubmit = () => {
        if (!err) {
            setLoading(true)
            const res = type==='reset-password'?apiAuth.forgotPassword({ email }):apiAuth.reActive({ email })
          
                res.then(res => {
                    toast.success(res.message)
                })
                .catch(err => {
                    toast.warning(getMessageError(err))
                })
                .finally(() => {
                    setLoading(false)
                    handleClose()
                })
        }
    }
    return (
        <>
            <Typography lineHeight={type==='reset-password'?'42px':'22px'} onClick={handleOpen} sx={{ cursor: 'pointer' }}>
                {type==='reset-password'?'Quên mật khẩu?':'Kích hoạt tài khoản'}
                </Typography>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Paper sx={style} elevation={12}>
                    <Stack p={2} spacing={3} alignItems='center'>
                        <Typography variant='h5' color='primary' align='center'>
                            Nhập địa chỉ email của tài khoản</Typography>
                        <TextField
                            label="Email"
                            value={email}
                            fullWidth
                            onChange={handleChange}
                            error={err}
                            helperText={err ? "Email không hợp lệ" : ""}
                        />
                        <LoadingButton variant='contained' loading={loading} onClick={handleSubmit}>
                        {type==='reset-password'?'Đặt lại mật khẩu':'Gửi Email kích hoạt'}</LoadingButton>
                    </Stack>
                </Paper>
            </Modal>
        </>
    )
}

export default RequestActive