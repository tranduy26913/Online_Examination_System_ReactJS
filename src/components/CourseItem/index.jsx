import { Box, Button, Card, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'
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
import SendIcon from '@mui/icons-material/Send'
import ShareTray from 'components/ShareTray';
import { useSelector } from 'react-redux';
import { defaultImg } from 'constraints/Variables';
function CourseItem({ course }) {

    const [isShowInfo, setIsShowInfo] = React.useState(false);
    const navigate = useNavigate()
    const courseId = course.courseId
    const refreshToken = useSelector(state => state.auth?.refreshToken)
    const handleClickOpen = () => {
        setIsShowInfo(true);
        mutate({ course_id: courseId })
    };

    const handleClose = () => {
        setIsShowInfo(false);
    };

    const { mutate, data: courseInfo, isLoading } = useMutation(['info-course', courseId],
        (params) => apiCourse.getCourseInfo(params))
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

    const onClickDetail = (courseId) => {
        if (refreshToken)
            navigate(`/course/${courseId}`)
        else
            toast.info('Vui lòng đăng nhập để truy cập vào khoá học')
    }


    return (
        <>
            <Card className='hover-element' sx={{ border: "1px solid #00e67660" }}>
                <CardMedia
                    component="img"
                    height="170"
                    width="180"
                    image={course.image || defaultImg}
                    onError={e => {
                        e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
                    }}
                    alt="image course"
                />
                <Box height="55px" px={1}>
                    <Link to={`/course/${course.courseId}`}>
                        <Typography color="primary" component="div"
                            className="text-overflow-2-lines "
                            sx={{
                                textAlign: "center",
                                fontSize: '22px',
                                lineHeight: '1.25'
                            }}>
                            {course.name}
                        </Typography>
                    </Link>
                </Box>
                {
                    course?.isSell && !course?.isInCourse ?

                        <>
                            <Typography color="primary" component="div" fontSize='18px'
                                sx={{
                                    textAlign: "left",
                                    paddingLeft: '18px',
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
                        </>
                        :
                        <>
                            <Typography color="primary" component="div" fontSize='18px'
                                sx={{
                                    textAlign: "left",
                                    paddingLeft: '18px',
                                }}>
                                Giá: Miễn phí
                            </Typography>

                            <Stack
                                p='0.5rem'
                                direction='row'
                                justifyContent="center"
                                sx={{ flexWrap: 'wrap' }}
                                gap={1.5}>
                                {/* <Link to={`/course/${course.courseId}`}> */}
                                <Button
                                    onClick={() => onClickDetail(course.courseId)}
                                    variant="outlined"
                                    size="small"
                                    endIcon={<AssignmentIcon />}
                                >Chi tiết</Button>
                                {/* </Link> */}
                                <ShareTray quote={course.name} title={course.name}
                                    url={`https://oes.vercel.app/enroll-course/${course.courseId}`}
                                    text='Chia sẻ' variant="outlined" size="small"
                                    endIcon={<SendIcon />} />
                            </Stack>
                        </>

                }

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