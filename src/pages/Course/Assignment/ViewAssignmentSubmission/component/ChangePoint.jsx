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
import apiCourse from 'apis/apiCourse';
import EmptyList from 'components/UI/EmptyList';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { getMessageError } from 'utils';
import LoadingButton from 'components/LoadingButton';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext';


function ChangePoint(props) {
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState('');
    const [search, setSearch] = React.useState('')
    const [submission, setSubmission] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const { id } = useContext(CourseContext)

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setSearch("");
        setSelectedId('')
        setOpen(false);
    }

    const handleChangePoint = () => {
        if (!selectedId) {
            toast.warning("Vui lòng chọn học viên cần thêm")
            return
        }
        setLoading(true)
        apiCourse.ChangePointIntoCourse({
            studentId: selectedId,
            courseId: id
        })
            .then(res => {
                toast.success("Thêm học viên thành công")
               
                setSelectedId("")
                props.reloadList()
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
                    <Typography></Typography>

                    <Stack direction='row' alignItems='center' mb={2}>
                        <TextField
                            autoFocus
                            type="text"
                            placeholder='Nhập điểm'
                            variant="standard"
                            focused
                            onChange={handleChangeSearch}
                            value={search}
                        />
                        /{submission?.maxPoints}
                    </Stack>
                    <Paper variant="outlined" square>

                    <Box width='100%' height='400px' >
                        {!submission?.content ? <EmptyList text='Nội dung trống'/> :
                            <Box>

                            </Box>
                        }
                    </Box>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='error' onClick={handleClose}>Huỷ</Button>
                    <LoadingButton disabled={!selectedId} loading={loading} variant='contained' onClick={handleChangePoint}>Chấm điểm</LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}


ChangePoint.propTypes = {
    reloadList: PropTypes.func.isRequired
};
export default ChangePoint