import { useEffect, useState } from 'react'
import {
    Box,
    Button,
    Stack,
    Typography,
    Paper,
    TextField,
} from "@mui/material"
import { useTheme } from '@mui/material/styles';
import Page from 'components/Page';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import apiTakeExam from 'apis/apiTakeExam';
import { toast } from 'react-toastify';
const EnrollCourse = () => {
    const {courseId} = useParams()

    const [name, setName] = useState('')
    const [pin, setPin] = useState('')
    const user = useSelector(state => state.user.info)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    useEffect(() => {
        const checkExam = () => {
            //dispatch(clearAnswerSheet())
            apiTakeExam.getCourseInfo({courseId })
                .then(res => {
                    setName(res.name)
                })
                .catch(err => {
                    console.log(err)
                    toast.warning(err.response.data.message)
                })
        }
        checkExam()
    }, [courseId])

    const handleSubmit = () => {
        apiTakeExam.submitAnswerSheet({
            takeExamId,
            answerSheet
        })
            .then(res => {
                navigate('/course/' + courseId)
            })
    }

   
    return (
        <Page title={name}>
            <Stack width='100%' height='100vh' justifyContent='center' alignItems='center'>
                <Box width='100%' maxWidth='500px'>

                    <Paper>
                        <Stack p={2} spacing={2} alignItems='center'>
                            <Typography fontSize='18px' color='primary' align='center'>Nhập mật khẩu tham gia</Typography>
                            <TextField
                                fullWidth
                                value={pin}
                                onChange={e => setPin(e.target.value)}
                                variant='standard' />
                            <Button variant='contained' onClick={handleTakeExam}>Vào đề thi</Button>
                        </Stack>
                    </Paper>
                </Box>
            </Stack>
        </Page>
    )
}


export default EnrollCourse