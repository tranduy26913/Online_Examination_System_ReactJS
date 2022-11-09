import {
    Stack,
    AccordionSummary,
    AccordionDetails,
    Accordion,
    Typography,
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

function ListQuestion(props) {
    const {examId} = useContext(ExamContext)
    const QUESTIONS = useSelector(state => state.user.questions)
    const [idQuestion, setIdQuestion] = useState('')
    const [expanded, setExpanded] = useState(false);

    const handleChangeQuestion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleSelectQuestionEdit = useCallback((value) => setIdQuestion(value), [])

    return (
        <>
            <Stack spacing={1.5}>
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
                <PaperQuestion elevation={12} >
                    <CreateQuestion isEdit={false} id='' examId={examId} />
                </PaperQuestion>
            </Stack>
        </>
    )
}

ListQuestion.propTypes = {}

export default memo(ListQuestion)
