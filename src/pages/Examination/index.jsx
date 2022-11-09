import { useCallback, useEffect, useState } from 'react'
import {
    Box,
    Button,
    Stack,
    Typography,
    Paper,
    TextField,
    Divider
} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import Question from './Question';
import Page from 'components/Page';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAnswers, clearAnswerSheet, clearTakeExamId, setTakeExamId } from 'slices/answerSheetSlice';
import { ButtonQuestion, BoxTime } from './Examination.style'
import apiTakeExam from 'apis/apiTakeExam';
import { toast } from 'react-toastify';
import FaceRecognition from './FaceRecognition';
const Examination = () => {
    const theme = useTheme()
    const paramUrl = useParams()

    const [name, setName] = useState('')
    const [pin, setPin] = useState('')
    const [examId, setExamId] = useState(paramUrl.examId || '')
    const [endTime, setEndTime] = useState()
    const [countExit, setCountExit] = useState(0)

    const [questions, setQuestions] = useState([])
    const [indexQuestion, setIndexQuestion] = useState([])
    const user = useSelector(state => state.user.info)
    const dispatch = useDispatch()
    const takeExamId = useSelector(state => state.answerSheet?.takeExamId)
    const answerSheet = useSelector(state => state.answerSheet?.result)
    const [countDown, setCountDown] = useState({ hour: 0, minute: 0, second: 0 })
    const navigate = useNavigate()

    useEffect(() => {
        const countDown = () => {
            if (!endTime) return
            var x = setInterval(function () {
                // Get today's date and time
                var now = new Date().getTime();
                // Find the distance between now and the count down date
                var distance = endTime - now;
                //console.log(distance)
                // Time calculations for days, hours, minutes and seconds
                setCountDown({
                    hour: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minute: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    second: Math.floor((distance % (1000 * 60)) / 1000)
                })
                if (distance < 0) {
                    clearInterval(x);
                }
            }, 1000);
        }
        countDown()
    }, [endTime])
    useEffect(() => {
        const checkExam = () => {
            //dispatch(clearAnswerSheet())
            apiTakeExam.CheckExam({ slug: examId })
                .then(resExam => {
                    if (resExam.message === 'checkpin') {
                        dispatch(clearTakeExamId())
                    }
                    else if (resExam.message === 'valid') {
                        dispatch(setTakeExamId(resExam.takeExamId))
                        setupQuestion(resExam.exam.questions)
                        setEndTime(new Date(resExam.exam.endTime))
                    }
                })
                .catch(err => {
                    console.log(err)
                    toast.warning(err.response.data.message)
                })
        }
        checkExam()
    }, [])

    const setupQuestion = (questions) => {
        const newIndexQuestion = []
        setQuestions([])
        for (let question of questions) {
            const isDone = checkDone(answerSheet, question.id)
            setQuestions(pre => [...pre, question])
            if (isDone)
                newIndexQuestion.push({
                    isFlag: false,
                    isDone: true
                })
            else
                newIndexQuestion.push({
                    isFlag: false,
                    isDone: false
                })
        }

        setIndexQuestion(newIndexQuestion)
    }

    const handleTakeExam = () => {
        apiTakeExam.CreateTakeExam({ slug: examId, pin })
            .then(res => {
                setupQuestion(res.exam.questions)
                if (takeExamId !== res.takeExamId) {
                    dispatch(clearAnswerSheet())
                }
                dispatch(setTakeExamId(res.takeExamId))
                setupQuestion(res.exam.questions)
                setEndTime(new Date(res.exam.endTime))
            })
    }

    useEffect(() => {
        const getQuestions = () => {
            if (!user)
                return
            if (!examId)
                return

        }
        getQuestions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [examId])

    const changeStateDoneIndex = useCallback((index, state) => {
        if (indexQuestion[index]?.isDone !== state) {
            let newIndexQuestion = [...indexQuestion]
            newIndexQuestion[index] = {
                ...newIndexQuestion[index],
                isDone: state
            }
            setIndexQuestion(newIndexQuestion)
        }
    }, [indexQuestion])
    const changeStateFlagIndex = useCallback((index, state) => {
        if (indexQuestion[index]?.isFlag !== state) {
            let newIndexQuestion = [...indexQuestion]
            newIndexQuestion[index] = {
                ...newIndexQuestion[index],
                isFlag: state
            }
            setIndexQuestion(newIndexQuestion)
        }
    }, [indexQuestion])

    const handleSubmit = () => {
        apiTakeExam.submitAnswerSheet({
            takeExamId,
            answerSheet
        })
            .then(res => {
                navigate('/result-exam/' + takeExamId)
                dispatch(clearTakeExamId)
            })
    }

    useEffect(() => {
        const checkExitBrowser = (e) => {
            var confirmationMessage = "Bạn có chắc chắn muốn thoát khỏi bài kiểm tra";
            (e || window.event).returnValue = confirmationMessage; //Gecko + IE
            return confirmationMessage;                            //Webkit, Safari, Chrome
        }
        const changeVisibility = () => {

            if (document.visibilityState === 'visible') {
                if (countExit === 3) {
                    toast.warning("Cảnh báo! Bạn đã chuyển Tab 3 lần. Chuyển Tab lần thứ 4 bài thi sẽ tự động được nộp.",
                        { autoClose: false })
                }
            } else {
                setCountExit(i => i + 1)
            }
        }
        window.addEventListener("beforeunload", checkExitBrowser);
        document.addEventListener('visibilitychange', changeVisibility)
        return () => {
            window.removeEventListener('beforeunload', checkExitBrowser)
            document.removeEventListener('visibilitychange', changeVisibility)
        }
    }, [countExit])

    const sendLog = (action) => {
        const params = {
            time: new Date(),
            action
        }
    }

    return (
        <Page title={name}>
            {!takeExamId ?
                <Stack width='100%' height='100vh' justifyContent='center' alignItems='center'>
                    <Box width='100%' maxWidth='500px'>

                        <Paper>
                            <Stack p={2} spacing={2} alignItems='center'>
                                <Typography fontSize='18px' color='primary' align='center'>Nhập mật khẩu đề thi</Typography>
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
                :

                <Box className='container' py={2}>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '20px',
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                                mb: 2,
                                textAlign: 'center'
                            }}>Bài kiểm tra số 1</Typography>
                        <Stack direction='row' spacing={1.5} alignItems='flex-start'>

                            <Stack flex={4} spacing={3}>
                                {
                                    questions.map((item, index) =>
                                        <Question key={item.id}
                                            changeStateDoneIndex={changeStateDoneIndex}
                                            changeStateFlagIndex={changeStateFlagIndex}
                                            stateDone={indexQuestion[index]?.isDone}
                                            stateFlag={indexQuestion[index]?.isFlag}
                                            question={item} index={index} />)
                                }
                            </Stack>
                            <Stack flex={1} spacing={2} sx={{
                                position: 'sticky',
                                top: '5rem',

                            }}>

                                <Paper elevation={24} >

                                    <Stack spacing={1} p={1.5}>
                                        <Typography fontSize='16px' fontWeight={600}>Danh sách câu hỏi</Typography>
                                        <Grid container spacing={0.5}>
                                            {
                                                indexQuestion.map((item, index) =>
                                                    <Grid key={index} xs={2}>
                                                        <ButtonQuestion className={`${item.isDone ? 'done' : ''} ${item.isFlag ? 'flag' : ''}`}
                                                            onClick={() => document.getElementById(`question-${index}`)
                                                                .scrollIntoView({ block: 'center', behavior: "smooth" })}
                                                        >{index + 1}</ButtonQuestion>
                                                    </Grid>)
                                            }
                                        </Grid>
                                        <Divider />
                                        <Stack alignItems='center'>

                                            <Button onClick={handleSubmit} variant='contained'>Nộp bài</Button>
                                        </Stack>
                                    </Stack>
                                </Paper>
                                <Paper elevation={12} sx={{ overflow: 'hidden' }}>
                                    <FaceRecognition />
                                </Paper>
                            </Stack>
                        </Stack>
                    </Box>
                    <BoxTime>
                        {(countDown.hour).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:
                        {(countDown.minute).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:
                        {(countDown.second).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
                    </BoxTime>
                </Box>
            }
        </Page>
    )
}

const checkDone = (arr, id) => {
    return Boolean(arr.find(item => item.question === id))
}

export default Examination