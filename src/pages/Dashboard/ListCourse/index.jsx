import { useState, useEffect } from 'react'
import {
    Box,
    Card,
    Button,
    CardMedia,
    Stack,
    Typography,
    Paper,
    Divider
} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SendIcon from '@mui/icons-material/Send';
import Page from 'components/Page'
import apiCourse from 'apis/apiCourse';
import { Link } from 'react-router-dom';
const ListCourse = () => {
    const [courses, setCourses] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(5)
    const limit = 10

    useEffect(() => {
        const getData = () => {
            const params = {
                page,
                limit
            }
            apiCourse.getCourses(params)
                .then(res => {
                    setCourses(res)
                    setTotalPage(Math.round(res.pagination.totalRows / limit))
                })
        }
        getData()
    }, [])

    return (
        <Page title='Danh sách khoá học'>

            <Box>
                <Paper elevation={24}>
                    <Stack direction='row' justifyContent={'flex-end'} p={1.5}>
                        <Link to='/teacher/create-course'>
                        <Button variant='outlined'>Tạo khoá học</Button>
                        </Link>
                    </Stack>
                    <Divider></Divider>
                    <Grid container spacing={2} p={1.5}>
                        {
                            courses.map(item =>
                                <Grid key={item.id} lg={3} md={3} xs={6}>
                                    <Card sx={{ maxWidth: 345, border: "1px solid #00e67660" }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="https://sandla.org/wp-content/uploads/2021/08/english-e1629469809834.jpg"
                                            alt="green iguana"
                                        />
                                        <Typography color="primary" variant="h5" component="div"
                                            sx={{
                                                textAlign: "center"
                                            }}>
                                            {item.name}
                                        </Typography>
                                        <Stack
                                            p='0.5rem 1rem'
                                            direction='row'
                                            justifyContent="center"
                                            spacing={2}>
                                            <Link to={`list-exam?courseId=${item.id}`}>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    endIcon={<AssignmentIcon />}
                                                >Chi tiết</Button>
                                            </Link>
                                            <Button variant="outlined" size="small"
                                                endIcon={<SendIcon />}>Chia sẻ</Button>
                                        </Stack>
                                    </Card>
                                </Grid>)
                        }
                    </Grid>
                </Paper>
            </Box>
        </Page>
    )
}

export default ListCourse