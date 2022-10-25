import * as React from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    ListItemAvatar,
    DialogTitle,
    Box,
    List,
    ListItemButton,
    ListItemText,
    Avatar,
    styled,
    darken,
    alpha
} from '@mui/material';
import PropTypes from 'prop-types'
import { debounce } from 'lodash';
import apiCourse from 'apis/apiCourse';
import EmptyList from 'components/UI/EmptyList';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { getMessageError } from 'utils';
import LoadingButton from 'components/LoadingButton';
const ListItemButtonCustom = styled(ListItemButton)(({ theme }) => ({
    borderRadius: 12,
    '&.Mui-selected': {
        backgroundColor: darken(theme.palette.primary.light, 0.08),
        color:'#333',
        '&:hover': {
            backgroundColor: darken(theme.palette.primary.light, 0.1)
        }
    }, '&:hover': {
        backgroundColor: alpha(theme.palette.primary.light, 0.2)
    }
}))

  
function AddStudent(props) {
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState('');
    const [search, setSearch] = React.useState('')
    const [students, setStudents] = React.useState([])
    const [loading,setLoading] = React.useState(false)
    const { id} = useContext(CourseContext)

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
        getListStudent(e.target.value,id)
    }

    const getListStudent = React.useCallback(debounce((search,courseId) => {
        apiCourse.getListStudentToAdd({ search,courseId })
            .then(res => setStudents(res))
    }, 800), [])

    const handleListItemClick = (event, index) => setSelectedId(index);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setSearch("");
        setStudents([])
        setSelectedId('')
        setOpen(false);
    }

    const handleAddStudent = () => {
        if(!selectedId){
            toast.warning("Vui lòng chọn học viên cần thêm")
            return
        }
        setLoading(true)
        apiCourse.addStudentIntoCourse({
            studentId:selectedId,
            courseId:id
        })
        .then(res=>{
            toast.success("Thêm học viên thành công")
            setStudents(students.filter(item=>item.id !== selectedId))
            getListStudent(search,id)
            setSelectedId("")
            props.reloadList()
        })
        .catch(err=>{
            toast.warning(getMessageError(err))
        })
        .finally(()=>setLoading(false))
        
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Thêm học viên
            </Button>
            <Dialog
                scroll={'body'}
                open={open} onClose={handleClose} maxWidth='sm' fullWidth>
                <DialogTitle align='center' color='primary'>Thêm học viên</DialogTitle>
                <DialogContent dividers={true}>

                    <TextField
                        autoFocus
                        type="text"
                        fullWidth
                        placeholder='Nhập họ tên hoặc email'
                        variant="standard"
                        focused
                        onChange={handleChangeSearch}
                        value={search}
                    />
                    <Box width='100%' height='200px' >
                        {students.length === 0 ? <EmptyList /> :
                            <List component="nav"
                                sx={{
                                    width: '100%',
                                    position: 'relative',
                                    overflow: 'auto',
                                    height: '100%',
                                }}
                            >
                                {
                                    students.map(item =>
                                        <ListItemButtonCustom
                                        key={item.id}
                                            selected={selectedId=== item.id}
                                            onClick={(event) => handleListItemClick(event, item.id)}
                                        >
                                            <ListItemAvatar>
                                                <Avatar alt={item.fullname} src={item.avatar} />
                                            </ListItemAvatar>
                                            <ListItemText primary={item.fullname} secondary={item.email} />
                                        </ListItemButtonCustom>)
                                }

                            </List>
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='error' onClick={handleClose}>Huỷ</Button>
                    <LoadingButton disabled={!selectedId} loading={loading} variant='contained' onClick={handleAddStudent}>Thêm vào lớp</LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}


AddStudent.propTypes = {
    reloadList:PropTypes.func.isRequired
  };
export default AddStudent