import * as React from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack
} from '@mui/material';
import PropTypes from 'prop-types'
import { toast } from 'react-toastify';
import { getMessageError } from 'utils';
import LoadingButton from 'components/LoadingButton';
import apiQuestionBank from 'apis/apiQuestionBank';
import { useEffect } from 'react';


function CreateQuestionBank(props) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const {slug, edit, reloadList, ...buttonProps} = props

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        clearData()
    }
    const clearData = () => {
        setName('')
        setDescription('')
        setLoading(false)
    }

    const handleCreateQB = () => {
        if (!name || !description) {
            toast.warning("Vui lòng nhập đầy đủ thông tin")
            return
        }
        setLoading(true)
        apiQuestionBank.createQuestionBank({
            name,
            description
        })
            .then(res => {
                toast.success("Tạo ngân hàng câu hỏi thành công")
                reloadList()
                handleClose()
            })
            .catch(err => {
                toast.warning(getMessageError(err))
            })
            .finally(() => setLoading(false))

    }
    const handleEditQB = () => {
        if (!name || !description) {
            toast.warning("Vui lòng nhập đầy đủ thông tin")
            return
        }
        setLoading(true)
        apiQuestionBank.editQuestionBank({
            name,
            description,
            slug
        })
            .then(res => {
                toast.success("Sửa ngân hàng câu hỏi thành công")
                reloadList()
                handleClose()
            })
            .catch(err => {
                toast.warning(getMessageError(err))
            })
            .finally(() => setLoading(false))

    }

    useEffect(() => {
        if (edit) {
            apiQuestionBank.getQuestionBankBySlug({ slug })
                .then(res => {
                    setName(res.name)
                    setDescription(res.description)
                })
        }
    }, [edit,slug])

    return (
        <div>
            <Button {...buttonProps} onClick={handleClickOpen}>
                {edit?'Sửa':'Tạo ngân hàng câu hỏi'}
            </Button>
            <Dialog
                scroll={'body'}
                open={open} onClose={handleClose} maxWidth='sm' fullWidth>
                <DialogTitle align='center' color='primary'>
                    {edit ? 'Sửa ngân hàng câu hỏi' : 'Tạo ngân hàng câu hỏi'}</DialogTitle>
                <DialogContent dividers={true}>
                    <Stack spacing={2}>

                        <TextField
                            autoFocus
                            type="text"
                            fullWidth
                            label='Tên ngân hàng câu hỏi'
                            variant="standard"
                            onChange={e => setName(e.target.value)}
                            value={name}
                        />
                        <TextField
                            type="text"
                            fullWidth
                            label='Mô tả'
                            multiline
                            rows={4}
                            variant="standard"
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                        />
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='error' onClick={handleClose}>Huỷ</Button>
                    <LoadingButton loading={loading} variant='contained'
                        onClick={edit ? handleEditQB : handleCreateQB}>
                        {edit ? 'Cập nhật' : 'Tạo mới'}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}


CreateQuestionBank.propTypes = {
    reloadList: PropTypes.func.isRequired
};
export default CreateQuestionBank