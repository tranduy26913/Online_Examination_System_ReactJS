import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Slide,DialogActions } from '@mui/material'
import { forwardRef, useState } from 'react'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function ConfirmButton({ handleFunc, title, description,textConfirm='Xoá', children, ...buttonProps }) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleOnclick = () => {
        if (handleFunc) {
            handleFunc()
        }
        handleClose()
    }
    return (
        <>
            <Button {...buttonProps} onClick={handleOpen}>
                {children}
            </Button>
            {open && <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Huỷ</Button>
                    <Button onClick={handleOnclick}>{textConfirm}</Button>
                </DialogActions>
            </Dialog>}
        </>
    )
}

export default ConfirmButton