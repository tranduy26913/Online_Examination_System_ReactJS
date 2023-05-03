import { Button, Card, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AssignmentIcon from '@mui/icons-material/Assignment'
import apiCourse from 'apis/apiCourse';
import { toast } from 'react-toastify';
import ConfirmButton from 'components/ConfirmDialog';
import { getMessageError, numWithCommas } from 'utils';
import { useMutation } from 'react-query';
import moment from 'moment';
import LoadingRoller from 'components/LoadingPage/LoadingRoller';
function CourseItem({ course }) {

    const [isShowInfo, setIsShowInfo] = React.useState(false);
    const navigate = useNavigate()
    const courseId = course.courseId
    const handleClickOpen = () => {
        setIsShowInfo(true);
        mutate({ course_id: courseId })
    };

    const handleClose = () => {
        setIsShowInfo(false);
    };

    const { mutate, data: courseInfo, isLoading, error } = useMutation(['info-course', courseId],
        (params) => apiCourse.getCourseInfo(params))
console.log(courseInfo)
    const handlePurchase = () => {
       
        apiCourse.purchaseCourse({ courseId: course?.courseId })
            .then(res => {
                toast.success('Thanh toán thành công')
                navigate(`/course/${course?.courseId}`)
            })
            .catch(err => {
                toast.success(getMessageError(err))
            })
    }


    return (
        <>
            <Card className='hover-element' sx={{ border: "1px solid #00e67660" }}>
                <CardMedia
                    component="img"
                    height="170"
                    width="180"
                    image={course.image || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}
                    onError={e => {
                        e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
                    }}
                    alt="image course"
                />
                <Link to={`/course/${course.courseId}`}>
                    <Typography color="primary" variant="h5" component="div"
                        sx={{
                            textAlign: "center",
                        }}>
                        {course.name}
                    </Typography>
                </Link>
                <Typography color="primary" variant="h5" component="div"
                    sx={{
                        textAlign: "left",
                        paddingLeft: '6px'
                    }}>
                    Giá: {numWithCommas(course?.price || 0)} đ
                </Typography>

                <Stack
                    p='0.5rem'
                    direction='row'
                    justifyContent="center"
                    sx={{ flexWrap: 'wrap' }}
                    gap={1.5}>

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleClickOpen}
                        endIcon={<AssignmentIcon />}
                    >Chi tiết</Button>
                    <ConfirmButton
                        variant="outlined"
                        size="small"
                        title="Xác nhận mua khoá học"
                        description='Vui lòng xác nhận mua khoá học bằng số dư hiện có của tài khoản'
                        textConfirm='Mua khoá học'
                        handleFunc={handlePurchase}
                        endIcon={<AssignmentIcon />}
                    >Mua</ConfirmButton>
                </Stack>
            </Card>
            {
                isShowInfo &&
                <Dialog open={isShowInfo} onClose={handleClose}>
                    <DialogTitle>Thông tin khoá học</DialogTitle>
                    <DialogContent>
                        {isLoading ? <LoadingRoller /> :
                            <Stack>
                                <Typography>Mô tả: {courseInfo?.[0].description}</Typography>
                                <Typography>Thời gian bắt đầu: {moment(courseInfo?.[0].startTime).format('DD-MM-YYYY')}</Typography>
                                <Typography>Thời gian kết thúc: {moment(courseInfo?.[0].endTime).format('DD-MM-YYYY')}</Typography>
                                <Typography>Số bài kiểm tra: {courseInfo?.[0].numberOfExams}</Typography>
                                <Typography>Số bài tập: {courseInfo?.[0].numberOfAssignments}</Typography>
                                <Typography>Số bài giảng: {courseInfo?.[0].numberOfLessons}</Typography>
                                <Typography>Số học viên: {courseInfo?.[0].numberOfStudents}</Typography>
                            </Stack>
                        }

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Đóng</Button>
                    </DialogActions>
                </Dialog>
            }
        </>
    )
}

export default CourseItem