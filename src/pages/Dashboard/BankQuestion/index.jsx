import {
    Box,
    Paper,
    styled,
    AccordionSummary,
    AccordionDetails,
    Accordion,
    Button,
    Typography,
    Stack
} from '@mui/material'
import CreateQuestion from 'components/Question/CreateQuestion'
import DetailQuestion from 'components/Question/DetailQuestion'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import React, { useCallback, useState } from 'react'

const PaperQuestion = styled(Paper)(({ theme }) => ({
    borderTop: `6px solid ${theme.palette.primary.light}`
}))

const AccordionSummaryStyle = {
    '&.Mui-expanded': {
        borderBottom: '1px dotted #bfbfbf'
    }
}

const BankQuestion = () => {
    const isCreateQuestion = false
    const [idQuestion, setIdQuestion] = useState('')
    const [expanded, setExpanded] = React.useState(false);

    const handleChangeQuestion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSelectQuestionEdit = useCallback((value) => setIdQuestion(value), [])
    return (
        <Stack spacing={1}>
            {questions.map(item =>

                <PaperQuestion key={item.id} elevation={12} >
                    <Accordion expanded={item.id === expanded} onChange={handleChangeQuestion(item.id)}>
                        <AccordionSummary sx={AccordionSummaryStyle}
                            expandIcon={<ExpandMoreIcon />}
                        ><Typography>Câu hỏi 1</Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            {idQuestion === item.id ?
                                <CreateQuestion edit={true} id={idQuestion}
                                    question={item.question}
                                    answers={item.answers} /> : <DetailQuestion id={item.id} handleEdit={handleSelectQuestionEdit} />}
                        </AccordionDetails>
                    </Accordion>
                </PaperQuestion>

            )}
            {/* <CreateQuestion edit={false} id='' /> */}
            <Button variant='contained'>Tạo câu hỏi mới</Button>
        </Stack>
    )
}


const questions = [
    {
        id: '1',
        question: 'Câu hỏi 1',
        answers: [
            {
                id: '1',
                content: "Đáp án 1"
            },
            {
                id: '2',
                content: "Đáp án 2"
            },
            {
                id: '3',
                content: "Đáp án 3"
            },
        ]
    },
    {
        id: '2',
        question: 'Câu hỏi 1',
        answers: [
            {
                id: '1',
                content: "Đáp án 1"
            },
            {
                id: '2',
                content: "Đáp án 2"
            },
            {
                id: '3',
                content: "Đáp án 3"
            },
        ]
    },
    {
        id: '3',
        question: 'Câu hỏi 1',
        answers: [
            {
                id: '1',
                content: "Đáp án 1"
            },
            {
                id: '2',
                content: "Đáp án 2"
            },
            {
                id: '3',
                content: "Đáp án 3"
            },
        ]
    },
]
BankQuestion.propTypes = {

}

export default BankQuestion
