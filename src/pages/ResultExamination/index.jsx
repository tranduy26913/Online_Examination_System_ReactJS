import { Button, Divider, Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { Link, useParams } from "react-router-dom"
import Page from 'components/Page'
import { useState, useEffect } from 'react'
import apiTakeExam from 'apis/apiTakeExam'
import LoadingRoller from 'components/LoadingPage/LoadingRoller'
function ResultExamination() {
    const { takeExamId } = useParams()
    const [result, setResult] = useState({})
    const [courseId, setCourseId] = useState(0)
    const [viewAnswer, setViewAnswer] = useState(0)
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState('')

    useEffect(() => {
        const getResult = () => {
            apiTakeExam.getResultExam({ takeExamId })
                .then(res => {
                    setResult(res)
                    setCourseId(res.courseId)
                    setViewAnswer(res.viewAnswer)
                })
                .catch(err => {
                    setErr('Không tìm thấy kết quả thi!')
                })
                .finally(() => setLoading(false))
        }
        getResult()
    }, [takeExamId])
    return (
        <Page title='Kết quả bài thi'>
            <Stack width='100%' height='100vh' justifyContent={'center'} alignItems='center'>

                <Paper elevation={12} sx={{ width: '100%', maxWidth: '500px' }}>
                    {
                        loading ?
                            <LoadingRoller />
                            :
                            <Stack p={2} spacing={1} minHeight='200px' justifyContent='center'>
                                {
                                    err ?
                                    <>
                                    <Typography variant='h5'  align='center'>{err}</Typography>
                                    <Stack direction='row' pt={2} justifyContent='center' spacing={2}>
                                       
                                        <Link to={`/`}>
                                            <Button variant='contained'>Về trang chủ</Button>
                                        </Link>
                                        <Link to={`/my/list-course`}>
                                            <Button variant='contained'>Khoá học</Button>
                                        </Link>
                                    </Stack>
                                    </>
                                :
                                <>
                                    <Typography variant='h4' color='primary' align='center'>Kết quả bài thi</Typography>
                                    <Divider />
                                    <Typography>Bài thi của bạn đã được hệ thống ghi nhận</Typography>
                                    <Typography>Đề thi: <strong>{result?.name}</strong></Typography>
                                    <Typography>Trạng thái: <strong>{result?.status === 'not submitted' ? 'Chưa nộp' : 'Đã nộp'}</strong></Typography>
                                    <Typography>Điểm: <strong>{result?.points === undefined ? 'Không được phép xem điểm' :
                                        <>{Number(result?.points).toFixed(2)}/{result?.maxPoints}</>}</strong></Typography>
                                    <Typography>Lần thi: <strong>{result?.lanThi}</strong></Typography>
                                    <Stack direction='row' justifyContent='center' spacing={2}>
                                        {
                                            viewAnswer !== 'no' &&
                                            <Link to={`/review-exam/${takeExamId}?returnUrl=/course/${courseId}/statistic-exam/${result?.slug}`}>
                                                <Button variant='contained'>Xem lại bài làm</Button>
                                            </Link>
                                        }
                                        <Link to={`/course/${courseId}/statistic-exam/${result?.slug}`}>
                                            <Button variant='contained'>Xem thống kê</Button>
                                        </Link>
                                    </Stack>
                                </>
                                }
                            </Stack>
                    }

                </Paper>

            </Stack>
        </Page>
    )
}

export default ResultExamination