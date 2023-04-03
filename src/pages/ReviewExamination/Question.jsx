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
    TextField,
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { darken } from "@mui/material";
import DOMPurify from 'dompurify'
import { memo } from 'react';

const FormControlLabelCustom = styled(FormControlLabel)({
    margin: 0,
    '& .MuiRadio-root': {
        padding: '4px'
    },
    alignItems: 'flex-start',
    '& .MuiTypography-root': {
        paddingTop: '3px',
        marginLeft: '6px',
        lineHeight: '22px'
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
    },
    '&.fail': {
        borderLeft: `8px solid ${theme.palette.error.main}`,
    },
    '&.noview': {
        borderLeft: `8px solid ${theme.palette.warning.main}`,
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
    const { question, viewPoint, viewAnswer } = props
    const point = question?.point
    const statusQuestion = (() => {
        if (point === undefined)
            return 'noview'
        if (point === 0) return 'fail'
        return 'done'
    })()
    return (
        <StackQuestionContent id={`question-${props.index}`} spacing={1} pr={2}
            className={statusQuestion} >
            <TypographyQuestion>Câu hỏi {props.index + 1}</TypographyQuestion>

            <Stack flex={1} pb={2}>
                <Typography mb={0.5} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.content) }}></Typography>
                {
                    question.type === 'fillin' ?
                        (() => {
                            let isCorrect = false
                            if (question.choose.length > 0) {
                                isCorrect = question.answers.some(e => {
                                    if (e.type === 'equal') {
                                        return (e.content === question.choose[0])
                                    }
                                    return (e.content.includes(question.choose[0]))
                                })
                            }
                            else
                                isCorrect = false
                            console.log(isCorrect)
                            return(<TextField
                                    id="outlined-multiline-static"
                                    label="Câu trả lời"
                                    multiline
                                    value={question.choose?.[0]}
                                    rows={4}
                                    
                                    focused
                                    variant='filled' 
                                    color={isCorrect?'success':'error'}
                                    
                                />)
                        })()

                        :
                        question.type === 'single' ?

                            <RadioGroup
                                name="controlled-radio-buttons-group"
                                value={question.choose?.[0] || ''}
                            >
                                {
                                    question.answers.map(item =>
                                        <Stack key={item._id} direction='row' spacing={1} mt={1}>
                                            <FormControlLabelCustom
                                                value={item._id} control={<Radio size='small' />} label={item.content} />
                                            {item.isCorrect !== undefined && (item.isCorrect && <CheckCircleOutlineIcon
                                                sx={{ fontSize: '22px', height: '28px' }}
                                                color={'success'} />
                                                // :
                                                // question.choose?.[0] === item.id && <HighlightOffIcon
                                                //     sx={{ fontSize: '22px', height: '28px' }}
                                                //     color={'error'} />
                                            )}
                                        </Stack>
                                    )
                                }

                            </RadioGroup> :
                            <FormGroup>
                                {
                                    question.answers.map(item =>
                                        <Stack key={item.id || item._id} direction='row' spacing={1} mt={1}>
                                            <FormControlLabelCustom
                                                value={item.id || item._id}
                                                control={
                                                    <Checkbox
                                                        checked={question.choose?.includes(item._id)}
                                                        sx={{ height: '28px', width: '28px' }}
                                                        size='small'
                                                    />
                                                } label={item.content} />
                                            {
                                                item.isCorrect ?
                                                    <CheckCircleOutlineIcon
                                                        sx={{ fontSize: '22px', height: '28px' }}
                                                        color={'success'} />
                                                    :
                                                    question.choose?.includes(item.id) && <HighlightOffIcon
                                                        sx={{ fontSize: '22px', height: '28px' }}
                                                        color={'error'} />
                                            }
                                        </Stack>
                                    )
                                }
                            </FormGroup>
                }
            </Stack>
            <ButtonGroup variant="outlined">
                {/* <Button variant='outlined'>Chưa trả lời</Button> */}
                {statusQuestion === 'noview' ?
                    <>
                        <Button variant='contained'>Điểm tối đa:{question.maxPoints}</Button>
                        <Button variant='contained'>Chưa có điểm</Button>
                    </>
                    :
                    <Button variant='contained'>Điểm: {question.point}/{question.maxPoints}</Button>
                }
            </ButtonGroup>
        </StackQuestionContent>
    )
}
export default memo(Question)