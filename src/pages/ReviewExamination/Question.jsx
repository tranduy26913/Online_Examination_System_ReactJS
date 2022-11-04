import {
    Stack,
    Typography,
    RadioGroup,
    Radio,
    Button,
    ButtonGroup,
    FormControlLabel,
    styled,
    FormGroup,
    Checkbox,
    lighten,
    alpha,
} from '@mui/material'
import { darken } from "@mui/material";
import DOMPurify from 'dompurify'
import { memo } from 'react';

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
    backgroundColor: theme.palette.mode === 'dark' ?
        `${darken(theme.palette.primary.main, 0.8)}` : `${lighten(theme.palette.primary.main, 0.85)}`,
    borderLeft: `8px solid ${alpha(theme.palette.warning.main, 0.78)}`,
    '&.done': {
        borderLeft: `8px solid ${theme.palette.primary.main}b0`,
    }
}))


const TypographyQuestion = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    //marginBottom:'4px',
    fontWeight: 600,
    paddingBottom: '4px',
    borderBottom: `1px dotted ${theme.palette.primary.main}`
}))


const Question = (props) => {
    const { question } = props

    return (
        <StackQuestionContent id={`question-${props.index}`} spacing={1} pr={2} className={props.stateDone ? 'done' : ''} >
            <TypographyQuestion>Câu hỏi {props.index + 1}</TypographyQuestion>

            <Stack flex={1} pb={2}>
                <Typography mb={0.5} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.content) }}></Typography>
                {
                    question.type === 'single' ?

                        <RadioGroup
                            name="controlled-radio-buttons-group"
                            value={question.choose?.[0] || ''}
                        >
                            {
                                question.answers.map(item =>
                                    <FormControlLabelCustom key={item.id}
                                        value={item.id} control={<Radio size='small' />} label={item.content} />)
                            }

                        </RadioGroup> :
                        <FormGroup>
                            {
                                question.answers.map(item =>
                                    <FormControlLabelCustom key={item.id}
                                        value={item.id}
                                        control={<Checkbox
                                            checked={item.choose?.includes(item.id)}
                                            size='small'
                                        />} label={item.content} />)
                            }
                        </FormGroup>
                }
            </Stack>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button variant='outlined'>Chưa trả lời</Button>
                <Button variant='outlined'>Điểm: 1.00</Button>

            </ButtonGroup>
        </StackQuestionContent>
    )
}
export default memo(Question)