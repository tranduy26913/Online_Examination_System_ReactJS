import {
    Paper,
    styled,
    AccordionSummary,
    AccordionDetails,
    Accordion,
    Typography,
    Stack
} from '@mui/material'
import CreateQuestion from 'components/Question/CreateQuestion'
import DetailQuestion from 'components/Question/DetailQuestion'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import React, { useCallback, useState } from 'react'
import Page from 'components/Page';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import apiQuestionBank from 'apis/apiQuestionBank';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion, clearQuestion } from 'slices/userSlice';

const PaperQuestion = styled(Paper)(({ theme }) => ({
    borderTop: `6px solid ${theme.palette.primary.light}`
}))

const AccordionSummaryStyle = {
    '&.Mui-expanded': {
        borderBottom: '1px dotted #bfbfbf'
    }
}

const QuestionBankDetail = () => {
    const { slug } = useParams()
    const [questionBank, setQuestionBank] = useState({
        name: 'Ngân hàng câu hỏi môn toán',
        description: 'Ngân hàng các câu hỏi môn toán từ dễ đến khó'
    })
    const [idQuestion, setIdQuestion] = useState('')
    const [expanded, setExpanded] = React.useState(false);
    const dispatch = useDispatch()
    const QUESTIONS = useSelector(state => state.user.questions)
    const handleChangeQuestion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSelectQuestionEdit = useCallback((value) => setIdQuestion(value), [])
    useEffect(() => {
        const GetData = () => {
            dispatch(clearQuestion())
            apiQuestionBank.getQuestionsByQB({ slug })
                .then(res => {
                    const { questions, ...data } = res
                    setQuestionBank(data)
                    questions.forEach(item => {
                        dispatch(addQuestion(item))
                      })
                })
        }
        GetData()
    }, [slug])
    return (
        <Page title='Danh sách câu hỏi'>
            <Stack spacing={2}>

                <Paper>
                    <Stack spacing={1} p={2}>
                        <Typography align='center' fontSize='20px'>{questionBank.name}</Typography>
                        <Typography>{questionBank.description}</Typography>
                    </Stack>
                </Paper>
                <Stack spacing={1}>
                    {QUESTIONS.map((item,index) =>

                        <PaperQuestion key={item.id} elevation={12} >
                            <Accordion expanded={item.id === expanded} onChange={handleChangeQuestion(item.id)}>
                                <AccordionSummary sx={AccordionSummaryStyle}
                                    expandIcon={<ExpandMoreIcon />}
                                ><Typography>Câu hỏi {index+1}</Typography>

                                </AccordionSummary>
                                <AccordionDetails>
                                    {idQuestion === item.id ?
                                        <CreateQuestion isEdit={true} id={idQuestion}
                                            question={item} /> :
                                        <DetailQuestion question={item} id={item.id} handleEdit={handleSelectQuestionEdit} />}
                                </AccordionDetails>
                            </Accordion>
                        </PaperQuestion>

                    )}
                    <PaperQuestion elevation={12} >
                        <CreateQuestion isEdit={false} id='' questionBankId={questionBank.id} />
                    </PaperQuestion>
                </Stack>
            </Stack>
        </Page>
    )
}

export default QuestionBankDetail
