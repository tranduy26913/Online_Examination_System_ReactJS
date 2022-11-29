import { Button, Divider, Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { Link, useParams } from "react-router-dom"
import Page from 'components/Page'
import { useState, useEffect } from 'react'
import apiTakeExam from 'apis/apiTakeExam'
function ResultExamination() {
    const { takeExamId } = useParams()
    const [result, setResult] = useState({})

    useEffect(() => {
        const getResult = () => {
            apiTakeExam.getResultExam({ takeExamId })
                .then(res => {
                    setResult(res)
                })
        }
        getResult()
    }, [takeExamId])
    return (
        <Page title='Kết quả bài thi'>
            <Stack width='100%' height='100vh' justifyContent={'center'} alignItems='center'>

                <Paper elevation={12} sx={{ width: '100%', maxWidth: '500px' }}>
                    <Stack p={2} spacing={1}>
                        <Typography variant='h4' color='primary' align='center'>Kết quả bài thi</Typography>
                        <Divider />
                        <Typography>Bài thi của bạn đã được hệ thống ghi nhận</Typography>
                        <Typography>Đề thi: <strong>{result?.name}</strong></Typography>
                        <Typography>Trạng thái: <strong>{result?.status === 'not submitted' ? 'Chưa nộp' : 'Đã nộp'}</strong></Typography>
                        <Typography>Điểm: <strong>{result?.points === undefined ? 'Không được phép xem điểm' :
                            <>{result?.points}/{result?.maxPoints}</>}</strong></Typography>
                        <Typography>Lần thi: <strong>{result?.lanThi}</strong></Typography>
                        <Stack direction='row' justifyContent='center' spacing={2}>
                            <Link to={`/review-exam/${takeExamId}`}>

                                <Button variant='contained'>Xem lại bài làm</Button>
                            </Link>
                            <Link to='/course'>
                                <Button variant='contained'>Xem thống kê</Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Paper>

            </Stack>
        </Page>
    )
}

export default ResultExamination