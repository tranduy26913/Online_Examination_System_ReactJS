import {
    Stack,
    Typography,
    RadioGroup,
    Radio,
    FormGroup,
    Checkbox,
    Button,
    ButtonGroup,
    FormControlLabel,
    styled,
} from '@mui/material'
import FlagIcon from '@mui/icons-material/Flag';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeAnswer } from 'slices/answerSheetSlice';
import DOMPurify from 'dompurify'

const FormControlLabelCustom = styled(FormControlLabel)({
    margin: 0,
    '& .MuiRadio-root': {
        padding: '4px'
    }
})

const StackQuestionContent = styled(Stack)(({ theme }) => ({
    borderRadius: '8px',
    border: `1px solid ${theme.palette.primary.light}30`,
    padding: '0.75rem',
    backgroundColor: `${theme.palette.primary.light}20`,
    borderLeft: `8px solid ${theme.palette.warning.main}b0`,
    '&.done': {
        borderLeft: `8px solid ${theme.palette.primary.main}b0`,
    }
}))


const TypographyQuestion = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    marginBottom: '4px',
    fontWeight: 600,
    paddingBottom: '4px',
    borderBottom: `1px dotted ${theme.palette.primary.main}`
}))

const getAnswers = (arr, id) => {//lấy đáp án của câu hỏi 
    const result = arr.find(item => item.id === id)
    if (result) {
        return result.answerIds
    }
    else
        return []
}
const QuestionMulti = (props) => {
    const { question } = props
    const answerSheet = useSelector(state => state.answerSheet.questions)
    const dispatch = useDispatch()
    console.log(getAnswers(answerSheet, question.id));
    const [value, setValue] = useState(getAnswers(answerSheet, question.id));


    const handleChange = (event) => {
       // console.log(event.target.value);
        let newValue = [...value]
        if(newValue.includes(event.target.value))
            newValue = newValue.filter(item=>item !== event.target.value) 
        else
            newValue.push(event.target.value)
        dispatch(changeAnswer({
            id: question.id,
            answerIds:newValue
        }))
        setValue(newValue)
    };
    
    return (
        <StackQuestionContent spacing={2} pr={2} className={`${question.isChoose ? 'done' : ''}`} >
            <TypographyQuestion>Câu hỏi {question.index}</TypographyQuestion>

            <Stack flex={1} >
                <Typography mb={0.5}
                 dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question.content)}} />
                <FormGroup>

                </FormGroup>
                {
                    question.answers.map(item =>
                        <FormControlLabelCustom key={item.id}
                            value={item.id}
                            control={<Checkbox 
                                checked={value.includes(item.id)} 
                                size='small' 
                                onChange={handleChange}
                                />} label={item.content} />)
                }

            </Stack>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button
                    variant='outlined'
                    startIcon={<FlagIcon />}>Đặt cờ</Button>
                <Button variant='outlined'>Chưa trả lời</Button>
                <Button variant='outlined'>Điểm: 1.00</Button>

            </ButtonGroup>
        </StackQuestionContent>
    )
}

export default QuestionMulti