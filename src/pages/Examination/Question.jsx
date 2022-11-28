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
import { useState,memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeAnswer } from 'slices/answerSheetSlice';
import DOMPurify from 'dompurify'
import apiTakeExam from 'apis/apiTakeExam';

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

const getAnswers = (arr, id) => {//lấy đáp án của câu hỏi 
  const result = arr.find(item => item.question === id)
  if (result) {
    return result.answers
  }
  else
    return []
}
const Question = (props) => {
  const { question } = props
  const indexQuestion = question?.index
  const answerSheet = useSelector(state => state.answerSheet?.result)
  const dispatch = useDispatch()
  const [value, setValue] = useState(getAnswers(answerSheet, question.id));
  const takeExamId = useSelector(state => state.answerSheet?.takeExamId)
  //const [flag,setFlag] = useState(false)

  const handleChangeStateFlag = () => {
    if (props.stateFlag)
      props.changeStateFlagIndex(props.index, false)
    else
      props.changeStateFlagIndex(props.index, true)
  }
  const handleChangeSingle = (event) => {//đổi lựa chọn cho câu hỏi một lựa chọn
    const newValue = [event.target.value]
    dispatch(changeAnswer({
      question: question.id,
      answers: newValue
    }))
    setValue(newValue)
    props.changeStateDoneIndex(props.index, true)
    handleCreateLog()
  };

  const handleChangeMulti = (event) => {//đổi lựa chọn cho câu hỏi nhiều lựa chọn
    let newValue = [...value]
    if (newValue.includes(event.target.value))
      newValue = newValue.filter(item => item !== event.target.value)
    else
      newValue.push(event.target.value)
    dispatch(changeAnswer({
      question: question.id,
      answers: newValue
    }))
    setValue(newValue)
    props.changeStateDoneIndex(props.index, true)
    handleCreateLog()
  };

  const handleCreateLog = ()=>{
    apiTakeExam.createLog({
      action:`Thay đổi đáp án cho câu hỏi số ${indexQuestion}`,
      takeExamId
    })
  }
  return (
    <StackQuestionContent id={`question-${props.index}`} spacing={1} pr={2} className={props.stateDone ? 'done' : ''} >
      <TypographyQuestion>Câu hỏi {props.index + 1}</TypographyQuestion>

      <Stack flex={1} pb={2}>
        <Typography mb={0.5} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.content) }}></Typography>
        {
          question.type === 'single' ?

            <RadioGroup
              name="controlled-radio-buttons-group"
              value={value[0] || ''}
              onChange={handleChangeSingle}
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
                      checked={value.includes(item.id)}
                      size='small'
                      onChange={handleChangeMulti}
                    />} label={item.content} />)
              }
            </FormGroup>
        }
      </Stack>
      <Stack>

      <ButtonGroup color={props.stateDone?'primary':'warning'}aria-label="outlined button group">
        <Button
          variant='contained' onClick={handleChangeStateFlag}
          startIcon={<FlagIcon color={props.stateFlag ?'error':'inherit'}/>}>{props.stateFlag ? 'Huỷ đặt cờ' : 'Đặt cờ'}</Button>
        <Button variant='contained'>{props.stateDone ?'Đã trả lời':'Chưa trả lời'}</Button>
        <Button variant='contained'>Điểm: {question.maxPoints}</Button>
      </ButtonGroup>
      </Stack>
    </StackQuestionContent>
  )
}

export default memo(Question)