import { useCallback, useEffect, useState } from 'react'
import {
    Box,
    Button,
    Stack,
    Typography,
    Paper
} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import { styled, useTheme } from '@mui/material/styles';
import Question from './Question';
import apiExamination from 'apis/apiExamination';
import apiQuestion from 'apis/apiQuestion';
import Page from 'components/Page';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import QuestionMulti from './QuestionMulti';
import { clearAnswers } from 'slices/answerSheetSlice';
const ButtonQuestion = styled(Button)(({ theme }) => ({
    borderRadius: '6px',
    //padding:'8px',
    width: '100%',
    height:'54px',
    minWidth: 'unset',
    minHeight: 'unset',
    fontWeight:600,
    //paddingBottom:'50%',
    color:  `${theme.palette.mode==='dark'?theme.palette.common.white:theme.palette.common.black}`,
    border: '2px solid #999',
    borderBottomWidth:'20px',
    '&.done': {
        borderColor: `${theme.palette.primary.main}cc`,
        color: `${theme.palette.primary.main}`,
        backgroundColor: `${theme.palette.primary.light}40`
    },
    '&.flag':{
        borderColor: `${theme.palette.error.main}`,
        color: `${theme.palette.error.main}`,
        backgroundColor: `${theme.palette.error.light}20`
    }
}));
const BoxTime = styled(Box)(({ theme }) => ({
    borderRadius: '2px',
    color: theme.palette.primary.main,
    fontWeight: 600,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: '0.5rem 1rem',
    position: 'fixed',
    right: '2rem',
    bottom: '2rem',
    fontSize: '16px',
}))
const Examination = () => {
    const theme = useTheme()
    const paramUrl = useParams()

    const [name, setName] = useState('')
    const [examId, setExamId] = useState(paramUrl.examId || '')
    const [questions, setQuestions] = useState([])
    const [indexQuestion, setIndexQuestion] = useState([])
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const answerSheet = useSelector(state => state.answerSheet?.questions)
    //console.log(answerSheet)


    useEffect(() => {
        const getQuestions = () => {
            if (!user)
                return
            if (!examId)
                return
            dispatch(clearAnswers())
            apiExamination.getExaminationsById(examId)
                .then(async (res) => {
                    try {
                        const exam = res[0]
                        setName(exam.name)
                        const questions = exam.questions
                        const newIndexQuestion = []
                        for (let id of questions) {
                            const question = await apiQuestion.getQuestionsById(id)
                            const isDone = checkDone(answerSheet, id)
                            setQuestions(pre => [...pre, question])
                            if (isDone)
                                newIndexQuestion.push({
                                    isFlag:false,
                                    isDone:true})
                            else
                                newIndexQuestion.push({
                                    isFlag:false,
                                    isDone:false})
                        }

                        setIndexQuestion(newIndexQuestion)
                    }
                    catch (err) {
                    }
                })

        }
        getQuestions()
    }, [examId])

    const changeStateDoneIndex = useCallback((index, state) => {
        if (indexQuestion[index]?.isDone !== state) {
            let newIndexQuestion = [...indexQuestion]
            newIndexQuestion[index] = {
                ...newIndexQuestion[index],
                isDone:state
            }
            setIndexQuestion(newIndexQuestion)
        }
    }, [indexQuestion])
    const changeStateFlagIndex = useCallback((index, state) => {
        if (indexQuestion[index]?.isFlag !== state) {
            let newIndexQuestion = [...indexQuestion]
            newIndexQuestion[index] = {
                ...newIndexQuestion[index],
                isFlag:state
            }
            setIndexQuestion(newIndexQuestion)
        }
    }, [indexQuestion])


    return (
        <Page title={name}>

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
                        <Paper elevation={24} sx={{
                            position: 'sticky',
                            top: '5rem',
                            flex: 1
                        }}>

                            <Stack spacing={1} p={1.5} >
                                <Typography fontSize='16px' fontWeight={600}>Danh sách câu hỏi</Typography>
                                <Grid container spacing={0.5}>
                                    {
                                        indexQuestion.map((item, index) =>
                                            <Grid key={index} xs={2}>
                                                <ButtonQuestion className={`${item.isDone ? 'done':''} ${item.isFlag?'flag':''}`}
                                                    onClick={() => document.getElementById(`question-${index}`)
                                                        .scrollIntoView({ block: 'center', behavior: "smooth" })}
                                                >{index + 1}</ButtonQuestion>
                                            </Grid>)
                                    }
                                </Grid>
                            </Stack>
                        </Paper>
                    </Stack>
                </Box>
                <BoxTime>
                    01:00:00
                </BoxTime>
            </Box>
        </Page>
    )
}

const checkDone = (arr, id) => {
    return Boolean(arr.find(item => item.id === id))
}

export default Examination