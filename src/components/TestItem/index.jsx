import { useContext } from 'react'
import {
    Button,
    Stack,
    Typography,
    Divider,
    lighten,
    alpha
} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import SendIcon from '@mui/icons-material/Send';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import moment from 'moment'
import { Link } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext'
import ShareTray from 'components/ShareTray';
import QuizIcon from '@mui/icons-material/Quiz';
const StackContainer = styled(Stack)(({ theme }) => ({
    borderRadius: '8px',
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: alpha(theme.palette.primary.light, 0.2),
}))

const TestItem = (props) => {
    const theme = useTheme()
    const { data } = props
    const { courseId } = useContext(CourseContext)

    const isInTime = moment(data.endTime).diff(new Date(), 'seconds') > 0

    return (
        <StackContainer spacing={1} direction='row' justifyContent={'space-between'} p={1.5}>
            <Stack flex={1}>
                <Stack direction='row' alignItems='center' spacing={1} pb={1}>
                    <QuizIcon color='primary'/>
                    <Typography fontSize="16px" >{data.name}</Typography>

                </Stack>
                <Divider sx={{ backgroundColor: theme.palette.primary.light }} />
                <Grid container mt={1}>
                    <Grid xs={12} md={6} lg={3}>
                        <Stack alignItems='center' spacing={1}>
                            <Typography fontSize="15px" fontWeight="600">Thời gian bắt đầu:</Typography>
                            <Typography fontSize="14px">{data?.startTime && moment(data.startTime).format('DD-MM-YYYY HH:mm A')}</Typography>
                        </Stack>
                    </Grid>
                    <Grid xs={12} md={6} lg={3}>
                        <Stack alignItems='center' spacing={1}>
                            <Typography fontSize="15px" fontWeight="600">Thời gian kết thúc:</Typography>
                            <Typography fontSize="14px">{data?.endTime && moment(data.endTime).format('DD-MM-YYYY HH:mm A')}</Typography>
                        </Stack>
                    </Grid>
                    <Grid xs={12} md={6} lg={3}>
                        <Stack alignItems='center' spacing={1}>
                            <Typography fontSize="15px" fontWeight="600">Thời lượng làm bài:</Typography>
                            <Typography fontSize="14px">{data?.maxTimes || 0} phút</Typography>
                        </Stack>
                    </Grid>
                    {/* <Grid xs={12} md={6} lg={3}>
                        <Stack alignItems='center' spacing={1}>
                            <Typography fontSize="15px" fontWeight="600">Số câu hỏi:</Typography>
                            <Typography fontSize="14px">{data?.numberofQuestions || 0}</Typography>
                        </Stack>
                    </Grid> */}
                    <Grid xs={12} md={6} lg={3}>
                        <Stack alignItems='center' spacing={1}>
                            <Typography fontSize="15px" fontWeight="600">Đã làm:</Typography>
                            <Typography fontSize="14px">{data?.count || 0} lần</Typography>
                        </Stack>
                    </Grid>

                </Grid>
            </Stack>
            <Stack justifyContent={'center'}>
                {
                    data?.slug !== undefined &&
                    <>

                        <Link to={`/course/${courseId}/statistic-exam/${data.slug}`}>
                            <Button
                                startIcon={<BarChartIcon />}
                            >Thống kê</Button>
                        </Link>
                        <ShareTray url={`https://oes.vercep.app/exam/${data.slug}`}
                            title="Làm bài thi"
                            quote={"Làm bài thi"}
                            startIcon={<SendIcon />}
                            text='Chia sẻ' />
                        {
                            isInTime && <Link to={`/exam/${data.slug}`}>
                                <Button
                                    startIcon={<AssignmentIcon />}
                                >Làm bài</Button>
                            </Link>
                        }
                    </>
                }

            </Stack>


        </StackContainer>
    )
}

export default TestItem