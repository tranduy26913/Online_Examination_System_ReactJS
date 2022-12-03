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
import FlagIcon from '@mui/icons-material/Flag';
import { useState, memo, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeAnswer, changeStateDone, changeStateFlag } from 'slices/answerSheetSlice';
import DOMPurify from 'dompurify'
import apiTakeExam from 'apis/apiTakeExam';

const FormControlLabelCustom = styled(FormControlLabel)({
  margin: '8px 0px 0 0',
  '& .MuiRadio-root': {
    padding: '4px'
  },
  alignItems:'flex-start',
  '& .MuiTypography-root':{
    paddingTop:'3px',
    marginLeft:'6px',
    lineHeight:'22px'
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

const SelectorFn = (state,questionId)=>{
  let questionInSheet = {}
  if(state.answerSheet){
    const arr = state.answerSheet.result
    if(Array.isArray(arr)){
      questionInSheet = arr.find(item => item.question === questionId)
    }
  }
  return questionInSheet
}
const Question = (props) => {
  const { question } = props
  const indexQuestion = question?.index
  const questionInSheet = useSelector(state=>SelectorFn(state,question.id))
  const dispatch = useDispatch()
  const [value, setValue] = useState([]);
  const [isFlag, setIsFlag] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const takeExamId = useSelector(state => state.answerSheet?.takeExamId)


  useEffect(() => {
    setValue(questionInSheet.answers)
    setIsFlag(questionInSheet.isFlag)
    setIsDone(questionInSheet.isDone)
  }, [questionInSheet])
  const handleChangeStateFlag = useCallback(() => {
    dispatch(changeStateFlag({ questionId: question.id }))
  }, [])
  const handleChangeSingle = useCallback((event) => {//đổi lựa chọn cho câu hỏi một lựa chọn
    const newValue = [event.target.value]
    dispatch(changeAnswer({
      question: question.id,
      answers: newValue
    }))
    dispatch(changeStateDone({ questionId: question.id, value: true }))
    handleCreateLog()
  }, [])

  const handleChangeMulti = useCallback((event) => {//đổi lựa chọn cho câu hỏi nhiều lựa chọn
    let newValue = [...value]
    if (newValue.includes(event.target.value))
      newValue = newValue.filter(item => item !== event.target.value)
    else
      newValue.push(event.target.value)
    dispatch(changeAnswer({
      question: question.id,
      answers: newValue
    }))
    //setValue(newValue)
    handleCreateLog()
  }, [])

  const handleCreateLog = useCallback(() => {
    apiTakeExam.createLog({
      action: `Thay đổi đáp án cho câu hỏi số ${indexQuestion}`,
      takeExamId
    })
  }, [])
  return (
    <StackQuestionContent id={`question-${props.index}`} spacing={1} pr={2} className={isDone ? 'done' : ''} >
      <TypographyQuestion>Câu hỏi {props.index + 1}</TypographyQuestion>

      <Stack flex={1} pb={2}>
        <Typography mb={0.25} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.content) }}></Typography>
        {
          question.type === 'single' ?

            <RadioGroup
              name="controlled-radio-buttons-group"
              value={value[0] || ''}
              onChange={handleChangeSingle}
            >{
                console.log('re-render question' + question.index)
              }
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
                      checked={value.includes(item.id)}
                      size='small'
                      onChange={handleChangeMulti}
                    />} label={item.content} />)
              }
            </FormGroup>
        }
      </Stack>
      <Stack>

        <ButtonGroup color={isDone ? 'primary' : 'warning'} aria-label="outlined button group">
          <Button
            variant='contained' onClick={handleChangeStateFlag}
            startIcon={<FlagIcon color={isFlag ? 'error' : 'inherit'} />}>{isFlag ? 'Huỷ đặt cờ' : 'Đặt cờ'}</Button>
          <Button variant='contained'>{isDone ? 'Đã trả lời' : 'Chưa trả lời'}</Button>
          <Button variant='contained'>Điểm: {question.maxPoints}</Button>
        </ButtonGroup>
      </Stack>
    </StackQuestionContent>
  )
}

export default memo(Question)