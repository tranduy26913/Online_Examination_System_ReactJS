import {
  Stack,
  Button,
  TextField,
  FormControlLabel,
  Typography,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl
} from '@mui/material'
import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '@mui/system';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { faker } from '@faker-js/faker';
import { useCallback } from 'react';

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

const BoxCheck = ({ isCheck, onClick }) => {
  const theme = useTheme()
  return (
    <Stack onClick={onClick}
      justifyContent={'center'} alignItems='center'
      sx={{
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '4px',
        backgroundColor: isCheck ? theme.palette.primary.main : '#fff'
      }}>
      <CheckIcon
        sx={{
          color: isCheck ? '#fff' : theme.palette.primary.main,
          fontSize: '18px'
        }} />
    </Stack>
  )
}
const BoxDelete = ({ onClick }) => {
  const theme = useTheme()
  return (
    <Stack onClick={onClick}
      justifyContent={'center'} alignItems='center'
      sx={{
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '4px',
      }}>
      <DeleteOutlineIcon
        sx={{
          color: theme.palette.primary.main,
          fontSize: '18px'
        }} />
    </Stack>
  )
}

const CreateQuestion = (props) => {
  const isEdit = props.edit
  const [question, setQuestion] = useState(props.question ? props.question : '')
  const [answers, setAnswers] = useState(props.answers ? props.answers : [])
  const [typeAnswer, setTypeAnswer] = useState('single')//single:1 đáp án đúng, multi: nhiều đáp án đúng

  const handleChangeTypeAnswer = (e) => {
    setTypeAnswer(e.target.value)
    if (e.target.value === 'single') {
      let newAnswers = [...answers]
      newAnswers = newAnswers.map(item => {
        const newAnswer = item
        newAnswer.isCorrect = false
        return newAnswer
      })
      setAnswers(newAnswers)
    }
  }
  const handleAddAnswer = () => {
    const newAnswer = {
      id: faker.datatype.uuid(),
      content: '',
      isCorrect: false,
    }
    setAnswers(pre => [...pre, newAnswer])
  }

  const handleDeleteAnswer = useCallback((idAnswer) => {
    let newAnswers = [...answers]
    newAnswers = newAnswers.filter(item => item.id !== idAnswer)
    console.log(newAnswers)
    setAnswers(newAnswers)
  }, [answers])

  const handleChangeInputAnswer = (e, idAnswer) => {
    const newAnswers = [...answers]
    const answerIndex = answers.findIndex(item => item.id === idAnswer)
    if (answerIndex > -1) {
      newAnswers[answerIndex].content = e.target.value
      setAnswers(newAnswers)
    }
  }

  const handleChooseCorrect = useCallback((idAnswer) => {
    let newAnswers = [...answers]
    const answerIndex = answers.findIndex(item => item.id === idAnswer)
    if (answerIndex > -1) {
      if (typeAnswer === 'single') {
        newAnswers = newAnswers.map(item => {
          const newAnswer = item
          if (newAnswer.id === idAnswer)
            newAnswer.isCorrect = !newAnswer.isCorrect
          else
            newAnswer.isCorrect = false
          return newAnswer
        })
      }
      else
        newAnswers[answerIndex].isCorrect = !newAnswers[answerIndex].isCorrect
    }
    setAnswers(newAnswers)
  }, [answers, typeAnswer])

  return (

    <Stack spacing={1.5} mb={2} p={2}>
      <Typography fontWeight={600} mb={1}>Nhập nội dung câu hỏi</Typography>
      <CKEditor
        editor={ClassicEditor}
        data=""
        onReady={editor => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
      <FormControl>
        <FormLabel>Số đáp án đúng</FormLabel>
        <RadioGroup
          row
          name="controlled-radio-buttons-group"
          value={typeAnswer}
          onChange={handleChangeTypeAnswer}
        >
          <FormControlLabel value="single" control={<Radio />} label="Một đáp án đúng" />
          <FormControlLabel value="multi" control={<Radio />} label="Nhiều đáp án đúng" />
        </RadioGroup>
      </FormControl>
      {
        isEdit ?
          answers.map((item, index) =>
            <Stack direction={'row'} width={'100%'} alignItems='flex-end' spacing={2}>

              <TextField variant='standard' size='small' fullWidth
                label={`Đáp án ${alphabet[index]}`} value={item.content}
                onChange={e => handleChangeInputAnswer(e, item.id)} />
              <BoxCheck isCheck={item.isCorrect} onClick={() => handleChooseCorrect(item.id)} />
              <BoxDelete onClick={() => handleDeleteAnswer(item.id)} />
            </Stack>) :
          <Stack direction={'row'} width={'100%'} alignItems='flex-end' spacing={2}>

            <TextField variant='standard' size='small' fullWidth label='Đáp án A' />
            <BoxCheck isCheck={false} />
            <BoxDelete />
          </Stack>
      }

      <Stack direction='row' justifyContent='center' >
        <Button onClick={handleAddAnswer} variant='outlined'>Thêm đáp án</Button></Stack>
      <Stack direction={'row'} spacing={1.5} justifyContent='flex-end'>
        <Button variant='contained' color='error'>Huỷ</Button>
        <Button variant='contained' color='warning'>Làm mới</Button>
        <Button variant='contained'>Tạo câu hỏi</Button>
      </Stack>
    </Stack>

  )
}

export default CreateQuestion