import { useRef, useState, useContext } from 'react';
// material
import {
  Menu, MenuItem, IconButton, ListItemIcon, ListItemText,
  Slide,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  Stack
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BarChartIcon from '@mui/icons-material/BarChart';
import EditIcon from '@mui/icons-material/Edit';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext';
import { toast } from 'react-toastify';
import { getMessageError } from 'utils';
import { forwardRef } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import apiAssignment from 'apis/apiAssignment';

// ----------------------------------------------------------------------
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
UserMoreMenu.propTypes = {
  studentId: PropTypes.string.isRequired,
  reloadList: PropTypes.func.isRequired
}
export default function UserMoreMenu({ assignmentSlug, reloadList }) {
  const [dialog, setDialog] = useState(false)
  const { courseId, id: courseObjId } = useContext(CourseContext)//lấy id khoá học

  const handleDeleteAssignment = () => {
    setDialog(false)
    apiAssignment.deleteStudentInCourse({
      assignmentSlug,
      courseId: courseObjId
    })
      .then(res => {
        toast.success('Xoá học viên thành công')
        reloadList()
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

      <Stack direction='row' justifyContent='flex-end' spacing={0.5}>

        <Tooltip title="Xem bài nộp">
          <Link to={`/course/${courseId}/assignment-submission/${assignmentSlug}`}>
            <IconButton>
              <BarChartIcon color='primary' width={24} height={24} />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Sửa bài tập">
          <Link to={`/course/${courseId}/assignment/${assignmentSlug}`}>
            <IconButton>
              <EditIcon color='warning' width={24} height={24} />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Xoá bài tập">
          <IconButton onClick={() => setDialog(true)}>
            <DeleteForeverIcon color='error' width={24} height={24} />
          </IconButton>
        </Tooltip>
      </Stack>
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
          <Button onClick={handleDeleteAssignment}>Xoá</Button>
        </DialogActions>
      </Dialog>


    </>
  );
}

