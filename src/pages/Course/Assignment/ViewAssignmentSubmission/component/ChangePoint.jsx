import * as React from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    Stack,
    Typography,
    Paper
} from '@mui/material';
import PropTypes from 'prop-types'
import EmptyList from 'components/UI/EmptyList';
import { toast } from 'react-toastify';
import { getMessageError } from 'utils';
import LoadingButton from 'components/LoadingButton';
import apiSubmitAssignment from 'apis/apiSubmitassignment';
import DOMPurify from 'dompurify';
import AttachFileIcon from '@mui/icons-material/AttachFile';

function ChangePoint({ submitAssignmentId, maxPoints, reloadList }) {
    const [open, setOpen] = React.useState(false);
    const [points, setPoints] = React.useState(0);
    const [content, setContent] = React.useState('')
    const [file, setFile] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const onChangePoints = (e) => {
        setPoints(e.target.value)
    }

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    }
    React.useEffect(() => {
        apiSubmitAssignment.getSubmitAssignmentById({ id: submitAssignmentId })
            .then(res => {
                const { submitAssignment } = res;
                if (submitAssignment) {
                    let { content, points, file } = submitAssignment
                    setContent(content)
                    setPoints(points || 0)
                    setFile(file)
                }
            })
    }, [submitAssignmentId])

    const handleChangePoints = () => {

        if (points.toString().trim() === '') {
            toast.warning("Vui lòng nhập điểm")
            return
        }
        if (Number.isNaN(Number(points))) {
            toast.warning("Vui lòng nhập điểm là số hợp lệ")
            return
        }
        if (points < 0 || points > maxPoints) {
            toast.warning(`Vui lòng nhập điểm là số dương và không quá ${maxPoints} điểm`)
            return
        }
        setLoading(true)
        apiSubmitAssignment.ChangePointSubmitAssignment({
            submitAssignmentId,
            points
        })
            .then(res => {
                toast.success("Chấm điểm thành công")
                reloadList()
                setOpen(false)
            })
            .catch(err => {
                toast.warning(getMessageError(err))
            })
            .finally(() => setLoading(false))

    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Chấm điểm
            </Button>
            <Dialog
                scroll={'body'}
                open={open} onClose={handleClose} maxWidth='lg' fullWidth>
                <DialogTitle align='center' color='primary'>Nội dung bài nộp</DialogTitle>
                <DialogContent dividers={true}>
                    <Stack direction='row' alignItems='flex-end' mb={2}>
                        <TextField
                            align='center'
                            sx={{ width: '90px' }}
                            type="text"
                            label='Nhập điểm'
                            variant="standard"
                            onChange={onChangePoints}
                            value={points}
                        />&nbsp;
                        {` / ${maxPoints} Điểm`}
                    </Stack>
                    <Paper elevation={3} square>

                        <Box width='100%' p={1.5} height='400px' >
                            {!content ? <EmptyList text='Nội dung trống' /> :

                                <Typography
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />

                            }
                        </Box>
                    </Paper>

                    <a href={`https://be-oes.vercel.app/api/upload/download-deta?filename=${file}`} target="_blank" rel="noopener noreferrer">
                        <AttachFileIcon sx={{ 'transform': 'translateY(6px)' }} />
                        {file.split('__').pop()}</a>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='error' onClick={handleClose}>Huỷ</Button>
                    <LoadingButton loading={loading}
                        variant='contained' onClick={handleChangePoints}>
                        Chấm điểm</LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}


ChangePoint.propTypes = {
    reloadList: PropTypes.func.isRequired
};
export default ChangePoint