import { useRef, useState, useContext } from 'react';
// material
import {
  IconButton,
  Slide,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Tooltip
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BarChartIcon from '@mui/icons-material/BarChart';
import EditIcon from '@mui/icons-material/Edit';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext';
import apiCourse from 'apis/apiCourse';
import { toast } from 'react-toastify';
import { getMessageError } from 'utils';
import { forwardRef } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
TableMoreMenu.propTypes = {
  studentId: PropTypes.string.isRequired,
  reloadList: PropTypes.func.isRequired
}
export default function TableMoreMenu({ slug, reloadList }) {
  const [dialog, setDialog] = useState(false)
  const { courseId,id } = useContext(CourseContext)//lấy id khoá học

  const handleDeleteStudent = () => {
    setDialog(false)
    apiCourse.deleteStudentInCourse({
      slug,
      courseId: id
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
        <Tooltip title="Thống kê">
          <Link to={`/course/${courseId}/statistic-exam/${slug}`}>
            <IconButton>
              <BarChartIcon color='primary' width={24} height={24} />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Sửa">
          <Link to={`/course/${courseId}/detail-exam/${slug}`}>
            <IconButton>
              <EditIcon color='warning' width={24} height={24} />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Xoá">
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
          <Button onClick={handleDeleteStudent}>Xoá</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

