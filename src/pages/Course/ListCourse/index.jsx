import { useState, useEffect } from 'react'
import {
    Box,
    Card,
    Button,
    CardMedia,
    Stack,
    Typography,
    Paper,
    Divider,
    Tabs,
    Tab,
} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SendIcon from '@mui/icons-material/Send';
import Page from 'components/Page'
import apiCourse from 'apis/apiCourse';
import EmptyList from 'components/UI/EmptyList'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROLES } from 'constraints/Variables';
import LoadingRoller from 'components/LoadingPage/LoadingRoller';
import ShareTray from 'components/ShareTray';
import LinearProgressWithLabel from 'components/LinearProgressWithLabel';
import moment from 'moment';
import { TabPanel, a11yProps } from 'components/TabPanel';

const ListCourse = () => {
    const role = useSelector(state => state.setting?.role)
    const [courses, setCourses] = useState([])
    const [tabIndex, setTabIndex] = useState(0);
    const page = 1
    const [coursesOld, setCoursesOld] = useState([])
    const [coursesCurrent, setCoursesCurrent] = useState([])
    const [loadingData, setLoadingData] = useState(false)
    const limit = 10

    useEffect(() => {
        const getData = () => {
            const params = {
                page,
                limit
            }
            let request = apiCourse.getListCourseByStudent(params)
            if (role === 'teacher')
                request = apiCourse.getListCourseByTeacher(params)
            setLoadingData(true)
            request.then(res => {
                setCourses(res)
                let arrCoursesOld = []
                let arrCoursesCurrent = []
                res.forEach(item => {
                    if (moment(item.endTime).isAfter(moment())) {
                        arrCoursesCurrent.push(item)
                    }
                    else {
                        arrCoursesOld.push(item)
                    }
                })
                setCoursesOld(arrCoursesOld)
                setCoursesCurrent(arrCoursesCurrent)
                //setTotalPage(Math.round(res.pagination.totalRows / limit))
            })
                .finally(() => setLoadingData(false))
        }
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role])

    return (
        <Page title='Danh sách khoá học'>

            <Paper elevation={24}>
                <Box>

                    <Stack direction='row' justifyContent={'flex-end'} p={1.5}>
                        {
                            role === ROLES.TEACHER && <Link to='/my/list-course/create-course'>
                                <Button variant='outlined'>Tạo khoá học</Button>
                            </Link>
                        }
                    </Stack>
                    <Divider></Divider>
                    {
                        loadingData ? <LoadingRoller /> :
                            courses?.length === 0 ? <EmptyList />

                                :
                                <Box>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={tabIndex} onChange={(event, index) => setTabIndex(index)} >
                                            <Tab label="Khoá học hiện tại" {...a11yProps(0)} />
                                            <Tab label="Đã kết thúc" {...a11yProps(1)} />
                                        </Tabs>
                                    </Box>
                                    <TabPanel value={tabIndex} index={0}>
                                        <Grid container spacing={2} p={1.5}>
                                            {
                                                coursesCurrent.map(item =>
                                                    <Grid key={item._id} xs={12} sm={6} md={6} lg={3} >
                                                        <CourseItem course={item} />
                                                    </Grid>)
                                            }
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={tabIndex} index={1}>
                                        <Grid container spacing={2} p={1.5}>
                                            {
                                                coursesOld.map(item =>
                                                    <Grid key={item._id} xs={12} sm={6} md={6} lg={3} >
                                                        <CourseItem course={item} />
                                                    </Grid>)
                                            }
                                        </Grid>
                                    </TabPanel>
                                </Box>
                    }
                </Box>

            </Paper >
        </Page >
    )
}

const CourseItem = ({ course }) => {
    const role = useSelector(state => state.setting?.role)
    return (
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
                    className="text-overflow-1-lines "
                    sx={{
                        textAlign: "center",
                    }}>
                    {course.name}
                </Typography>
            </Link>
            <Stack
                p='0.5rem'
                direction='row'
                justifyContent="center"
                sx={{ flexWrap: 'wrap' }}
                gap={1.5}>
                <Link to={`/course/${course.courseId}`}>
                    <Button
                        variant="outlined"
                        size="small"
                        endIcon={<AssignmentIcon />}
                    >Chi tiết</Button>
                </Link>
                <ShareTray quote={course.name} title={course.name}
                    url={`https://oes.vercel.app/enroll-course/${course.courseId}`}
                    text='Chia sẻ' variant="outlined" size="small"
                    endIcon={<SendIcon />} />


            </Stack>
            {
                role === 'student' &&
                <Box px={1}>
                    <LinearProgressWithLabel value={Math.floor(course.avg * 100)} />
                </Box>
            }

        </Card>
    )
}
export default ListCourse