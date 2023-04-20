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

const ListCourse = () => {
    const role = useSelector(state => state.setting?.role)
    const [courses, setCourses] = useState([])
    //const [page, setPage] = useState(1)
    const page = 1
   // const [totalPage, setTotalPage] = useState(5)
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
                            courses?.length === 0 && <EmptyList />}
                    <Grid container spacing={2} p={1.5}>
                        {
                            courses.map(item =>
                                <Grid key={item.id} xs={12} sm={6} md={6} lg={3} >
                                    <Card className='hover-element' sx={{ border: "1px solid #00e67660" }}>
                                        <CardMedia
                                            component="img"
                                            height="170"
                                            width="180"
                                            image={item.image || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}
                                            onError={e => {
                                                e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
                                            }}
                                            alt="image course"
                                        />
                                        <Link to={`/course/${item.courseId}`}>
                                            <Typography color="primary" variant="h5" component="div"
                                                sx={{
                                                    textAlign: "center",
                                                }}>
                                                {item.name}
                                            </Typography>
                                        </Link>
                                        <Stack
                                            p='0.5rem'
                                            direction='row'
                                            justifyContent="center"
                                            sx={{ flexWrap: 'wrap' }}
                                            gap={1.5}>
                                            <Link to={`/course/${item.courseId}`}>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    endIcon={<AssignmentIcon />}
                                                >Chi tiết</Button>
                                            </Link>
                                            <ShareTray quote={item.name} title={item.name}
                                                url={`https://oes.vercel.app/enroll-course/${item.courseId}`}
                                                text='Chia sẻ' variant="outlined" size="small"
                                                endIcon={<SendIcon />} />


                                        </Stack>
                                        {
                                            role === 'student' &&
                                            <Box px={1}>
                                                <LinearProgressWithLabel value={Math.floor(item.avg*100)} />
                                            </Box>
                                        }

                                    </Card>
                                </Grid>)
                        }
                    </Grid>
                </Box>
            </Paper>
        </Page>
    )
}

export default ListCourse