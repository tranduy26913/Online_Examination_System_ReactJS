import { Box,Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Slide, Tooltip } from '@mui/material'
import apiCourse from 'apis/apiCourse';
import React, { forwardRef, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';
import { getMessageError } from 'utils';
import { useSelector } from 'react-redux';
import CourseContext from './CourseContext';
// ----------------------------------------------------------------------
const Transition = forwardRef(function transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ExitCourse() {
    const [dialog, setDialog] = useState(false)
    const { courseId } = useContext(CourseContext)//lấy id khoá học
    const navigate = useNavigate()
    const role = useSelector(state => state.setting?.role)

    const handleExitCourse = () => {
        setDialog(false)
        apiCourse.exitCourse({
            courseId
        })
            .then(res => {
                toast.success('Rời khỏi khoá học thành công thành công')
                navigate('/my/list-course')
            })
            .catch(err => {
                toast.warning(getMessageError(err))
            })
    }

    const handleClose = () => {
        setDialog(false)
    }

    return (
        <>
            <Box>

                {role === 'student' &&
                <Tooltip title='Rời khỏi khoá học'>
                    <IconButton onClick={() => setDialog(true)}>
                        <LogoutIcon color='error' />
                    </IconButton>
                </Tooltip>
                    
                }
                <Dialog
                    open={dialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Thoát khỏi khoá học?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Khi thoát khỏi khoá học, bạn sẽ không thể truy cập và sử dụng lại tài nguyên của khoá học. Bạn có chắn chắn muốn thoát khỏi khoá học?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Huỷ</Button>
                        <Button onClick={handleExitCourse}>Rời khoá học</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    )
}

export default ExitCourse