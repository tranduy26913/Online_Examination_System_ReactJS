import { useEffect, useState } from 'react'
import {
    Box,
    Button,
    Stack,
    Typography
} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import { styled, useTheme } from '@mui/material/styles';
import Question from './Question';
import apiExamination from 'apis/apiExamination';
import apiQuestion from 'apis/apiQuestion';
import Page from 'components/Page';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ButtonQuestion = styled(Button)(({ theme }) => ({
    borderRadius: '50%',
    //padding:'8px',
    width: '100%',
    minWidth: 'unset',
    minHeight: 'unset',
    //paddingBottom:'50%',
    color: '#333',
    border: '2px solid #999',
    '&.done': {
        borderColor: `${theme.palette.primary.main}cc`,
        backgroundColor: `${theme.palette.primary.light}40`
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

    const [name,setName] = useState('')
    const [examId, setExamId] = useState(paramUrl.examId || '')
    const [questions, setQuestions] = useState([])

    const user = useSelector(state=>state.auth.user)
    const answerSheet = useSelector(state=>state.answerSheet?.sheet)


    useEffect(() => {
        const getQuestions = () => {
            if (!user)
                return
            if (!examId)
                return
            apiExamination.getExaminationsById(examId)
                .then(res => {
                    try {
                        const exam = res[0]
                        setName(exam.name)
                        const questions = exam.questions
                        questions.forEach(item => {
                            apiQuestion.getQuestionsById(item)
                                .then(res => {
                                    setQuestions(pre => [...pre,res])
                                })
                        })
                    }
                    catch (err) {
                    }
                })

        }
        getQuestions()
    }, [examId])

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
                    <Stack direction='row' spacing={1.5}>

                        <Stack flex={4} spacing={3}>
                            {
                                questions.map(item =>
                                    <Question key={item.id} question={item} />)
                            }
                        </Stack>
                        <Stack flex={1} spacing={1}>
                            <Typography fontSize='16px' fontWeight={600}>Danh sách câu hỏi</Typography>
                            <Grid container spacing={0.5}>
                                {
                                    questionSample.map((item) =>
                                        <Grid key={item.id} xs={2}>
                                            <ButtonQuestion className='done'>{item.index}</ButtonQuestion>
                                        </Grid>)
                                }
                            </Grid>
                        </Stack>
                    </Stack>
                </Box>
                <BoxTime>
                    01:00:00
                </BoxTime>
            </Box>
        </Page>
    )
}
const questionSample = [
    {
        id: '1',
        index: 1,
        question: 'Câu hỏi số 1',
        answers: [
            {
                id: '1',
                value: 'Concacne'
            },
            {
                id: '2',
                value: 'Concacne'
            },
            {
                id: '3',
                value: 'Concacne'
            },
            {
                id: '4',
                value: 'Concacne'
            },
        ],
        point: 1.00,
        flag: false,
        isChoose: false,
    },
    {
        id: '1342',
        index: 2,
        question: 'Câu hỏi số 2',
        answers: [
            {
                id: '1',
                value: 'Concacne'
            },
            {
                id: '2',
                value: 'Concacne'
            },
            {
                id: '3',
                value: 'Concacne'
            },
            {
                id: '4',
                value: 'Concacne'
            },
        ],
        point: 1.00,
        flag: false,
        isChoose: true,
    },
    {
        id: '1er',
        index: 3,
        question: 'Câu hỏi số 3',
        answers: [
            {
                id: '1',
                value: 'Concacne'
            },
            {
                id: '2',
                value: 'Concacne'
            },
            {
                id: '3',
                value: 'Concacne'
            },
            {
                id: '4',
                value: 'Concacne'
            },
        ],
        point: 1.00,
        flag: false,
        isChoose: true,
    }
]
export default Examination