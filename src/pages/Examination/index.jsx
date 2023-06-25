import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import {
    Box,
    Button,
    Stack,
    Typography,
    Paper,
    TextField,
} from "@mui/material"
import Page from 'components/Page';
import { useTheme } from '@mui/material/styles';
import Question from './Question';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAllQuestion, clearAnswerSheet, clearTakeExamId, setTakeExamId } from 'slices/answerSheetSlice';
import apiTakeExam from 'apis/apiTakeExam';
import { toast } from 'react-toastify';
//import FaceRecognition from './FaceRecognition';
import { getMessageError } from 'utils';
import LoadingRoller from 'components/LoadingPage/LoadingRoller';
import checkPinImg from 'assets/img/check-pin.png'
import CountDown from './CountDown';
import BoxIndex from './BoxIndex';
import FaceRecognition from './FaceRecognition';

const Examination = () => {
    const theme = useTheme()
    const { examId } = useParams()

    const [name, setName] = useState('')
    const [pin, setPin] = useState('')
    const [endTime, setEndTime] = useState()
    const [countExit, setCountExit] = useState(0)
    const [countOutFace, setCountOutFace] = useState(0)
    const [loadingExam, setLoadingExam] = useState(true)

    const [questions, setQuestions] = useState([])
    const [isTracking, setIsTracking] = useState(false)
    //const user = useSelector(state => state.user.info)
    const dispatch = useDispatch()
    const takeExamId = useSelector(state => state.answerSheet?.takeExamId)
    const answerSheet = useSelector(state => state.answerSheet?.result)
    const navigate = useNavigate()

    useLayoutEffect(() => {
        const checkExam = () => {
            //dispatch(clearAnswerSheet())
            setLoadingExam(true)
            dispatch(clearTakeExamId())
            apiTakeExam.CheckExam({ slug: examId })
                .then(resExam => {
                    if (resExam.message === 'checkpin') {
                        dispatch(clearTakeExamId())
                    }
                    else if (resExam.message === 'valid') {
                        dispatch(setTakeExamId(resExam.takeExamId))
                        setupQuestion(resExam.exam.questions)
                        setEndTime(new Date(resExam.exam.endTime))
                        setIsTracking(resExam.exam.tracking)
                        setName(resExam.exam.name)
                        setCountExit(resExam.countOutTab)
                        setCountOutFace(resExam.countOutFace)
                    }
                })
                .catch(err => {
                    toast.warning(getMessageError(err), { autoClose: false })
                    const courseId = err?.response?.data?.courseId
                    if (courseId)
                        navigate(`/course/${courseId}`)
                    else
                        navigate('/')
                })
                .finally(() => { setLoadingExam(false) })
        }
        checkExam()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setupQuestion = (questions) => {
        setQuestions(questions)
        questions = questions.map(item => ({
            question: item.id,
            answers: [],
            type: item.type,
            isDone: false,
            isFlag: false
        }))
        dispatch(addAllQuestion(questions))
    }

    const increaseCountOutFace = useCallback(() => setCountOutFace(prev => prev + 1), [])

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
                setName(res.exam.name)
                setIsTracking(res.exam.tracking)
                setCountExit(res.countOutTab || 0)
                setCountOutFace(res.countOutFace || 0)
            })
            .catch(err => {
                const text = getMessageError(err)
                toast.warning(text)
                if (text !== 'Sai mật khẩu') {
                    navigate('/')
                }
            })
    }

    const handleSubmit = () => {
        apiTakeExam.submitAnswerSheet({
            takeExamId,
            answerSheet,
            countOutTab: countExit + 1,
            countOutFace: countOutFace + 1
        })
            .then(res => {
                navigate('/result-exam/' + takeExamId)
                dispatch(clearTakeExamId())
                dispatch(clearAnswerSheet())
            })
    }

    useEffect(() => {
        if (!takeExamId) {
            return
        }
        const checkExitBrowser = (e) => {
            var confirmationMessage = "Bạn có chắc chắn muốn thoát khỏi bài kiểm tra";
            (e || window.event).returnValue = confirmationMessage; //Gecko + IE
            return confirmationMessage;                            //Webkit, Safari, Chrome
        }
        const changeVisibility = () => {

            if (document.visibilityState === 'visible') {
                handleCreateLog(`Thoát khỏi màn hình lần thứ ${countExit + 1}`)
                if (countExit + 1 >= 5) {
                    handleSubmit()
                    toast.warning(`Bài thi đã tự động nộp do bạn đã chuyển Tab 5 lần!`,
                        { autoClose: false })
                }
                else {
                    if (countExit > 0)
                        toast.warning(`Cảnh báo! Bạn đã chuyển Tab ${countExit + 1} lần. Chuyển Tab lần thứ 5 bài thi sẽ tự động được nộp!!!`,
                            { autoClose: false })
                    setCountExit(i => i + 1)
                }

            }
        }

        window.addEventListener("beforeunload", checkExitBrowser);
        if (isTracking)
            document.addEventListener('visibilitychange', changeVisibility)
        return () => {
            window.removeEventListener('beforeunload', checkExitBrowser)
            if (isTracking)
                document.removeEventListener('visibilitychange', changeVisibility)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countExit, takeExamId, isTracking])

    const handleCreateLog = useCallback((action) => {
        apiTakeExam.createLog({
            action, takeExamId, countOutTab: countExit + 1, countOutFace
        })
    }, [takeExamId, countExit, countOutFace])
    const style = {

        flexDirection: { xs: 'column', md: 'row' },
        gap: '12px',
        '&>div:nth-of-type(1)': {
            'order': { xs: 2, md: 1 }
        },
        '&>div:nth-of-type(2)': {
            'order': { xs: 1, md: 2 },
            width: '100%'
        }
    }
    return (
        <Page title={name}>
            {
                loadingExam ? <LoadingRoller /> :
                    !takeExamId ?
                        <Stack width='100%' height='100vh' justifyContent='center' alignItems='center'>
                            <Box width='100%' maxWidth='500px'>

                                <Paper>
                                    <Stack p={2} spacing={2} alignItems='center'>
                                        <Typography fontSize='18px' color='primary' align='center'>Nhập mật khẩu đề thi</Typography>
                                        <Stack flex={1}>
                                            <img style={{ margin: '0 auto' }} width='80%' alt='check-pin' src={checkPinImg} />
                                        </Stack>
                                        <TextField
                                            fullWidth
                                            placeholder='Nhập mật khẩu'
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
                                    }}>{name}</Typography>
                                <Stack sx={style} alignItems='flex-start'>

                                    <Stack width='100%' flex={{ xs: 1, md: 3, lg: 4 }} spacing={3}>
                                        {
                                            questions.map((item, index) => {
                                                // const value = getAnswers(answerSheet, item.id)
                                                return (
                                                    <Question
                                                        key={item.id}
                                                        question={item} index={index} />
                                                )
                                            }
                                            )
                                        }
                                    </Stack>
                                    <Stack flex={1} spacing={2} sx={{
                                        position: 'sticky',
                                        top: '5rem',
                                    }}>
                                        <BoxIndex />

                                        {
                                            isTracking &&
                                            <Paper elevation={12} sx={{ overflow: 'hidden' }}>
                                                <FaceRecognition
                                                    increaseCountOutFace={increaseCountOutFace}
                                                    handleSubmit={handleSubmit}
                                                    handleCreateLog={handleCreateLog}
                                                    countOutFace={countOutFace} />
                                            </Paper>
                                        }
                                    </Stack>
                                </Stack>
                            </Box>
                            <CountDown endTime={endTime} />
                        </Box>
            }
        </Page>
    )
}


export default Examination