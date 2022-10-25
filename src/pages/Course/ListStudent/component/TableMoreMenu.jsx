import { useRef, useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Menu, MenuItem, IconButton, ListItemIcon, ListItemText,
  Slide,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BarChartIcon from '@mui/icons-material/BarChart';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext';
import apiCourse from 'apis/apiCourse';
import { toast } from 'react-toastify';
import { getMessageError } from 'utils';
import { forwardRef } from 'react';
import PropTypes from 'prop-types'

// ----------------------------------------------------------------------
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
UserMoreMenu.propTypes = {
  studentId:PropTypes.string.isRequired,
  reloadList:PropTypes.func.isRequired
}
export default function UserMoreMenu({ studentId,reloadList }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dialog, setDialog] = useState(false)
  const { id } = useContext(CourseContext)//lấy id khoá học

  const handleDeleteStudent = () => {
    setDialog(false)
    apiCourse.deleteStudentInCourse({
      studentId,
      courseId: id
    })
      .then(res => {
        toast.success('Xoá học viên thành công')
        setIsOpen(false)
        reloadList()
      })
      .catch(err =>{
        toast.warning(getMessageError(err))
      })
  }

  const handleClose = ()=> {
    setDialog(false)
    setIsOpen(false)
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <MoreVertIcon width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >

        <MenuItem sx={{ color: 'text.secondary' }} >
          <ListItemIcon>
            <BarChartIcon width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary={'Thống kê'} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem  sx={{ color: 'text.secondary' }} onClick={()=>setDialog(true)}>
          <ListItemIcon>
            <DeleteForeverIcon width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary={'Xoá'} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <Dialog
          open={dialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Xoá học viên khỏi khoá học?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Tất cả thông tin của học viên trong khoá học sẽ bị xoá. Bạn có chắn chắn xoá học viên này khỏi khoá học không?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Huỷ</Button>
            <Button onClick={handleDeleteStudent}>Xoá</Button>
          </DialogActions>
        </Dialog>




        {/* <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <EditIcon width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Sửa" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <DeleteForeverIcon width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Xoá" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}
      </Menu>
    </>
  );
}

