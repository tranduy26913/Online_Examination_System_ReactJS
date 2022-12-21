import {
    Stack,
    AccordionSummary,
    AccordionDetails,
    Accordion,
    Typography,
    Box,
    Paper,
} from '@mui/material'
import CreateQuestion from 'components/Question/CreateQuestion'
import DetailQuestion from 'components/Question/DetailQuestion'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    PaperQuestion,
    AccordionSummaryStyle,

} from './MUI'
import { useCallback, useContext, useState } from 'react'
import { useSelector } from 'react-redux';
import { memo } from 'react';
import ExamContext from '../ExamContext';

const styleStack = {
    
    overflowY: 'scroll',
    height: '100%',
    padding:'0 8px'
}
function ListQuestion() {
    const { examId, status } = useContext(ExamContext)
    const QUESTIONS = useSelector(state => state.user.questions)
    const [idQuestion, setIdQuestion] = useState('')
    //const [expanded, setExpanded] = useState(false);
    const [questionSelect, setQuestionSelect] = useState(null)

    // const handleChangeQuestion = (panel) => (event, isExpanded) => {
    //     setExpanded(isExpanded ? panel : false);
    // };
    const handleSelectQuestionEdit = useCallback((value) => {
        setIdQuestion(value)
        let question = QUESTIONS.find(item => item.id === value)
        console.log(question)
        if (question)
            setQuestionSelect(question)
        else
            setQuestionSelect(null)
    }, [QUESTIONS])

    return (
        <>
            <Paper elevation={12}>
                <Stack p={2} direction={'row'} height={'90vh'} spacing={2}>
                    <Stack flex={1} spacing={1} sx={styleStack}>
                        {
                            QUESTIONS.map((item, index) =>
                                <PaperQuestion
                                    onClick={()=>handleSelectQuestionEdit(item.id)}
                                    key={item.id}
                                    className={`${item.id===idQuestion?'selected':''}`}
                                    elevation={4} >
                                    <Typography>Câu hỏi {index + 1}</Typography>
                                </PaperQuestion>
                            )
                        }
                    </Stack>

                    <Box flex={4} overflow='scroll'>
                        <CreateQuestion
                            isEdit={idQuestion && true}
                            id={idQuestion}
                            examId={examId}
                            handleSelectQuestion={handleSelectQuestionEdit}
                            question={questionSelect} />
                    </Box>

                </Stack>
            </Paper>
            {/* <Stack spacing={1.5}>
                {
                    QUESTIONS.map((item, index) =>
                        item &&
                        <PaperQuestion key={item.id} elevation={12} >
                            <Accordion expanded={item.id === expanded} onChange={handleChangeQuestion(item.id)}>
                                <AccordionSummary sx={AccordionSummaryStyle}
                                    expandIcon={<ExpandMoreIcon />}
                                ><Typography>Câu hỏi {index + 1}</Typography>

                                </AccordionSummary>
                                <AccordionDetails>
                                    {idQuestion === item.id ?
                                        <CreateQuestion isEdit={true} id={idQuestion} examId={examId}
                                            handleSelectQuestion={handleSelectQuestionEdit}
                                            question={item} /> : <DetailQuestion id={item.id} examId={examId} question={item} handleEdit={handleSelectQuestionEdit} />}
                                </AccordionDetails>
                            </Accordion>
                        </PaperQuestion>

                    )
                }
                {
                    status === 'private' &&
                    <PaperQuestion elevation={12} >
                        <CreateQuestion isEdit={false} id='' examId={examId} />
                    </PaperQuestion>
                }
            </Stack> */}
        </>
    )
}

ListQuestion.propTypes = {}

export default memo(ListQuestion)
