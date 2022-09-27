import {
  Stack,
  Typography,
  RadioGroup,
  Radio,
  Button,
  ButtonGroup,
  FormControlLabel,
  styled,
} from '@mui/material'
import FlagIcon from '@mui/icons-material/Flag';
import { useState } from 'react'

const FormControlLabelCustom = styled(FormControlLabel)({
  margin:0,
  '& .MuiRadio-root': {
    padding: '4px'
  }
})

const StackQuestionContent = styled(Stack)(({theme})=>({
    borderRadius: '8px',
    border: `1px solid ${theme.palette.primary.light}30`,
    padding:'0.75rem',
    backgroundColor:`${theme.palette.primary.light}20`,
    borderLeft:`8px solid ${theme.palette.warning.main}b0`,
    '&.done':{
      borderLeft:`8px solid ${theme.palette.primary.main}b0`,
    }
}))


const TypographyQuestion = styled(Typography)(({theme})=>({
  fontSize:'16px',
  marginBottom:'4px',
  fontWeight:600,
  paddingBottom:'4px',
  borderBottom:`1px dotted ${theme.palette.primary.main}`
}))


const Question = (props) => {
  const {question} = props
  const [value, setValue] = useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <StackQuestionContent spacing={2} pr={2} className={`${question.isChoose?'done':''}`} >
      <TypographyQuestion>Câu hỏi {question.index}</TypographyQuestion>
      
      <Stack flex={1} >
        <Typography mb={0.5}>{question.question}</Typography>
        <RadioGroup
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          {
            question.answers.map(item=>
             <FormControlLabelCustom key={item.id}
              value={item.id} control={<Radio size='small' />} label={item.value} /> )
          }
          
        </RadioGroup>
      </Stack>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button 
        variant='outlined'
         startIcon={<FlagIcon/>}>Đặt cờ</Button>
        <Button variant='outlined'>Chưa trả lời</Button>
        <Button variant='outlined'>Điểm: 1.00</Button>
        
      </ButtonGroup>
    </StackQuestionContent>
  )
}

export default Question