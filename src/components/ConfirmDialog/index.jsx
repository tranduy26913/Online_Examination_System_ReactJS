import { Dialog, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material'
import { forwardRef, useState } from 'react'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function ConfirmDialog({ handleFunction, title, description, children }) {
    const [dialog, setDialog] = useState(false)
    const handleOpen = () => setDialog(true)
    const handleClose = () => setDialog(false)
    const handleOnclick = ()=>{
        if(handleFunction){
            handleFunction()
        }
    }
    return (
        <>
            <Dialog
                open={dialog}
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
                    <Button onClick={handleOnclick}>Xác nhận</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ConfirmDialog